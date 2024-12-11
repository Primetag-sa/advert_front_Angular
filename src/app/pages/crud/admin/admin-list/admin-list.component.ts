
import { Component } from '@angular/core';
import { UserService } from '../../../../services/api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrl: './admin-list.component.scss'
})
export class AdminListComponent {



  clients: any[] = [];
  pagination: any = {};

  constructor(private userService: UserService,private router :Router) {

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1, perPage: number = 10,status = 'all'): void {
    this.userService.getUsers(page, perPage,status,'admin').subscribe(response => {
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
    this.router.navigate(['/admins/edit', clientId]);
  }

}
