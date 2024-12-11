import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.getCsrfTokenFromCookies();
    if (csrfToken && req.method !== 'GET') {
      const cloned = req.clone({
        headers: req.headers.set('X-CSRF-TOKEN', csrfToken)
      });

      return next.handle(cloned);
    }

    return next.handle(req);
  }

  private getCsrfTokenFromCookies(): string | null {

    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + encodeURIComponent('XSRF-TOKEN') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
  }
}
