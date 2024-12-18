import { Component } from '@angular/core';
import { UserService } from '../../../services/api/user.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthenticatedUser } from '../../../store/auth/auth.selectors';
import { selectEntityList } from '../../../store/crud/crud.selectors';
import { map } from 'rxjs/operators';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-agent-dashboard',
  templateUrl: './agent-dashboard.component.html',
  styleUrl: './agent-dashboard.component.scss',
})
export class AgentDashboardComponent {
  clients: any[] | null = [];
  role?: string = '';
  pagination: any = {};
  agencyId?: string | number | null; // For storing agency ID if editing

  constructor(
    private userService: UserService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectAuthenticatedUser)
      .pipe(
        map((user: User | null) => {
          this.agencyId = user?.id;
          this.role = user?.role;
        })
      )
      .subscribe();
    this.store
      .select(selectEntityList('agency/agents'))
      .pipe(
        map((agent: any | null) => {
          this.clients = agent;
        })
      )
      .subscribe();
  }
}
