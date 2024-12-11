import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {selectEntityList} from "../../../store/crud/crud.selectors";
import {getAllNoPagination} from "../../../store/crud/crud.actions";
import {TiktokService} from "../../../services/api/tiktok.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-agency-rapport',
  templateUrl: './agency-rapport.component.html',
  styleUrl: './agency-rapport.component.scss'
})
export class AgencyRapportComponent  implements OnInit{

  accounts:any;
  ds:string=""
  de:string=""
  earnings:number=0
  rate_earnings:number=0
  conversion:number=0
  rate_conversion:number=0
  impression_rate_100_visitors:number=0
  impressions:number=0
  number_purchase:any=[];

  constructor(private store:Store) {

    this.store.select(selectEntityList('tiktok/allAccounts')).subscribe((accounts:any  ) => {
      if(accounts.length>0)
      {
        this.accounts=accounts;
        accounts.map((account:any)=>{

          if(account["account"].data)
          {
              account["account"].data?.list.map((element:any)=>{
              this.getConversionsPerRevenue(account["agent"].id,element.advertiser_id,"",'AUCTION_ADVERTISER',[{'dimensions':JSON.stringify(['advertiser_id'])}])
              this.getConversions(account["agent"].id,element.advertiser_id,"",'AUCTION_ADVERTISER',[{'dimensions':JSON.stringify(['advertiser_id'])}])
            })
          }

        })
      }

    })


  }
  ngOnInit() {
    this.store.dispatch(getAllNoPagination({entity:"tiktok/allAccounts", params: []}))
  }

  formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  search(): void {
    if(this.de && this.ds)
    {
      this.store.dispatch(getAllNoPagination({entity:"tiktok/accounts", params: []}))
    }
  }

  onDateChange(){
      this.de=""
  }
  getConversionsPerRevenue(agentid:string,id:string,creation_date:any,type:string,other:any|null=null)
  {
    this.store.select(selectEntityList('tiktok/conversionsperrevenue')).subscribe((data:any  ) => {
      if(data.data)
      {
        if(data.data.list.length>0)
        {
          if (!this.number_purchase[agentid]) {
            this.number_purchase[agentid] = data.data.list[0].metrics.purchase;
          }

          this.earnings+= parseFloat(String(data.data.list[0].metrics.total_purchase_value - data.data.list[0].metrics.spend));

          if(this.earnings>=data.data.list[0].metrics.spend)
            this.rate_earnings+=parseFloat(String((this.earnings / data.data.list[0].metrics.spend * (-1)) * 100));
          else
            this.rate_earnings+=parseFloat(String((this.earnings / data.data.list[0].metrics.spend) * 100))
        }
      }
    })

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
  getConversions(agentid:string,id:string,creation_date:any,type:string,other:any|null=null)
  {
    this.store.select(selectEntityList('tiktok/conversionsperimpressions')).subscribe((data:any  ) => {
      if(data.data)
      {
        if(data.data.list.length>0)
        {
          this.conversion+=parseFloat(data.data.list[0].metrics.conversion)
          this.rate_conversion+=parseFloat(data.data.list[0].metrics.conversion_rate)
          this.impression_rate_100_visitors += parseFloat(String((data.data.list[0].metrics.purchase / data.data.list[0].metrics.impressions) * 100));
          this.impressions+=parseFloat(data.data.list[0].metrics.impressions);
        }
      }
    })
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

}
