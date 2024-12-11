// src/app/services/notification.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) { }

  // Get all notifications
  getNotifications0(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getNotifications(page: number = 1, perPage: number = 10, status:string='all',role:string = 'agency'): Observable<any> {
    let params = new HttpParams()
      .set('status', status)
      .set('page', page.toString())
      .set('per_page', perPage.toString());


    return this.http.get<any>(this.apiUrl, { params });
  }

  // Get notifications for a specific user
  getUserNotifications(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  // Create a new notification
  createNotification(notification: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, notification);
  }

  // Get a specific notification by ID
  getNotification(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Update a notification
  updateNotification(id: number, notification: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, notification);
  }

  // Delete a notification
  deleteNotification(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
