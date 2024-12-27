import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  plans: any[] = []; // To store the plans data
  lowestPricePlanId: number | null = null;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchPlans();
  }

  fetchPlans(): void {
    this.http.get<any>(environment.apiUrl+'/get_plans').subscribe({
      next: (response) => {
        this.plans = response.data.map((plan: any) => ({
          ...plan,
          currentUsers: plan.min_users 
        }));
        this.determineLowestPricePlan();

      },
      error: (error) => {
        console.error('Error fetching plans:', error);
      }
    });
  }
  determineLowestPricePlan(): void {
    if (this.plans.length > 0) {
      const lowestPlan = this.plans.reduce((prev, curr) => 
        parseFloat(prev.total_price) < parseFloat(curr.total_price) ? prev : curr
      );
      this.lowestPricePlanId = lowestPlan.id;
    }
  }
  calculateTotalPrice(plan: any): number {
    return (
      parseFloat(plan.base_price) +
      (plan.currentUsers - plan.min_users) * plan.user_cost
    );
  }

  updateUsers(plan: any, increment: boolean): void {
    if (increment && plan.currentUsers < plan.max_users) {
      plan.currentUsers++;
    } else if (!increment && plan.currentUsers > plan.min_users) {
      plan.currentUsers--;
    }
  }
  subscribeNow(plan: any): void {
    const countOfWebsite = (document.getElementById('count') as HTMLSelectElement).value;
    const isLowestPrice = plan.id === this.lowestPricePlanId;
    this.router.navigate(['/register'], {
      queryParams: {
        planId: plan.id, 
        currentUsers: plan.currentUsers,
        countOfWebsite: countOfWebsite,
        isLowestPrice: isLowestPrice,
      },
    });
  }
}
