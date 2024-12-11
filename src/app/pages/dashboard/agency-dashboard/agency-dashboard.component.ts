import { Component } from '@angular/core';
import { UserService } from '../../../services/api/user.service';
import {  Router } from '@angular/router';
import {Store} from "@ngrx/store";
import {User} from "../../../models/user.model";
import {selectAuthenticatedUser} from "../../../store/auth/auth.selectors";
import {map} from "rxjs/operators";
import {selectEntityList} from "../../../store/crud/crud.selectors";

@Component({
  selector: 'app-agency-dashboard',
  templateUrl: './agency-dashboard.component.html',
  styleUrl: './agency-dashboard.component.scss'
})
export class AgencyDashboardComponent {


  clients: any[]|null = [];
  role?:string = '';
  pagination: any = {};
  agencyId?: string|number|null; // For storing agency ID if editing

  constructor(private userService: UserService,private router :Router,private store:Store) {

  }

  ngOnInit(): void {


    this.store.select(selectAuthenticatedUser).pipe(
      map((user:User|null)=>{
        this.agencyId=user?.id
        this.role=user?.role
      })
    ).subscribe()
    this.store.select(selectEntityList('agency/agents')).pipe(
      map((agent:any|null)=>{
        this.clients=agent
      })
    ).subscribe()
  }



  loadUsers(page: number = 1, perPage: number = 10,status = 'all'): void {
    //
    this.userService.getAgencyAgents(page, perPage,status,'agent',this.agencyId).subscribe(response => {
      this.clients = response.data;
      this.pagination = response;
    });
  }

  nextPage(): void {
    if (this.pagination.next_page_url) {
      this.loadUsers(this.pagination.current_page + 1);
    }
  }

  previousPage(): void {
    if (this.pagination.prev_page_url) {
      this.loadUsers(this.pagination.current_page - 1);
    }
  }

  confirmDeleteClient(clientId: string): void {
    console.log(clientId);
    if (confirm('هل أنت متأكد أنك تريد حذف هذا العنصر؟')) {
      this.userService.deleteUser(clientId).subscribe(
        () => {
          console.log('success');
          this.loadUsers(this.pagination.current_page);
        },
        error => {
          console.error('Error deleting client', error);
          // Optionally, display an error message to the user
        }
      );
    }
  }

  onSelectChange(event: any) {
    const selectedValue = event.target.value;
    console.log('Selected option:', selectedValue);

    this.loadUsers(this.pagination.current_page,10,event.target.value);

  }

  cancelClient(clientId: string): void {
    const cancelPayload = { status: 'canceled' };
    this.userService.changeStatus(clientId, cancelPayload).subscribe(
      () => {
        this.loadUsers(this.pagination.current_page);
      },
      error => {
        console.error('Error canceling client', error);
        // Optionally, display an error message to the user
      }
    );
  }
  activatedClient(clientId: string): void {
    const cancelPayload = { status: 'activated' };
    this.userService.changeStatus(clientId, cancelPayload).subscribe(
      () => {
        this.loadUsers(this.pagination.current_page);
      },
      error => {
        console.error('Error canceling client', error);
        // Optionally, display an error message to the user
      }
    );
  }
  editClient(clientId: string): void {
    this.router.navigate(['/agents/edit', clientId]);

  }

}
