import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {TweetService} from "../../../services/api/tweet.service";
import {Store} from "@ngrx/store";
import {selectAuthenticatedUser} from "../../../store/auth/auth.selectors";
import {User} from "../../../models/user.model";

import {selectEntityList} from "../../../store/crud/crud.selectors";

import { getAllNoPagination} from "../../../store/crud/crud.actions";
import {DatePipe} from "@angular/common";
import {TiktokService} from "../../../services/api/tiktok.service";


@Component({
  selector: 'app-agency-tiktok',
  templateUrl: './agency-tiktok.component.html',
  styleUrl: './agency-tiktok.component.scss'
})



export class AgencyTiktokComponent implements OnInit{

  public url: string = `${environment.apiUrl}`;
  alertState=false
  exist=false
  accounts:any;
  labels:string[]=[]
  engagements:any[]=[]
  impressions:any[]=[]
  sales:any[]=[]
  clicks:any[]=[]
  campaigns:any[]=[]
  adGroup:any[]=[]
  ad:any[]=[]
  type:string="stat_time_day"
  engagementPerThousandImpressions:number=0
  engagementPerImpressions:any;
  impressionsPerAudiance:any;
  conversionPeerRevenue:any;
  campaignSelected:string|null=null;
  campaignCreateTime:string|null=null;
  adGroupSelected:string|null=null;
  adGroupCreateTime:string|null=null;
  adSelected:string|null=null;
  adCreateTime:string|null=null;
  ds:string="";
  de:string="";
  userConneted: User | null | undefined;
  selectedAccountId:string=""


  constructor(private store:Store,private router: Router,private route: ActivatedRoute,private tiktokService:TiktokService,private datePipe: DatePipe) {
    this.store.select(selectAuthenticatedUser).subscribe((user) =>{
      this.userConneted=user
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
    this.initialize();
    this.getAllAccounts()

    this.store.select(selectEntityList('tiktok/conversionsperonethousandimpressions')).subscribe((data:any  ) => {
      if(data.data)
        this.engagementPerThousandImpressions=data.data?.list[0].metrics.conversion_rate * 1000;

    })
    this.store.select(selectEntityList('tiktok/conversionsperimpressions')).subscribe((data:any  ) => {
      if(data.data)
      {
        const reversedList = [...(data.data?.list || [])].sort((a, b) => {
          return   this.type==="stat_time_day"?
          new Date(a.dimensions.stat_time_day).getTime() - new Date(b.dimensions.stat_time_day).getTime():
          new Date(a.dimensions.stat_time_hour).getTime() - new Date(b.dimensions.stat_time_hour).getTime();
        });

        this.engagementPerImpressions={
          "labels": reversedList.map((list:any)=>this.generateLabel(this.type==="stat_time_day"?list.dimensions.stat_time_day:list.dimensions.stat_time_hour,this.type)),
          "conversion":reversedList.map((list:any)=>list.metrics.conversion),
          "impressions":reversedList.map((list:any)=>list.metrics.impressions)
        }


      }

    })
    this.store.select(selectEntityList('tiktok/impressionsperaudiance')).subscribe((data:any  ) => {
      if(data.data)
      {
        const reversedList = [...(data.data?.list || [])].sort((a, b) => {
          return   this.type==="stat_time_day"?
            new Date(a.dimensions.stat_time_day).getTime() - new Date(b.dimensions.stat_time_day).getTime():
            new Date(a.dimensions.stat_time_hour).getTime() - new Date(b.dimensions.stat_time_hour).getTime();
        });
        this.impressionsPerAudiance={
          "labels": reversedList.map((list:any)=>this.generateLabel(list.dimensions.age,"age")),
          "impressions":reversedList.map((list:any)=>list.metrics.impressions)
        }
      }
    })
    this.store.select(selectEntityList('tiktok/conversionsperrevenue')).subscribe((data:any  ) => {
      if(data.data)
      {
        let lastOne:any=0;
        const reversedList = [...(data.data?.list || [])].sort((a, b) => {
          return   this.type==="stat_time_day"?
            new Date(a.dimensions.stat_time_day).getTime() - new Date(b.dimensions.stat_time_day).getTime():
            new Date(a.dimensions.stat_time_hour).getTime() - new Date(b.dimensions.stat_time_hour).getTime();
        });
        this.conversionPeerRevenue={
          "labels": reversedList.map((list:any)=>this.generateLabel(this.type==="stat_time_day"?list.dimensions.stat_time_day:list.dimensions.stat_time_hour,this.type)),
          "purchase":reversedList.map((list:any)=>list.metrics.purchase),
          "spend":reversedList.map((list:any)=>list.metrics.spend),
          "earnings":reversedList.map((list:any,index:any)=>
          {
            const result=list.metrics.total_purchase_value-list.metrics.spend+lastOne
            lastOne = result
            return result;
          })
        }
      }
    })
  }

  initialize(){
    this.campaigns=[]
    this.adGroup=[]
    this.ad=[]
    this.ds=""
    this.de=""
    this.type="stat_time_day"
    this.engagementPerThousandImpressions=0
    this.engagementPerImpressions=null
    this.impressionsPerAudiance=null
    this.conversionPeerRevenue=null;
    this.campaignSelected=null;
    this.campaignCreateTime=null
    this.adGroupSelected=null
    this.adGroupCreateTime=null
    this.adSelected=null
    this.adCreateTime=null
  }




  signInTiktok():void{
    window.location.href= `${environment.apiUrl}/auth/tiktok?url=${this.router.url}`;
  }
  signOutTiktok():void{
    this.tiktokService.signOutTiktok().subscribe(
      (data: any) => {
        this.userConneted = data;
        this.initialize()
      },
      (error:any) => {
        console.error('Error fetching tweets', error);
      }
    );
  }

  //get all advertiser from db
  getAllAccounts(): void {
    this.accounts=this.userConneted?.tiktok_id?JSON.parse(this.userConneted?.tiktok_id):[];
  }
  refreshAccounts(){
    this.store.select(selectEntityList('tiktok/accounts')).subscribe((account:any  ) => {
      if(account.data)
        this.accounts=account.data?.list
    })
    this.store.dispatch(getAllNoPagination({entity:"tiktok/accounts", params: []}))
  }
  //Select advertiser
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

  //get Campaigns
  getCampaigns(advertiser_id:string){
    this.store.select(selectEntityList('tiktok/campaigns')).subscribe((data:any  ) => {
      if(data.length>0 && data[0])
      {
        if(data[0]['data'])
        {
          this.campaigns = data[0]['data']['list'];
        }
      }
    })
    this.store.dispatch(getAllNoPagination({entity:"tiktok/campaigns",
        params: {
          "advertiser_id":advertiser_id,
          "url":"/tiktok"
        }
      })
    )
  }
  getAdGroup(){
    this.store.select(selectEntityList('tiktok/adgroup')).subscribe((data:any  ) => {
      if(data.length>0 && data[0])
      {
        if(data[0]['data'])
        {
          this.adGroup = data[0]['data']['list'];
        }
      }
    })
    this.store.dispatch(getAllNoPagination({entity:"tiktok/adgroup",
        params: {
          "advertiser_id":this.selectedAccountId,
          "campaign_ids":JSON.stringify([this.campaignSelected]),
          "url":"/tiktok"
        }
      })
    )
  }
  getAd(){
    this.store.select(selectEntityList('tiktok/ad')).subscribe((data:any  ) => {
      if(data.length>0 && data[0])
      {
        if(data[0]['data'])
        {
          this.ad = data[0]['data']['list'];
        }
      }
    })
    this.store.dispatch(getAllNoPagination({entity:"tiktok/ad",
        params: {
          "advertiser_id":this.selectedAccountId,
          "campaign_ids":JSON.stringify([this.campaignSelected]),
          "adgroup_ids":JSON.stringify([this.adGroupSelected]),
          "url":"/tiktok"
        }
      })
    )
  }
  getAdvertiserAnalytics(){

    this.campaigns=[]
    this.adGroup=[]
    this.ad=[]
    this.campaignSelected=null
    this.campaignCreateTime=null
    this.getCampaigns(this.selectedAccountId)
    this.getConversionsPerOneThousandImpressions( this.selectedAccountId,"",'AUCTION_ADVERTISER',[{'dimensions':JSON.stringify(['advertiser_id'])}])
    this.getConversionsPerImpressions( this.selectedAccountId,"",'AUCTION_ADVERTISER',[{'dimensions':JSON.stringify(['advertiser_id',this.type])}])
    this.getImpressionsPerAudiance( this.selectedAccountId,"",'AUCTION_ADVERTISER',[{'dimensions':JSON.stringify(['advertiser_id','age'])}])
    this.getConversionsPerRevenue( this.selectedAccountId,"",'AUCTION_ADVERTISER',[{'dimensions':JSON.stringify(['advertiser_id',this.type])}])


  }
  showDetailsOfCampaign(campaign_id:string|null,creation_date:string|null){
  console.log(this.type)
    this.adGroup=[]
    this.ad=[]
    this.campaignSelected=campaign_id
    this.campaignCreateTime=creation_date
    this.adGroupSelected=null
    this.adGroupCreateTime=null
    this.getAdGroup()
    this.getConversionsPerOneThousandImpressions(this.selectedAccountId,creation_date,'AUCTION_CAMPAIGN', [{'dimensions':JSON.stringify(['campaign_id']),'campaign_ids':JSON.stringify([campaign_id])}])
    this.getConversionsPerImpressions(this.selectedAccountId,creation_date,'AUCTION_CAMPAIGN',  [{'dimensions':JSON.stringify(['campaign_id',this.type]),'campaign_ids':JSON.stringify([campaign_id])}])
    this.getImpressionsPerAudiance(this.selectedAccountId,creation_date,'AUCTION_CAMPAIGN',  [{'dimensions':JSON.stringify(['campaign_id','age']),'campaign_ids':JSON.stringify([campaign_id])}])
    this.getConversionsPerRevenue(this.selectedAccountId,creation_date,'AUCTION_CAMPAIGN',  [{'dimensions':JSON.stringify(['campaign_id',this.type]),'campaign_ids':JSON.stringify([campaign_id])}])


  }

  showDetailsOfAdGroup(adGroup_id:string|null,creation_date:string|null){

    this.ad=[]
    this.adGroupSelected=adGroup_id
    this.adGroupCreateTime=creation_date
    this.adSelected=null
    this.adCreateTime=null
    this.getAd()
    this.getConversionsPerOneThousandImpressions(this.selectedAccountId,creation_date,'AUCTION_ADGROUP', [{'dimensions':JSON.stringify(['adgroup_id']),'adgroup_ids':JSON.stringify([adGroup_id])}])
    this.getConversionsPerImpressions(this.selectedAccountId,creation_date,'AUCTION_ADGROUP',  [{'dimensions':JSON.stringify(['adgroup_id',this.type]),'adgroup_ids':JSON.stringify([adGroup_id])}])
    this.getImpressionsPerAudiance(this.selectedAccountId,creation_date,'AUCTION_ADGROUP',  [{'dimensions':JSON.stringify(['adgroup_id','age']),'adgroup_ids':JSON.stringify([adGroup_id])}])
    this.getConversionsPerRevenue(this.selectedAccountId,creation_date,'AUCTION_ADGROUP',  [{'dimensions':JSON.stringify(['adgroup_id',this.type]),'adgroup_ids':JSON.stringify([adGroup_id])}])

  }

  showDetailsOfAd(ad_id:string|null,creation_date:string|null){

    this.adSelected=ad_id
    this.adCreateTime=creation_date
    this.getConversionsPerOneThousandImpressions(this.selectedAccountId,creation_date,'AUCTION_AD', [{'dimensions':JSON.stringify(['ad_id']),'adgroup_ids':JSON.stringify([ad_id])}])
    this.getConversionsPerImpressions(this.selectedAccountId,creation_date,'AUCTION_AD',  [{'dimensions':JSON.stringify(['ad_id',this.type]),'adgroup_ids':JSON.stringify([ad_id])}])
    this.getImpressionsPerAudiance(this.selectedAccountId,creation_date,'AUCTION_AD',  [{'dimensions':JSON.stringify(['ad_id','age']),'adgroup_ids':JSON.stringify([ad_id])}])
    this.getConversionsPerRevenue(this.selectedAccountId,creation_date,'AUCTION_AD',  [{'dimensions':JSON.stringify(['ad_id',this.type]),'adgroup_ids':JSON.stringify([ad_id])}])

  }
  formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  getConversionsPerOneThousandImpressions(id:string,creation_date:any,type:string,other:any|null=null)
  {

    const dateMinus7Days = new Date(); // Clone la date actuelle
    dateMinus7Days.setDate(dateMinus7Days.getDate() - 29); // Soustrait 29 days

    let start_date = this.ds
      ? new Date(this.ds)
      : (creation_date
        ? new Date(creation_date)
        : dateMinus7Days);

    let end_date = this.de
      ? new Date(this.de)
      : new Date();

    // Convertir en format string pour l'affichage dans l'input
    this.ds = this.formatDate(start_date);
    this.de = this.formatDate(end_date)

    this.store.dispatch(getAllNoPagination({entity:"tiktok/conversionsperonethousandimpressions",
        params: {
          "advertiser_id":id,
          'data_level' : type,
          'start_date' : start_date.toISOString(),
          'end_date' : end_date.toISOString(),
          'other':JSON.stringify(other),
          "url":"/tiktok"
        }
      })
    )
  }

  getConversionsPerImpressions(id:string,creation_date:any,type:string,other:any|null=null)
  {

    const dateMinus7Days = new Date(); // Clone la date actuelle
    dateMinus7Days.setDate(dateMinus7Days.getDate() - 29); // Soustrait 29 days

    let start_date = this.ds
      ? new Date(this.ds)
      : (creation_date
        ? new Date(creation_date)
        : dateMinus7Days);

    let end_date = this.de
      ? new Date(this.de)
      : new Date();

    // Convertir en format string pour l'affichage dans l'input
    this.ds = this.formatDate(start_date);
    this.de = this.formatDate(end_date)




    this.store.dispatch(getAllNoPagination({entity:"tiktok/conversionsperimpressions",
        params: {
          "advertiser_id":id,
          'data_level' : type,
          'start_date' : start_date.toISOString(),
          'end_date' : end_date.toISOString(),
          'other':JSON.stringify(other),
          "url":"/tiktok"
        }
      })
    )

  }


  getImpressionsPerAudiance(id:string,creation_date:any,type:string,other:any|null=null)
  {

    const dateMinus7Days = new Date(); // Clone la date actuelle
    dateMinus7Days.setDate(dateMinus7Days.getDate() - 29); // Soustrait 29 days

    let start_date:any = this.ds ? new Date(this.ds) :(creation_date==""?dateMinus7Days:new Date(creation_date)); // Convert to Date object
    let end_date:any = this.de ? new Date(this.de):new Date();


    this.store.dispatch(getAllNoPagination({entity:"tiktok/impressionsperaudiance",
        params: {
          "advertiser_id":id,
          'data_level' : type,
          'start_date' : start_date.toISOString(),
          'end_date' : end_date.toISOString(),
          'other':JSON.stringify(other),
          "url":"/tiktok"
        }
      })
    )

  }

  getConversionsPerRevenue(id:string,creation_date:any,type:string,other:any|null=null)
  {


    const dateMinus7Days = new Date(); // Clone la date actuelle
    dateMinus7Days.setDate(dateMinus7Days.getDate() - 29); // Soustrait 29 days

    let start_date = this.ds
      ? new Date(this.ds)
      : (creation_date
        ? new Date(creation_date)
        : dateMinus7Days);

    let end_date = this.de
      ? new Date(this.de)
      : new Date();

    // Convertir en format string pour l'affichage dans l'input
    this.ds = this.formatDate(start_date);
    this.de = this.formatDate(end_date)


    this.store.dispatch(getAllNoPagination({entity:"tiktok/conversionsperrevenue",
        params: {
          "advertiser_id":id,
          'data_level' : type,
          'start_date' : start_date.toISOString(),
          'end_date' : end_date.toISOString(),
          'other':JSON.stringify(other),
          "url":"/tiktok"
        }
      })
    )

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

  search(): void {
    if(this.de && this.ds)
    {
      this.getAdvertiserAnalytics()
    }
  }

  onChangeType(){
    if(this.type === 'stat_time_hour')
      this.de = this.ds

  }

  onDateChange(){
    if(this.type === 'stat_time_hour')
       this.de = this.ds
    else{
      this.de=""
    }
  }
  initializeComponent():void{
    this.exist=true;
    const currentUrl = this.router.url;
    const baseUrl = currentUrl.split('?')[0];  // Remove query parameters if any
    this.router.navigateByUrl(baseUrl, {replaceUrl: true}).then(r =>null);
  }


  protected readonly Number = Number;
}
