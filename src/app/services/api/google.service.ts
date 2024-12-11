import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  private apiUrl = `${environment.apiUrl}/google-ads`;

  constructor(private http: HttpClient) {}

  getUserGoogle():any {
    return this.http.get(`${this.apiUrl}/user`);
  }

  signOutGoogle(): Observable<any> {
    return this.http.get(`${this.apiUrl}/signOut`,{withCredentials:true});
  }

}
