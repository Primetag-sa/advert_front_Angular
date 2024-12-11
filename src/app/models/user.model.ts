import {BaseEntity} from "./base-entity.model";

export interface User extends BaseEntity  {
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  image?: string;
  role?: string;
  permissions?: string;
  is_confirmed?: boolean;
  confirmed_at?: Date;
  is_activated?: boolean;
  activated_at?: Date;
  token?: string;
  email_verified_at?: Date;
  password?: string |null;
  password_confirmation?: string |null;
  twitter_account_id?:string|null;
  tiktok_state?:boolean;
  tiktok_id?:string|null|undefined;
  google_state?:boolean;
  google_token?:string|null|undefined;
  customers_google?:string|null|undefined;
}
