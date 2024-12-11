import { Component,OnInit } from '@angular/core';
import { NotificationService } from '../../../services/api/notification.service';

@Component({
  selector: 'app-agency-notification',
  templateUrl: './agency-notification.component.html',
  styleUrl: './agency-notification.component.scss'
})
export class AgencyNotificationComponent {
  notifications: any[] = [];
  errorMessage: string = '';

  clients: any[] = [];
  pagination: any = {};

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  nextPage(): void {
    if (this.pagination.next_page_url) {
      this.loadNotifications(this.pagination.current_page + 1);
    }
  }

  previousPage(): void {
    if (this.pagination.prev_page_url) {
      this.loadNotifications(this.pagination.current_page - 1);
    }
  }

  loadNotifications(page: number = 1, perPage: number = 10,status = 'all'): void {
    console.log('hii brahim')
    this.notificationService.getNotifications(page, perPage,status,'admin').subscribe(response => {
      this.notifications = response.data;
      console.log('2')
      console.log(this.notifications)
      this.pagination = response;
    });
  }

  loadNotifications0(page: number = 1, perPage: number = 10,status = 'all'): void {
    this.notificationService.getNotifications().subscribe({
      next: (data) => this.notifications = data,
      error: (err) => this.errorMessage = 'Failed to load notifications'
    });
  }
}
