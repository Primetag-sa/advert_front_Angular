import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authActions from '../../store/auth/auth.actions';
@Component({
  selector: 'app-sidebar-agent',
  templateUrl: './sidebar-agent.component.html',
  styleUrl: './sidebar-agent.component.scss',
})
export class SidebarAgentComponent implements OnInit {
  @Input() active?: string;
  role: string = 'agent';
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role') ?? 'agent';
  }

  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
