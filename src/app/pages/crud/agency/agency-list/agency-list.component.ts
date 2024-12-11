
import { Component } from '@angular/core';
import { UserService } from '../../../../services/api/user.service';
import { Router } from '@angular/router';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrl: './agency-list.component.scss'
})
export class AgencyListComponent {
  clients: any[] = [];
  pagination: any = {};

  public url: string = `${environment.url}/`;

  constructor(private userService: UserService,private router :Router) {}

  ngOnInit(): void {
    this.loadUsers();
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
    this.router.navigate(['/agencies/edit', clientId]);
  }

  agents(clientId: string): void {
    this.router.navigate(['/agents', clientId]);
  }
}
