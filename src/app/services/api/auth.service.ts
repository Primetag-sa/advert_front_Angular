import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Méthode pour se connecter
  login(
    email: string,
    password: string
  ): Observable<{ user: User; token: string }> {
    return this.http
      .post<{ user: User; token: string }>(
        `${this.baseUrl}/login`,
        { email, password },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          console.log('Login response:', response);

          if (response.token) {
            console.log('SavedToken', response.token);
            localStorage.setItem('userToken', response.token);
          } else {
            console.error('Token not found in the response');
          }
        })
      );
  }

  // Méthode pour se déconnecter
  logout(): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    localStorage.removeItem('userToken');
    return this.http.post(
      `${this.baseUrl}/logout`,
      {},
      { headers, withCredentials: true }
    );
  }

  // Vérifier l'état d'authentification
  isAuthenticated(): Observable<any> {
    const token = localStorage.getItem('userToken');
    console.log('Token:', token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('Headders:', headers);
    return this.http.get<any>(`${this.baseUrl}/isAuthenticated`, {
      headers,
    });
  }
}
