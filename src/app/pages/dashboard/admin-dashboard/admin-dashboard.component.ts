import { Component } from '@angular/core';
import { UserService } from '../../../services/api/user.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import {Observable, Subscription, tap} from "rxjs";
import {User} from "../../../models/user.model";
import { Store } from '@ngrx/store';
import * as CrudActions from '../../../store/crud/crud.actions';
import {
  isPageCached,
  selectEntityCurrentPage,
  selectEntityList, selectEntityPage,
  selectEntityTotalPages
} from '../../../store/crud/crud.selectors';
import {HttpParams} from "@angular/common/http";
import {map, take} from "rxjs/operators";
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  clients: any;
  pagination: any = {};

  currentPage$: Observable<number>;
  totalPages$: Observable<number>;
  currentPage:any;
  totalPages:any;
  public url: string = `${environment.apiUrl}`;
  constructor(private store: Store,private userService: UserService,private router :Router) {

    this.currentPage$ = this.store.select(selectEntityCurrentPage('users'));
    this.totalPages$ = this.store.select(selectEntityTotalPages('users'));
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



  /* loadUsers(page: number = 1, perPage: number = 10): void {
    this.userService.getUsers(page, perPage).subscribe(response => {
      this.clients = response.data;
      this.pagination = response;
    });
  } */

  loadPage(page: number): void {
    const pageSize = 10;
    // Check if the page is cached
    this.store.select(isPageCached('users', page))
      .pipe(
        take(1),
        tap(isCached => {
          if (!isCached) {
            // If not cached, dispatch the action to load the page
            this.store.dispatch(CrudActions.getAll({ entity: 'users', page, pageSize }));
          }
        })
      )
      .subscribe();
    this.store.select(selectEntityPage('users', page)).subscribe((user:any  ) => {
      this.currentPage=page
      this.clients = user;
    })
  }

  loadUsers(page: number = 1, perPage: number = 10,status = 'all'): void {
    this.userService.getUsers(page, perPage,status).subscribe(response => {
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
    this.router.navigate(['/agencies/edit', clientId]);
  }

  agents(clientId: string): void {
    this.router.navigate(['/agents', clientId]);
  }
}
