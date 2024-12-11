import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class TweetService {

  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient,private router: Router) {}

  getUserTweets(): Observable<any> {
    return this.http.get(`${this.apiUrl}/twitter/tweets`,{withCredentials:true});
  }

  signOutTweeter(): Observable<any> {
    return this.http.get(`${this.apiUrl}/twitter/signOut`,{withCredentials:true});
  }

  getAdsAccountsTweeter(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ads/accounts/twitter?url=${this.router.url}`,{withCredentials:true});
  }
  getAdsAccountTweeter(id_account:any): Observable<any> {
    return this.http.get(`${this.apiUrl}/ads/account/twitter?id_account=${id_account}&url=${this.router.url}`,{withCredentials:true});
  }
}
