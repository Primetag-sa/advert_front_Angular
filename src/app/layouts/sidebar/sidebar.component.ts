import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as authActions from '../../store/auth/auth.actions';
import { selectAuthenticatedUser } from '../../store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { RoleAccess } from '../../models/role-access.model';
import { CheckAccessService } from '../../services/core/check-access.service';
import { selectEntityList } from '../../store/crud/crud.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  @Input() active?: string;
  user$: Observable<User | null> | undefined;
  role_access$: Observable<RoleAccess[] | null> | undefined;
  role: string | null | undefined;
  showIt: boolean = false;
  access: RoleAccess[] | null | undefined;

  constructor(private store: Store, private checkAccess: CheckAccessService) {}

  ngOnInit() {
    this.user$ = this.store.select(selectAuthenticatedUser);
    this.user$.subscribe((user: User | null) => {
      this.role = user?.role;
    });
    this.role_access$ = this.store.select(selectEntityList('role_access'));
    this.role_access$.subscribe((roleAccess: RoleAccess[] | null) => {
      this.access = roleAccess;
    });
    console.log('Role: ', this.role);
  }

  checkAccessRoute(id: string) {
    if (this.role === 'super_admin') return true;
    const arrayOfIds = this.checkAccess.loadArrayRoutesAccess(
      this.role,
      this.access
    );
    return this.checkAccess.checkIds(id, arrayOfIds);
  }

  toggleMenu() {
    this.showIt = !this.showIt;
    return this.showIt;
  }
  logout(): void {
    this.store.dispatch(authActions.logout());
  }
}
