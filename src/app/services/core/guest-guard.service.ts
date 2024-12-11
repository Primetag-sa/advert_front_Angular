import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, combineLatest, of, timer } from 'rxjs';
import { take, filter, switchMap, map, catchError, timeout } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as authActions from '../../store/auth/auth.actions';
import * as CrudActions from '../../store/crud/crud.actions';
import { CheckAccessService } from './check-access.service';
import { NotifyService } from './notify.service';
import { selectAuthenticatedUser, selectAuthError, selectAuthLoading } from '../../store/auth/auth.selectors';
import { selectEntityList } from '../../store/crud/crud.selectors';

@Injectable({
  providedIn: 'root',
})
export class GuestGuardService implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private checkAccess: CheckAccessService,
    private notifyService: NotifyService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const path = route.routeConfig?.path;
    const idToCheck = route.data['id'];
    const isLoginRoute = path === 'login' || path === '' || path === '/';
    const previousUrl = localStorage.getItem('previousUrl');
    const url = state.url;

    // Si la route est un chemin générique non trouvé
    if (path === '**') {
      this.notifyService.notify('لم يتم العثور على الصفحة.');
      this.router.navigateByUrl(previousUrl || '/');
      return of(false);
    }

    return this.store.select(selectAuthenticatedUser).pipe(
      take(1),
      switchMap((currentUser) => {

        // Cas 1 : L'utilisateur est connecté et tente d'accéder à la route de connexion
        if (currentUser && isLoginRoute) {
          const lastUrl = previousUrl || '/dashboard';
          if (url !== lastUrl) {
            this.router.navigateByUrl(lastUrl);
          }
          return of(false);
        }

        // Cas 2 : L'utilisateur n'est pas connecté, on essaie de le charger avec timeout
        if (!currentUser) {
          this.store.dispatch(authActions.loadUser());

          return combineLatest([
            this.store.select(selectAuthenticatedUser),
            this.store.select(selectAuthLoading),
            this.store.select(selectAuthError),
          ]).pipe(
            filter(([user, loading, error]) => !loading),
            take(1),
            switchMap(([reloadedUser, loading, error]) => {

              if (reloadedUser && isLoginRoute) {
                const lastUrl = previousUrl || '/dashboard';
                if (url !== lastUrl) {
                  this.router.navigateByUrl(lastUrl);
                }
                return of(false);
              } else if (!reloadedUser && !isLoginRoute) {

                if (url !== '/login') {
                  this.router.navigateByUrl('/login');
                }
                return of(false);
              }

              if (!isLoginRoute) {
                this.store.dispatch(CrudActions.getAllNoPagination({ entity: 'role_access' }));

                return this.store.select(selectEntityList('role_access')).pipe(
                  timeout(5000), // Timeout pour éviter une boucle infinie
                  filter(
                    (rolesAccess) =>
                      (!!rolesAccess && rolesAccess.length > 0) || reloadedUser?.role === 'super_admin'
                  ),
                  take(1),
                  map((rolesAccess) => {
                    const arrayOfIds = this.checkAccess.loadArrayRoutesAccess(reloadedUser?.role, rolesAccess);
                    const hasAccess = this.checkAccess.checkIds(idToCheck, arrayOfIds);

                    if (!hasAccess && reloadedUser?.role !== 'super_admin') {
                      this.notifyService.notify('ليس لديك الحق في الوصول إلى هذه الصفحة.');
                      if (url !== previousUrl) {
                        this.router.navigateByUrl(previousUrl || '/');
                      }
                      return false;
                    }
                    localStorage.setItem('previousUrl', url || '/dashboard');
                    return true;
                  }),
                  catchError(() => {
                    // Gestion de l'erreur de timeout ou d'accès
                    this.router.navigateByUrl('/error');
                    return of(false);
                  })
                );
              }

              return of(true);
            }),
            catchError((err) => {
              this.router.navigateByUrl('/login');
              return of(false);
            })
          );
        }

        // Cas 3 : L'utilisateur est connecté et tente d'accéder à une autre route
        if (currentUser && !isLoginRoute) {
          console.log(1);
          this.store.dispatch(CrudActions.getAllNoPagination({ entity: 'role_access' }));

          return this.store.select(selectEntityList('role_access')).pipe(
            timeout(5000), // Timeout pour éviter une boucle infinie
            filter((rolesAccess) => !!rolesAccess && rolesAccess.length > 0),
            take(1),
            map((rolesAccess) => {
              const arrayOfIds = this.checkAccess.loadArrayRoutesAccess(currentUser?.role, rolesAccess);
              const hasAccess = this.checkAccess.checkIds(idToCheck, arrayOfIds);

              if (!hasAccess && currentUser?.role !== 'super_admin') {
                this.notifyService.notify('ليس لديك الحق في الوصول إلى هذه الصفحة.');
                if (url !== previousUrl) {
                  this.router.navigateByUrl(previousUrl || '/');
                }
                return false;
              }
              localStorage.setItem('previousUrl', url || '/dashboard');
              return true;
            }),
            catchError((err) => {
              if (err.status === 401) {
                this.router.navigateByUrl('/login');
                return of(false);
              }
              this.router.navigateByUrl('/error');
              return of(false);
            })
          );
        }

        return of(true);
      }),
      catchError((err) => {
        if (err.name === 'TimeoutError' || err.status === 401) {
          this.router.navigateByUrl('/login');
          return of(false);
        }
        this.router.navigateByUrl('/error');
        return of(false);
      })
    );
  }
}
