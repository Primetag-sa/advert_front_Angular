
import { createAction, props } from '@ngrx/store';
import {User} from "../../models/user.model";


export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const loadUser = createAction('[Auth] Load User');
export const loadUserSuccess = createAction('[Auth] Load Success', props<{ user: User,isAuth:boolean }>());
export const loadUserFailure = createAction('[Auth] Load Failure', props<{ error: string }>());

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Failure', props<{ error: any }>());
