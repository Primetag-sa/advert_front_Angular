import { Component, OnInit } from '@angular/core';
import { SnapchatService } from '../../../services/api/snapchat.service';

import {environment} from "../../../../environments/environment";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-snapchat',
  templateUrl: './snapchat.component.html',
  styleUrl: './snapchat.component.scss'
})
export class SnapchatComponent implements OnInit{


  adsData: any;

  constructor(private snapchatService: SnapchatService) {
    this.isAuthenticated = !!localStorage.getItem('authUser');
  }


  isAuthenticated = false;

   login() {
      this.snapchatService.login();
   }

   logout() {
      this.snapchatService.logout().subscribe(() => {
         localStorage.removeItem('authUser');
         this.isAuthenticated = false;
      });
   }

  ngOnInit(): void {
    this.fetchAdsData();
  }

  fetchAdsData(): void {
    this.snapchatService.getAdsData().subscribe(
      (data) => {
        this.adsData = data;
      },
      (error) => {
        console.error('Error fetching Snapchat ads data:', error);
      }
    );
  }

  connectSnapchat(){
    this.snapchatService.connectSnapchat();
  }

}

/*
// src/app/components/snapchat-ads/snapchat-ads.component.ts
import { Component, OnInit } from '@angular/core';
import { SnapchatService } from '../../services/snapchat.service';

@Component({
  selector: 'app-snapchat-ads',
  templateUrl: './snapchat-ads.component.html',
})
export class SnapchatAdsComponent implements OnInit {

}
 */
