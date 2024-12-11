import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import {User} from "../../models/user.model";
import {logoutSuccess} from "./auth.actions";


export interface AuthState {
  user: User | null;
  loading: boolean;
  error: any | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false
};

export const authReducer = createReducer(
  initialState,
 on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null,
   isAuthenticated: false
  })),
  on(AuthActions.loginSuccess, (state, { user }) => {

    return {
      ...state,
      user,
      loading: false,
      error: null,
      isAuthenticated: true
    };
  }),
  on(AuthActions.loginFailure, (state,{error}) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    error
  })),

  on(AuthActions.loadUser, state => ({
    ...state,
    loading: true,
    error: null,
    isAuthenticated: false
  })),
  on(AuthActions.loadUserSuccess, (state, { user,isAuth }) => {

    return {
      ...state,
      user,
      loading: false,
      error: null,
      isAuthenticated: isAuth
    };
  }),
  on(AuthActions.loadUserFailure, (state,{error}) => ({
    ...state,
    loading: false,
    isAuthenticated: false,
    error
  })),


  // Action lancée lorsque la déconnexion commence (optionnel)
  on(AuthActions.logout, (state) => ({
    ...state,
    loading: true,   // Vous pouvez utiliser ceci pour indiquer un état de chargement pendant la déconnexion
    error: null,      // Réinitialiser toute erreur précédente
    isAuthenticated: false
  })),
// Action lancée lorsque la déconnexion commence (optionnel)
  on(AuthActions.logoutSuccess, state => ({
  ...state,
    user:null,
    loading: false,   // Vous pouvez utiliser ceci pour indiquer un état de chargement pendant la déconnexion
    error: null,      // Réinitialiser toute erreur précédente
    isAuthenticated: false
}))
);
