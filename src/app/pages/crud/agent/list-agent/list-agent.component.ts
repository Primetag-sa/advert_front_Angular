
import { Component } from '@angular/core';
import { UserService } from '../../../../services/api/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Store} from "@ngrx/store";
import {User} from "../../../../models/user.model";
import {selectAuthenticatedUser} from "../../../../store/auth/auth.selectors";
import {Observable, tap} from "rxjs";
import {
  isPageCached,
  selectEntityCurrentPage,
  selectEntityPage,
  selectEntityTotalPages
} from "../../../../store/crud/crud.selectors";
import {take} from "rxjs/operators";
import * as CrudActions from "../../../../store/crud/crud.actions";

@Component({
  selector: 'app-list-agent',
  templateUrl: './list-agent.component.html',
  styleUrl: './list-agent.component.scss'
})
export class ListAgentComponent {


  user$:Observable<User|null>

  clients: any;
  pagination: any = {};

  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  currentPage:any;
  totalPages:any;

  agencyId: string ='0'; // For storing agency ID if editing
  currentUser:User|null=null
  constructor(private store: Store,private userService: UserService,private router :Router,private route: ActivatedRoute) {
    this.user$=this.store.select(selectAuthenticatedUser)

    this.user$.subscribe((user)=>{
      this.currentUser=user
      if(user?.id)
        this.agencyId=user?.id.toString()
    })



    this.currentPage$ = this.store.select(selectEntityCurrentPage('agency/agents'));
    this.totalPages$ = this.store.select(selectEntityTotalPages('agency/agents'));
    this.currentPage$.subscribe((page  ) => {

      this.currentPage = page;

    })

    this.totalPages$.subscribe((totalPage  ) => {
      this.totalPages = totalPage;
    })

  }



  ngOnInit(): void {
    this.loadPage(this.currentPage)
  }

  loadPage(page: number): void {
    const pageSize = 10;

    this.store.dispatch(CrudActions.getAll({ entity: 'agency/agents', page, pageSize}));

    this.store.select(selectEntityPage('agency/agents', page)).subscribe((user:any  ) => {
      this.currentPage=page
      this.clients = user;

    })
  }


  loadUsers(page: number = 1, perPage: number = 10,status = 'all'): void {
    this.userService.getUsers(page, perPage,status,'agent',this.agencyId).subscribe(response => {
      this.clients = response.data;
      this.pagination = response;
    });
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
