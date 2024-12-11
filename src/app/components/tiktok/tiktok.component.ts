import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TiktokService} from "../../services/api/tiktok.service";

@Component({
  selector: 'app-tiktok',
  templateUrl: './tiktok.component.html',
  styleUrl: './tiktok.component.scss'
})
export class TiktokComponent {
  user: any;

  constructor(private tiktokService: TiktokService,private http:HttpClient) {}

  getUserInfo(){
    this.tiktokService.getUserTiktok().subscribe(
      (data: any) => {
        console.log(data)
        this.user = data;
      },
      (error:any) => {
        console.error('Error fetching tweets', error);
      }
    );
  }
}
