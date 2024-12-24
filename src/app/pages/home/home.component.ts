import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  plans: any[] = []; // To store the plans data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchPlans();
  }

  fetchPlans(): void {
    const url = 'https://website-8b7b1fd4.eiv.tjo.mybluehost.me/public/api/get_plans';
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.plans = response.data;
      },
      error: (error) => {
        console.error('Error fetching plans:', error);
      }
    });
  }
}
