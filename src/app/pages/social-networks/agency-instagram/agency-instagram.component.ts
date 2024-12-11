
import {Component, OnInit} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { InstagramService } from '../../../services/api/instagram.service';

@Component({
  selector: 'app-agency-instagram',
  templateUrl: './agency-instagram.component.html',
  styleUrl: './agency-instagram.component.scss'
})
export class AgencyInstagramComponent {
  alertState=false
  exist=false

  instagramUser:any
  instagramAcounts:any = []
  adData: any;
  accounts: any;
  campaigns: any;
  ads: any;

  constructor(private router: Router,private route: ActivatedRoute,private instagramService:InstagramService) {

  }

  ngOnInit() {
    console.log('Hi instagram');
    const userData = localStorage.getItem('instagramUser');
    const instagramAcounts = localStorage.getItem('instagramAcounts');
    console.log('instagramAcounts');
    console.log(instagramAcounts);

    let userId=localStorage.getItem('user_id')??'';
    this.instagramService.getData().subscribe(
      (response) => {
        this.accounts = response.accounts;
        this.campaigns = response.campaigns;
        this.ads = response.ads;
        console.log('Snapchat Accounts:', this.accounts);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );



  if (userData) {
    this.instagramUser = JSON.parse(userData);  // Parse the JSON string to an object

    // this.exist = true;
    // this.alertState=true



    const accessToken = this.instagramUser.instagram_access_token; // Get stored access token
    console.log('this.instagramUser.instagram_token');
    console.log(accessToken);

    if (accessToken) {
      this.instagramService.getAdData(accessToken).subscribe(data => {
        this.adData = data;
        console.log('this.adData'); // Handle the returned ad data
        console.log(this.adData); // Handle the returned ad data
      });
    }

  } else {
    this.exist = false;
    this.alertState=false
    console.error('No Snapchat user data found in local storage.');
  }
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
  }
  initializeComponent():void{
    this.exist=true;
    const currentUrl = this.router.url;
    const baseUrl = currentUrl.split('?')[0];  // Remove query parameters if any
    this.router.navigateByUrl(baseUrl, {replaceUrl: true}).then(r =>null);
  }
  signInInstagram():void{
    this.instagramService.login();
  }
}
