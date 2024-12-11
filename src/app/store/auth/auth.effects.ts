import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import { catchError, map, mergeMap, of,tap } from 'rxjs';
import * as AuthActions from './auth.actions';
import {AuthService} from "../../services/api/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private router: Router, private authService: AuthService) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(response => AuthActions.loginSuccess(response)),
          catchError(error => {
            // Gérer les erreurs
            let errorMessage = 'فشل تسجيل الدخول. يرجى التحقق من بريدك الإلكتروني وكلمة المرور والمحاولة مرة أخرى.';
            if (error.error.type === 'not_confirmed') {
              errorMessage = error.error.message;
            }
            return of(AuthActions.loginFailure({ error: errorMessage }));
          })
        )
      ), tap(()=>this.router.navigateByUrl('/dashboard'))
    )
  );
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadUser),
      mergeMap(() =>
        this.authService.isAuthenticated().pipe(
          map(response => AuthActions.loadUserSuccess({user:response.user, isAuth:response.state})),
          catchError(error => of(AuthActions.loadUserFailure({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        this.authService.logout().pipe(
          map(user => AuthActions.logoutSuccess()),
          catchError(error => of(AuthActions.logoutFailure({ error })))
        )
      ),
      tap(()=>this.router.navigateByUrl('/login'))
    )
  );


}
