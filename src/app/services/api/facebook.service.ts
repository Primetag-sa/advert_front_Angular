import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  private baseUrl = environment.apiUrl;
  private lastRequestUrl = '';

  constructor(private http: HttpClient) {}

  /**
   * Fetches Facebook accounts.
   * @returns Observable of an array of accounts.
   */
  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ads/facebook/accounts`);
  }

  /**
   * Fetches campaigns associated with a specific account.
   * @param accountId - The ID of the account.
   * @returns Observable of an array of campaigns.
   */
  getCampaigns(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ads/facebook/campaigns/${accountId}`);
  }

  /**
   * Fetches ad squads for a specific campaign.
   * @param campaignId - The ID of the campaign.
   * @returns Observable of an array of ad squads.
   */
  getAdSquads(campaignId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ads/facebook/squads/${campaignId}`);
  }

  /**
   * Fetches ads by account ID.
   * @param accountId - The ID of the account.
   * @returns Observable of an array of ads.
   */
  fetchAdsByAccount(accountId: number): Observable<any[]> {
    this.lastRequestUrl = `${this.baseUrl}/ads/facebook/ads/account/${accountId}`;
    return this.http.get<any[]>(this.lastRequestUrl);
  }

  /**
   * Fetches ads by campaign ID.
   * @param campaignId - The ID of the campaign.
   * @returns Observable of an array of ads.
   */
  fetchAdsByCampaign(campaignId: number): Observable<any[]> {
    this.lastRequestUrl = `${this.baseUrl}/ads/facebook/ads/campaign/${campaignId}`;
    return this.http.get<any[]>(this.lastRequestUrl);
  }

  /**
   * Fetches ads by ad squad ID.
   * @param adSquadId - The ID of the ad squad.
   * @returns Observable of an array of ads.
   */
  getAdsByAdSquad(adSquadId: number): Observable<any[]> {
    this.lastRequestUrl = `${this.baseUrl}/ads/facebook/ads/squad/${adSquadId}`;
    return this.http.get<any[]>(this.lastRequestUrl);
  }

  /**
   * Fetches aggregated Facebook ad data.
   * @returns Observable containing ads data.
   */
  getAdsData(): Observable<any> {
    this.lastRequestUrl = `${this.baseUrl}/facebook/ads-data`;
    return this.http.get<any>(this.lastRequestUrl);
  }

  /**
   * Redirects user to Facebook login for authentication.
   */
  connectFacebook(): void {
    window.location.href = `${this.baseUrl}/auth/facebook`;
  }

  /**
   * Fetches ad data with access token for authentication.
   * @param accessToken - The access token of the authenticated user.
   * @returns Observable containing ad data.
   */
  getAdData(accessToken: string): Observable<any> {
    const params = new HttpParams().set('access_token', accessToken);
    return this.http.get<any>(`${this.baseUrl}/facebook/ad-data`, { params });
  }

  /**
   * Fetches Facebook data for the user.
   * @returns Observable containing Facebook data.
   */
  getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-snap-data`);
  }

  /**
   * Initiates Facebook login with user email stored in local storage.
   */
  login(): void {
      window.location.href = `${this.baseUrl}/auth/facebook`;
  }

  /**
   * Logs out the user from Facebook.
   * @returns Observable of the logout response.
   */
  logout(): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/logout`, {});
  }


}
