// src/app/services/snapchat.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SnapchatService {
  
  private baseUrl = environment.apiUrl;
  private lastRequestUrl = '';

  constructor(private http: HttpClient) {}

  /**
   * Fetches Snapchat accounts.
   * @returns Observable of an array of accounts.
   */
  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ads/snapchat/accounts`);
  }

  /**
   * Fetches campaigns associated with a specific account.
   * @param accountId - The ID of the account.
   * @returns Observable of an array of campaigns.
   */
  getCampaigns(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ads/snapchat/campaigns/${accountId}`);
  }

  /**
   * Fetches ad squads for a specific campaign.
   * @param campaignId - The ID of the campaign.
   * @returns Observable of an array of ad squads.
   */
  getAdSquads(campaignId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ads/snapchat/squads/${campaignId}`);
  }

  /**
   * Fetches ads by account ID.
   * @param accountId - The ID of the account.
   * @returns Observable of an array of ads.
   */
  fetchAdsByAccount(accountId: number): Observable<any[]> {
    this.lastRequestUrl = `${this.baseUrl}/ads/snapchat/ads/account/${accountId}`;
    return this.http.get<any[]>(this.lastRequestUrl);
  }

  /**
   * Fetches ads by campaign ID.
   * @param campaignId - The ID of the campaign.
   * @returns Observable of an array of ads.
   */
  fetchAdsByCampaign(campaignId: number): Observable<any[]> {
    this.lastRequestUrl = `${this.baseUrl}/ads/snapchat/ads/campaign/${campaignId}`;
    return this.http.get<any[]>(this.lastRequestUrl);
  }

  /**
   * Fetches ads by ad squad ID.
   * @param adSquadId - The ID of the ad squad.
   * @returns Observable of an array of ads.
   */
  getAdsByAdSquad(adSquadId: number): Observable<any[]> {
    this.lastRequestUrl = `${this.baseUrl}/ads/snapchat/ads/squad/${adSquadId}`;
    return this.http.get<any[]>(this.lastRequestUrl);
  }

  /**
   * Fetches aggregated Snapchat ad data.
   * @returns Observable containing ads data.
   */
  getAdsData(): Observable<any> {
    this.lastRequestUrl = `${this.baseUrl}/snapchat/ads-data`;
    return this.http.get<any>(this.lastRequestUrl);
  }

  /**
   * Redirects user to Snapchat login for authentication.
   */
  connectSnapchat(): void {
    window.location.href = `${this.baseUrl}/auth/snapchat`;
  }

  /**
   * Fetches ad data with access token for authentication.
   * @param accessToken - The access token of the authenticated user.
   * @returns Observable containing ad data.
   */
  getAdData(accessToken: string): Observable<any> {
    const params = new HttpParams().set('access_token', accessToken);
    return this.http.get<any>(`${this.baseUrl}/snapchat/ad-data`, { params });
  }

  /**
   * Fetches Snapchat data for the user.
   * @returns Observable containing Snapchat data.
   */
  getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-snap-data`);
  }

  // private readonly baseUrl = 'https://advert.sa/api'; // Your Laravel API base URL
  login(): void {
      window.location.href = `${this.baseUrl}/auth/snapchat`;
  }

  
  
  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/logout`, {});
  }


  // Change date for ads based on provided request, ID, and date range
  changeDate(
    lastRequest: string,
    id: number,
    startDate: string,
    endDate: string,
  ): Observable<any> {
    // Construct the request URL dynamically based on lastRequest and the ID
    const url = `${this.baseUrl}/${lastRequest}/${id}`;

    // Log the URL for debugging purposes
    console.log(url);

    // Prepare query parameters to send in the GET request
    const params = {
      startDate: startDate,
      endDate: endDate,
    };

    // Make the HTTP GET request to the backend with query parameters
    return this.http.get<any>(url, { params });
  }

}
