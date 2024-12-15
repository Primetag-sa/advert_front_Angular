import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrlMain = environment.apiUrl; // Update this to your Laravel API URL
  private apiUrls = `${environment.apiUrl}/register`; // Update this to your Laravel API URL

  options: any;

  constructor(private http: HttpClient) {
    // super(http, `${environment.apiUrl}/users`);
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
    };
  }

  /* constructor(private http: HttpClient) {


  } */

  /* getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this. apiUrls);
  } */

  getUsers(
    page: number = 1,
    perPage: number = 10,
    status: string = 'all',
    role: string = 'agency',
    agencyId = '0'
  ): Observable<any> {
    let params = new HttpParams()
      .set('role', role)
      .set('status', status)
      .set('agencyId', agencyId)
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    return this.http.get<any>(this.apiUrls, { params });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrls}/${id}`);
  }
  //agency/agents
  getAgencyAgents(
    page: number = 1,
    perPage: number = 10,
    status: string = 'all',
    role: string = 'agency',
    agencyId: any = '0'
  ): Observable<any> {
    let params = new HttpParams()
      .set('role', role)
      .set('status', status)
      .set('agencyId', agencyId)
      .set('page', page.toString())
      .set('per_page', perPage.toString());

    console.log(this.apiUrls, { params });

    return this.http.get<any>(`${this.apiUrlMain}/agency/agents`, { params });
  }
  create(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrls, user);
  }

  update(id: string | null, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrls}/${id}`, user);
  }
  getAgencyById(id: string): Observable<any> {
    console.log(`${this.apiUrls}/${id}`);
    return this.http.get<any>(`${this.apiUrls}/${id}`);
  }

  changeStatus(id: string, cancelPayload: any): Observable<User> {
    console.log(`${this.apiUrls}/${id}/change/status`);
    return this.http.patch<User>(
      `${this.apiUrls}/${id}/change/status`,
      cancelPayload
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrls}/${id}`);
  }

  getVisitorEvents(params?: any): Observable<any> {
    const options = { ...this.options, params }; // Merge existing options with query params
    return this.http.get(`${this.apiUrlMain}/visitor-events`, options);
  }

  // getVisitorEvents(): Observable<any> {
  //   return this.http.get(`${this.apiUrlMain}/visitor-events`, this.options);
  // }
}
