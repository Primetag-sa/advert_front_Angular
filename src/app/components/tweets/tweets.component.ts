// src/app/components/tweets/tweets.component.ts

import { Component, OnInit } from '@angular/core';
import {TweetService} from "../../services/api/tweet.service";
import {environment} from "../../../environments/environment";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrl: './tweets.component.scss',
})
export class TweetsComponent {
  tweets: any;

  constructor(private tweetService: TweetService,private http:HttpClient) {}
  ngOnInit() {
    this.getUserInfo()
  }
  getUserInfo(){
    this.tweetService.getUserTweets().subscribe(
      (data: any) => {

        this.tweets = data;
      },
      (error:any) => {
        console.error('Error fetching tweets', error);
      }
    );
  }
 /* getAds(){
    this.tweetService.getAds().subscribe(
      (data: any) => {

        console.log(data);
      },
      (error:any) => {
        console.error('Error fetching tweets', error);
      }
    );
  }*/
}
