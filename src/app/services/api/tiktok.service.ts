import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TiktokService {

  private apiUrl = `${environment.apiUrl}/tiktok`;

  constructor(private http: HttpClient) {}

  getUserTiktok():any {
    return this.http.get(`${this.apiUrl}/user`);
  }

  signOutTiktok(): Observable<any> {
    return this.http.get(`${this.apiUrl}/signOut`,{withCredentials:true});
  }

}
