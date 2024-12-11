
import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { FacebookService } from '../../../services/api/facebook.service';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUser } from '../../../store/auth/auth.selectors';
import { User } from '../../../models/user.model';
import { selectEntityData } from '../../../store/crud/crud.selectors';
import { getAllNoPagination, getOne } from '../../../store/crud/crud.actions';


@Component({
  selector: 'app-agencyfacebook',
  templateUrl: './agencyfacebook.component.html',
  styleUrl: './agencyfacebook.component.scss'
})
export class AgencyfacebookComponent {

  alertState = false;
  exist = false;
  facebookUser: any;
  userConnected: User | null | undefined;

  /*

   "status": "ACTIVE",
    "type": "SNAP_AD"

  */

  // Date range defaults
  startDate: string = '';
  endDate: string = '';
  type: string = 'DAY';

  // Chart properties
  chartData: number[][] = [];
  chartLabels: string[] = [];
  chartLegends: string[] = ['النقرات', 'المبيعات'];

  chartData_2: number[][] = [];
  chartLabels_2: string[] = ['النقرات', 'الزوار', 'التفاعلات'];
  backgroundColorChoice: number[] = [];
  borderColorChoice: number[] = [];
  optionsChoice = 0;

  engagements_3: number[] = [];
  impressions_3: number[] = [];
  labels_3: string[] = [];
  backgroundColorChoice_3: number[] = [4, 5];
  borderColorChoice_3: number[] = [1, 1];
  fillChoice_3 = true;
  optionsChoice_3 = 1;

  // API data
  hourlyDataNew: any;
  doughnutData: any;
  lineData: any;
  adData: any;
  engagementPeerImpressions = 0;

  accountsSelect: any[] = [];
  campaignsSelect: any[] = [];
  adSquadsSelect: any[] = [];
  adsSelect: any[] = [];
  activeAd = 0;

  selectedAccountId: number | null = null;
  selectedCampaignId: number | null = null;
  selectedAdSquadId: number | null = null;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private facebookService: FacebookService
  ) {}

  ngOnInit(): void {
    this.initializeDateRange();
    this.checkLocalStorageForUser();
    this.handleRouteParams();
    this.loadAuthenticatedUser();
    this.fetchAccounts();
  }

  private initializeDateRange(): void {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    this.startDate = lastWeek.toISOString().split('T')[0];
    this.endDate = today.toISOString().split('T')[0];
  }

  private checkLocalStorageForUser(): void {

    const params = {

    };
    this.store.dispatch(getAllNoPagination({entity: 'snapchat/ad-data' ,params}));
    this.store.select(selectEntityData('snapchat/ad-data')).subscribe((response) => {
      this.processChartData(response);
    });
  }

  private handleRouteParams(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['status'] === 'success') {
        this.alertState = true;
        this.initializeComponent();
      } else if (params['status'] === 'failure') {
        this.alertState = false;
        this.initializeComponent();
      }
    });
  }

  private loadAuthenticatedUser(): void {
    this.store.select(selectAuthenticatedUser).subscribe((user) => {
      this.userConnected = user;
      this.facebookUser = user;
    });
  }

  initializeComponent(): void {
    this.exist = true;
    const currentUrl = this.router.url.split('?')[0];
    this.router.navigateByUrl(currentUrl, { replaceUrl: true });
  }

  fetchAccounts(): void {
    this.facebookService.getAccounts().subscribe((data) => {
      this.accountsSelect = data;
      if (this.accountsSelect.length > 0) {
        this.onAccountChange(this.accountsSelect[0].id);
      }
    });
  }

  onAccountChange(accountId: number): void {
    this.selectedAccountId = accountId;
    this.campaignsSelect = [];
    this.adSquadsSelect = [];
    this.adsSelect = [];
    this.fetchCampaigns(accountId);
    this.fetchAdsAccount(accountId);
  }

  fetchCampaigns(accountId: number): void {
    this.facebookService.getCampaigns(accountId).subscribe((data) => {
      this.campaignsSelect = data;
    });
  }

  fetchAdsAccount(accountId: number): void {
    this.facebookService.fetchAdsByAccount(accountId).subscribe((data) => {
      this.adsSelect = data;
      if (data.length > 0) {
        this.activeAd = data[0].id;
        this.getChartForAds(this.activeAd);
      }
    });
  }

  onCampaignChange(campaignId: number): void {
    this.selectedCampaignId = campaignId;
    this.adSquadsSelect = [];
    this.adsSelect = [];
    this.activeAd = 0;
    this.getChartForCampaign(campaignId);
    this.fetchAdSquads(campaignId);
    this.fetchAdsCampaign(campaignId);
  }

  onAdSquadChange(adSquadId: number): void {
    this.selectedAdSquadId = adSquadId;
    this.fetchAds(adSquadId);
    this.activeAd = 0
    this.getChartForAdSquad(adSquadId)
  }
  fetchAds(adSquadId: number): void {
    this.facebookService.getAdsByAdSquad(adSquadId).subscribe((data) => {
      this.adsSelect = data; // Fetch ads for the selected ad squad
      console.log(data)

    });
  }

  fetchAdSquads(campaignId: number): void {
    this.facebookService.getAdSquads(campaignId).subscribe((data) => {
      this.adSquadsSelect = data;
    });
  }

  fetchAdsCampaign(campaignId: number): void {
    this.facebookService.fetchAdsByCampaign(campaignId).subscribe((data) => {
      this.adsSelect = data;
    });
  }

  lastRequest :string ='';
  lastId :number =0;
  getChartForAds(id: number): void {
    this.lastRequest ='get-status';
    this.lastId =id;
    this.activeAd = id
    this.dispatchGetOneRequest();
  }

  getChartForCampaign(id: number): void {
    this.lastRequest ='get-campaign-status';
    this.lastId =id;
    this.dispatchGetOneRequest();
  }

  getChartForAdSquad(id: number): void {
    this.lastId =id;
    this.lastRequest ='get-ad-squad-status';
    this.dispatchGetOneRequest();
  }

  private dispatchGetOneRequest(): void {

    var entity = this.lastRequest;
    var id = this.lastId;
    if (this.endDate && this.endDate < this.startDate) {
      this.endDate = ''; // Clear end date if it's before the new start date
    }
    if (this.startDate && this.endDate && this.endDate < this.startDate) {
      console.warn('End date cannot be before start date.');
      this.endDate = ''; // Optionally clear end date or show an error message
    }

    const params = {
      "endDate":this.endDate,
      "startDate":this.startDate,
      "type":this.type
    };

    console.log('get-stats');
    this.store.dispatch(getOne({ entity, id ,params}));
    this.store.select(selectEntityData(entity)).subscribe((response) => {
      this.processChartData(response);
    });
  }

  onStartDateChange(event: any): void {
    this.dispatchGetOneRequest();
  }

  onEndDateChange(event: any): void {
    this.dispatchGetOneRequest();
  }

  onChangeType(event: any): void {
    this.type = event
    console.log(event);
    this.dispatchGetOneRequest();
  }

  private processChartData(response: any): void {
    this.hourlyDataNew = response?.hourly;
    this.doughnutData = response?.doughnut;
    this.lineData = response?.line;
    this.engagementPeerImpressions = response?.engagementPerImpression;
    this.processHourlyData(this.hourlyDataNew);
    this.processDoughnutData(this.doughnutData);
    this.processLineData(this.lineData);
  }

  private processHourlyData(hourlyData: any): void {
    this.chartLabels = hourlyData?.hours || [];
    this.chartData = [hourlyData?.clicks || [], hourlyData?.sales || []];
  }

  private processDoughnutData(doughnutData: any): void {
    console.log('doughnutData');
    console.log(doughnutData);
    this.chartData_2 = [[doughnutData.interactions ?? 0, doughnutData.visitor_clicks ?? 0,doughnutData.visitor_interactions??'']];
    this.backgroundColorChoice = [1];
    this.borderColorChoice = [1];
    this.optionsChoice = 3;
  }

  private processLineData(lineData: any): void {
    this.engagements_3 = lineData?.visitors || [];
    this.impressions_3 = lineData?.interactions || [];
    this.labels_3 = lineData?.hours || [];
  }

  signInFacebook(): void {
    this.facebookService.login();
  }
}