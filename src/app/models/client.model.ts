import {User} from "./user.model";

export interface Client extends User  {
  address?:string;
  agencyName?: string,
  facebook_url?: string,
  tiktok_url?: string,
  snapchat_url?: string,
  instagram_url?: string,
  x_url?: string,
}
