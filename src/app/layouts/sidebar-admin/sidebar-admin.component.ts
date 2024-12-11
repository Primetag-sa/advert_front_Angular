import { Component, Input } from '@angular/core';

import { Store } from '@ngrx/store';
import * as authActions from "../../store/auth/auth.actions";

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.scss'
})
export class SidebarAdminComponent {

  @Input() active?: string;

  constructor(
    private store:Store

  ) {}

  logout(): void {
    this.store.dispatch(authActions.logout())
  }
}
