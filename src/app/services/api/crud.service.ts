import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Obtenir un seul élément par ID
  getOne(
    entity: string,
    id: string | number,
    params: { [key: string]: any } = {}
  ): Observable<any> {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.set(key, params[key]);
    });
    return this.http.get(`${this.baseUrl}/${entity}/${id}`, {
      params: httpParams,
      withCredentials: true,
    });
  }

  // Obtenir une liste paginée d'éléments
  getAll(
    entity: string,
    page: number = 1,
    pageSize: number = 10,
    params: { [key: string]: any } = {}
  ): Observable<any> {
    let httpParams = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    Object.keys(params).forEach((key) => {
      httpParams = httpParams.set(key, params[key]);
    });
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.baseUrl}/${entity}`, {
      params: httpParams,
      headers,
      withCredentials: true,
    });
  }

  // Créer un nouvel élément
  create(entity: string, data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/${entity}`, data, {
      withCredentials: true,
    });
  }

  // Mettre à jour un élément par ID
  update(entity: string, id: string | number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${entity}/${id}`, data, {
      withCredentials: true,
    });
  }

  // Supprimer un élément par ID
  delete(entity: string, id: string | number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${entity}/${id}`, {
      withCredentials: true,
    });
  }
}
