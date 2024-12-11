import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

// Sélecteur de base pour accéder au state Auth
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Sélecteur pour vérifier si l'utilisateur est authentifié
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

// Sélecteur pour obtenir les informations de l'utilisateur authentifié
export const selectAuthenticatedUser = createSelector(
  selectAuthState,
  (state: AuthState) => {

    return state.user
  }
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  state => state.loading
);


// Sélecteur pour obtenir les erreurs d'authentification
export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
