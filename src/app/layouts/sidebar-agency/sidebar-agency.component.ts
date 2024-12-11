import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authActions from "../../store/auth/auth.actions";

@Component({
  selector: 'app-sidebar-agency',
  templateUrl: './sidebar-agency.component.html',
  styleUrl: './sidebar-agency.component.scss'
})
export class SidebarAgencyComponent implements OnInit {
  @Input() active?: string;
  role: string = 'agency';
  constructor(
    private store:Store

  ) {}

  ngOnInit(): void {
    this.role=localStorage.getItem('role')??'agency';
  }

  logout(): void {
    this.store.dispatch(authActions.logout())
  }
}
