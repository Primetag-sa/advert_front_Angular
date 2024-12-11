import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {TweetService} from "../../../services/api/tweet.service";
import {Store} from "@ngrx/store";
import {selectAuthenticatedUser} from "../../../store/auth/auth.selectors";
import {User} from "../../../models/user.model";

import {
  isPageCached,
  selectEntityCurrentPage, selectEntityList,
  selectEntityPage, selectEntityPageSize,
  selectEntityTotalPages, selectTotalItems
} from "../../../store/crud/crud.selectors";
import {map, take} from "rxjs/operators";
import {Observable, tap} from "rxjs";
import * as CrudActions from "../../../store/crud/crud.actions";
import {getAll, getAllNoPagination} from "../../../store/crud/crud.actions";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-agency-x',
  templateUrl: './agency-x.component.html',
  styleUrl: './agency-x.component.scss'
})



export class AgencyXComponent implements OnInit{

  public url: string = `${environment.apiUrl}`;
  alertState=false
  isCollapsed = true;
  exist=false
  accounts:any;
  datas:any;
  labels:string[]=[]
  engagements:any[]=[]
  impressions:any[]=[]
  sales:any[]=[]
  clicks:any[]=[]
  campaigns:any[]=[]
  adGroup:any[]=[]
  ad:any[]=[]
  campaignSelected:string|null=null;
  campaignCreateTime:string|null=null;
  engagementPerThousandImpressions:number=0
  engagementPerImpressions:any;
  //stats query
  ds:string="";
  de:string="";
  placement:string='ALL_ON_TWITTER';
  granularity:string="TOTAL";
  activeEntities: any[] =[];
  userConneted: User | null | undefined;

  onDateChange(){
    if(this.granularity === 'stat_time_hour')
      this.de = this.ds
    else{
      this.de=""
    }
  }
  onChangeType(){
    if(this.granularity === 'stat_time_hour')
      this.de = this.ds

  }

  search(): void {
    if(this.de && this.ds)
    {
      this.getAdvertiserAnalytics()
    }
  }
  formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  getAdvertiserAnalytics(){

    this.campaigns=[]
    this.adGroup=[]
    this.ad=[]
    this.campaignSelected=null
    this.campaignCreateTime=null
    this.getCampaigns(this.selectedAccountId)
    this.getConversionsPerOneThousandImpressions( this.selectedAccountId,this.selectedAccountId,'ACCOUNT','TOTAL',"",'ALL_ON_TWITTER')
   this.getConversionsPerImpressions(this.selectedAccountId,this.selectedAccountId,'ACCOUNT','DAY',"",'ALL_ON_TWITTER')
    this.getImpressionsPerAudiance(this.selectedAccountId,this.selectedAccountId,'ACCOUNT','TOTAL',"AGE",'ALL_ON_TWITTER')
    this.getConversionsPerRevenue(this.selectedAccountId,this.selectedAccountId,'ACCOUNT','DAY',"",'ALL_ON_TWITTER')

  }

  getCampaigns(account_id:string){
    this.store.select(selectEntityList('twitter/campaigns')).subscribe((data:any  ) => {
      if(data.length>0 )
      {

          this.campaigns = data;

      }
    })
    this.store.dispatch(getAllNoPagination({entity:"twitter/campaigns",
        params: {
          "account_id":account_id,
          "url":"/x"
        }
      })
    )
  }
  getConversionsPerOneThousandImpressions(id:string,entity_ids:string,type:string,granularity:string,segmentation:string,placement:string)
  {

    const dateMinus7Days = new Date(); // Clone la date actuelle
    dateMinus7Days.setDate(dateMinus7Days.getDate() - 7); // Soustrait 7 days

    let start_date = this.ds
      ? new Date(this.ds)
      :  dateMinus7Days;

    let end_date = this.de
      ? new Date(this.de)
      : new Date();

    // Convertir en format string pour l'affichage dans l'input
    this.ds = this.formatDate(start_date);
    this.de = this.formatDate(end_date)

    this.store.dispatch(getAllNoPagination({entity:"twitter/conversionsperonethousandimpressions",
        params: {
          "account_id":id,
          'entity' : type,
          'entity_ids':entity_ids,
          'start_time' : start_date.toISOString(),
          'end_time' : end_date.toISOString(),
          'granularity':granularity,
          'placement':placement,
          'segmentation':segmentation==""?null:segmentation,
          "url":"/x"
        }
      })
    )
  }

  getConversionsPerImpressions(id:string,entity_ids:string,type:string,granularity:string,segmentation:string,placement:string)
  {

    const dateMinus7Days = new Date(); // Clone la date actuelle
    dateMinus7Days.setDate(dateMinus7Days.getDate() - 7); // Soustrait 7 days

    let start_date = this.ds
      ? new Date(this.ds)
      :  dateMinus7Days;

    let end_date = this.de
      ? new Date(this.de)
      : new Date();

    // Convertir en format string pour l'affichage dans l'input
    this.ds = this.formatDate(start_date);
    this.de = this.formatDate(end_date)

    this.store.dispatch(getAllNoPagination({entity:"twitter/conversionsperimpressions",
        params: {
          "account_id":id,
          'entity' : type,
          'entity_ids':entity_ids,
          'start_time' : start_date.toISOString(),
          'end_time' : end_date.toISOString(),
          'granularity':granularity,
          'placement':placement,
          'segmentation':segmentation==""?null:segmentation,
          "url":"/x"
        }
      })
    )
  }
  getImpressionsPerAudiance(id:string,entity_ids:string,type:string,granularity:string,segmentation:string,placement:string)
  {

    const dateMinus7Days = new Date(); // Clone la date actuelle
    dateMinus7Days.setDate(dateMinus7Days.getDate() - 7); // Soustrait 7 days

    let start_date = this.ds
      ? new Date(this.ds)
      :  dateMinus7Days;

    let end_date = this.de
      ? new Date(this.de)
      : new Date();

    // Convertir en format string pour l'affichage dans l'input
    this.ds = this.formatDate(start_date);
    this.de = this.formatDate(end_date)

    this.store.dispatch(getAllNoPagination({entity:"twitter/impressionsperaudiance",
        params: {
          "account_id":id,
          'entity' : type,
          'entity_ids':entity_ids,
          'start_time' : start_date.toISOString(),
          'end_time' : end_date.toISOString(),
          'granularity':granularity,
          'placement':placement,
          'segmentation':segmentation,
          "url":"/x"
        }
      })
    )
  }
  getConversionsPerRevenue(id:string,entity_ids:string,type:string,granularity:string,segmentation:string,placement:string)
  {

    const dateMinus7Days = new Date(); // Clone la date actuelle
    dateMinus7Days.setDate(dateMinus7Days.getDate() - 7); // Soustrait 7 days

    let start_date = this.ds
      ? new Date(this.ds)
      :  dateMinus7Days;

    let end_date = this.de
      ? new Date(this.de)
      : new Date();

    // Convertir en format string pour l'affichage dans l'input
    this.ds = this.formatDate(start_date);
    this.de = this.formatDate(end_date)

    this.store.dispatch(getAllNoPagination({entity:"twitter/conversionsperrevenue",
        params: {
          "account_id":id,
          'entity' : type,
          'entity_ids':entity_ids,
          'start_time' : start_date.toISOString(),
          'end_time' : end_date.toISOString(),
          'granularity':granularity,
          'placement':placement,
          'segmentation':segmentation==""?null:segmentation,
          "url":"/x"
        }
      })
    )
  }

  showDetailsOfCampaign(campaign_id:string,creation_date:string|null){
   console.log(campaign_id)
    this.adGroup=[]
    this.ad=[]
    this.campaignSelected=campaign_id
    this.campaignCreateTime=creation_date
    this.getConversionsPerOneThousandImpressions(this.selectedAccountId,campaign_id,'CAMPAIGN','TOTAL',"",'ALL_ON_TWITTER')
    this.getConversionsPerImpressions(this.selectedAccountId,campaign_id,'CAMPAIGN','DAY',"",'ALL_ON_TWITTER')
    this.getImpressionsPerAudiance(this.selectedAccountId,campaign_id,'CAMPAIGN','TOTAL',"AGE",'ALL_ON_TWITTER')
    this.getConversionsPerRevenue(this.selectedAccountId,campaign_id,'CAMPAIGN','DAY',"",'ALL_ON_TWITTER')

  }






  //account types
  typeOfData:any[]=[
    {id:'ACCOUNT',data:'',title:"بيانات الحساب"},
    {id:'CAMPAIGN',data:'campaigns',title:"الحملات"},
    {id:'FUNDING_INSTRUMENT',data:'funding_instruments',title:"أدوات التمويل"},
    {id:'LINE_ITEM',data:'line_items',title:"عناصر الحملة"},
    {id:'PROMOTED_ACCOUNT',data:'promoted_accounts',title:"الحسابات المروجة"},
    {id:'PROMOTED_TWEET',data:'promoted_tweets',title:"التغريدات المروجة"},
    {id:'MEDIA_CREATIVE',data:'media_creatives',title:"الوسائط الإبداعية"},
  ]
  selectedTypeOfData:string='ACCOUNT'

  //metrics
  metric_groups = [
    { label: 'الفواتير', value: 'BILLING' },
    { label: 'التفاعل', value: 'ENGAGEMENT' },
    { label: 'القيمة الكلية للمستخدم عبر التحويلات على الجوال', value: 'LIFE_TIME_VALUE_MOBILE_CONVERSION' },
    { label: 'وسائل الإعلام', value: 'MEDIA' },
    { label: 'تحويل الجوال', value: 'MOBILE_CONVERSION' },
    { label: 'الفيديو', value: 'VIDEO' },
    { label: 'تحويل الويب', value: 'WEB_CONVERSION' }
  ];
  selectedMetricGroups:any={
    ENGAGEMENT: true,
  }

  //Account
  pagination: any = {};
  selectedAccountId:string=""
  pagesSizeActiveEntities$: Observable<number>;
  pageSize:any;
  pageSizeActiveEntities:any;
  engagementPeerImpressions:number=0;

  //ActiveEntities
  currentPageActiveEntities$: Observable<number>;
  totalPagesActiveEntities$: Observable<number>;
  currentPageActiveEntities:any;
  totalPagesActiveEntities:any;
  currentAccount:string="0";


  constructor(private store:Store,private router: Router,private route: ActivatedRoute,private tweetService:TweetService,private datePipe: DatePipe) {
    this.store.select(selectAuthenticatedUser).subscribe((user) =>{
      this.userConneted=user
    })

    //ActiveEntities
    this.currentPageActiveEntities$ = this.store.select(selectEntityCurrentPage('active-entities'));
    this.totalPagesActiveEntities$ = this.store.select(selectEntityTotalPages('active-entities'));
    this.pagesSizeActiveEntities$ = this.store.select(selectEntityPageSize('active-entities'));
    this.currentPageActiveEntities$.subscribe((page  ) => {
      this.currentPageActiveEntities = page;
    })
    this.totalPagesActiveEntities$.subscribe((totalPage  ) => {
      this.totalPagesActiveEntities = totalPage;
    })
    this.pagesSizeActiveEntities$.subscribe((pageSizeActiveEntities  ) => {
      this.pageSizeActiveEntities = pageSizeActiveEntities;
    })
  }
  ngOnInit() {

    this.exist=false;
    this.route.queryParams.subscribe(params => {

      switch (params['status']) {
        case 'success':
        {
          this.alertState=true
          this.initializeComponent()
          break;
        }
        case 'failure':
        {
          this.alertState=false
          this.initializeComponent()
          break;
        }
      }
    });
    this.getAllAccounts()
    this.store.select(selectEntityList('twitter/conversionsperonethousandimpressions')).subscribe((data:any  ) => {
      if(data.data)
      {
        this.engagementPerThousandImpressions=(data.data[0].id_data[0].metrics.engagements /data.data[0].id_data[0].metrics.impressions)* 100;
        this.engagementPerThousandImpressions= Math.round(this.engagementPerThousandImpressions * 100) / 100


      }

    })
    this.store.select(selectEntityList('twitter/conversionsperimpressions')).subscribe((data:any  ) => {
      if(data) {

        this.engagementPerImpressions = {
          "engagements": data.data[0].id_data[0].metrics.engagements,
          "impressions": data.data[0].id_data[0].metrics.impressions
        }
      }
      console.log(data)
    })
    this.store.select(selectEntityList('twitter/impressionsperaudiance')).subscribe((data:any  ) => {

    })
    this.store.select(selectEntityList('twitter/conversionsperrevenue')).subscribe((data:any  ) => {

    })

  }



  showDetailsOfActiveEntities(activeEntities:any){

    const analyticsData = JSON.parse(activeEntities.data_analytics)[0].metrics;
    this.labels = this.generateLabels(activeEntities);

    this.engagements=analyticsData.engagements

    this.impressions=analyticsData.impressions

    this.sales=analyticsData.conversion_site_visits

    this.clicks=analyticsData.clicks

    this.getCountOfEngagementPeerImpressions()
  }

  getCountOfEngagementPeerImpressions(){
    let eng=0
    let imp=1
    if(this.engagements.length>0)
      eng=this.engagements[this.engagements.length-1]
    if(this.impressions.length>0)
      imp=this.impressions[this.impressions.length-1]
    console.log(eng, imp)
    this.engagementPeerImpressions = Math.ceil((eng/imp)*100)
  }

  private generateLabels(activeEntities:any) {
    const start = new Date(activeEntities.start_time);
    const end = new Date(activeEntities.end_time);
    const timeDiff = end.getTime() - start.getTime();
    const hoursDiff = Math.floor(timeDiff / (1000 * 3600));
    const labels=[]
    for (let i = 0; i <= activeEntities.time_series_length; i++) {
      const labelDate = new Date(start.getTime() + (i * (timeDiff / activeEntities.time_series_length)));
      labels.push(labelDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' })); // Format selon tes besoins
    }
    return labels;
  }
  getActiveEntities(accountId:number)
  {

    const entity = 'ads/account/active-entities'; // Remplace par l'entité que tu veux charger
    const params = {
      "accountId":accountId,
      "url":this.router.url
    };

    this.store.dispatch(getAllNoPagination({ entity, params }));
  }

  initialize(){
    this.activeEntities=[]
    this.engagementPeerImpressions=0
    this.sales=[]
    this.clicks=[]
    this.engagements=[]
    this.impressions=[]
    this.labels=[]
  }
  selectedChoice(event: Event)
  {
    const selectElement = event.target as HTMLSelectElement;
    this.initialize()
    this.selectedAccountId=selectElement.value
    if(selectElement.value!="")
    {
      this.getAdvertiserAnalytics()
    }
  }
  getDataById(id: string): string {
    const item = this.typeOfData.find(element => element.id === id);
    return item ? item.data : '';
  }
  getMetric(accountId:string,type:string,entityId:string,ds:string,de:string,placement:string,granularity:any,metric_groups:string){
      switch (type){
        case "ACCOUNT":
        {
          this.store.select(selectEntityList('twitter/metrics')).subscribe((data:any  ) => {
            this.datas = data;
          })
          this.store.dispatch(getAllNoPagination({entity:"twitter/metrics",
            params: { "id":accountId,
                      "type":type,
                      "entity_ids":entityId,
                      "ds":ds,
                      "de":de,
                      "placement":placement,
                      "granularity":granularity,
                      "metric_group":metric_groups,
                      "url":"/x"
                    }
              })
          )

          break
        }
        default:
        {
          break
        }
      }
  }


  getDatas(accountId:string,type:string)
  {
    this.store.select(selectEntityList('twitter/account/datas')).subscribe((data:any  ) => {
      this.datas = data;
    })
    this.store.dispatch(getAllNoPagination({entity:"twitter/account/datas", params: {"id":accountId,"type":type,"url":"/x"}}))
  }

  getActiveFromDBEntities(accountId:string,page: number)
  {

    const pageSize = 2;
    // Check if the page is cached
    this.store.select(isPageCached('active-entities', page))
      .pipe(
        take(1),
        tap(isCached => {
          if (!isCached || this.currentAccount!=accountId) {
            // If not cached, dispatch the action to load the page
            this.store.dispatch(CrudActions.getAll({ entity: 'active-entities', page, pageSize ,params:{"accountId":accountId}}));
            this.currentAccount=accountId
          }
        })
      )
      .subscribe();
    this.store.select(selectEntityPage('active-entities', page,this.pageSize)).subscribe((activeEntities:any[]  ) => {
      this.currentPageActiveEntities=page
      this.activeEntities = activeEntities;

    })
  }
  getAllFromServerAccounts(){

   /* this.store.select(selectEntityList('ads/accounts/twitter')).pipe(
      map((accounts:any)=>accounts.map((account:any)=>{
        console.log(account)
          return {
            ...account,
            account_id:account.id
          }
        })
      )
    ).subscribe((account:any)=>{
      console.log(account)
    })*/

    this.tweetService.getAdsAccountsTweeter().pipe(
      map((accounts:[])=>accounts.map((account:any)=>{
        return {
          ...account,
          account_id:account.id
        }
      })
      )
    ).subscribe(
      (data: any) => {
        this.accounts = data;
        this.accounts.map((account:any)=>{
          this.tweetService.getAdsAccountTweeter(account.account_id).subscribe()
        })

        console.log(this.accounts)

      },
      (error:any) => {
        console.error('Error fetching tweets', error);
      }
    );
  }
  getAllAccounts(): void {
    // Check if the page is cached
    this.store.select(isPageCached('account', 1))
      .pipe(
        take(1),
        tap(isCached => {
          if (!isCached) {
            // If not cached, dispatch the action to load the page
            this.store.dispatch(CrudActions.getAllNoPagination({ entity: 'account' }));
          }
        })
      )
      .subscribe();
    this.store.select(selectEntityList('account')).subscribe((account:any  ) => {

      this.accounts = account;
    })
  }

  private generateLabel(label: any, type: string): string | undefined {

    let finalLabel: string | undefined;

    switch (type) {
      case "stat_time_day": {
        const start = new Date(label); // Convertir le label en objet Date
        // Format jour/mois/année
        const day = start.getDate().toString().padStart(2, '0'); // Jour sur 2 chiffres
        const month = (start.getMonth() + 1).toString().padStart(2, '0'); // Mois sur 2 chiffres
        const year = start.getFullYear().toString().slice(-2); // Année sur 2 chiffres
        finalLabel = `${day}/${month}/${year}`;
        break;
      }
      case "stat_time_hour": {
        const start = new Date(label); // Convertir le label en objet Date
        console.log(label)
        // Format heure:minute
        const hours = start.getHours().toString().padStart(2, '0'); // Heure sur 2 chiffres
        const minutes = start.getMinutes().toString().padStart(2, '0'); // Minute sur 2 chiffres
        finalLabel = `${hours}:${minutes}`;
        break;
      }
      case "age": {
        finalLabel = label;
        break;
      }
      default: {
        console.warn(`Type "${type}" non reconnu.`);
        break;
      }
    }
    return finalLabel;
  }


  initializeComponent():void{
    this.exist=true;
    const currentUrl = this.router.url;
    const baseUrl = currentUrl.split('?')[0];  // Remove query parameters if any
    this.router.navigateByUrl(baseUrl, {replaceUrl: true}).then(r =>null);
  }
  signInTweeter():void{
    window.location.href= `${environment.apiUrl}/auth/twitter?url=${this.router.url}`;

  }
  signOutTweeter():void{
    this.tweetService.signOutTweeter().subscribe(
      (data: any) => {
        this.userConneted = data;

      },
      (error:any) => {
        console.error('Error fetching tweets', error);
      }
    );
  }
  getSelectedMetricGroups(): string {
    return Object.keys(this.selectedMetricGroups)
      .filter(key => this.selectedMetricGroups[key])
      .join(', ');
  }
  refreshAccounts(){
    this.store.select(selectEntityList('twitter/accounts')).subscribe((account:any  ) => {
      this.accounts = account;
    })
    this.store.dispatch(getAllNoPagination({entity:"twitter/accounts", params: []}))



    /*this.tweetService.getAdsAccountsTweeter().subscribe(
      (data: any) => {
        this.accounts = data;

      },
      (error:any) => {
        console.error('Error fetching tweets', error);
      }
    );*/

  }

}
