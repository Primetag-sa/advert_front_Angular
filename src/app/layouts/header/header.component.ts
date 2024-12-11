import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/api/auth.service';
import { Router } from '@angular/router';
import {Store} from "@ngrx/store";
import {CheckAccessService} from "../../services/core/check-access.service";
import {selectAuthenticatedUser} from "../../store/auth/auth.selectors";
import {User} from "../../models/user.model";
import {selectEntityList} from "../../store/crud/crud.selectors";
import {RoleAccess} from "../../models/role-access.model";
import {Observable} from "rxjs";
import * as authActions from "../../store/auth/auth.actions";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  user$: Observable<User | null> | undefined


  constructor(
    private store:Store,private checkAccess:CheckAccessService,  private router:Router,
  ) {

  }





  name?:string ='';
  image?:string ='';
  role?:string ='';

  ngOnInit(): void {
    this.user$=this.store.select(selectAuthenticatedUser)
    this.user$.subscribe((user:User|null)=>{
      if(user?.role=='admin'){
        this.role='ادمن'
      }else if(user?.role=='agency'){
        this.role='وكالة'
      }else if(user?.role=='agent'){
        this.role='عميل'
      }
      this.image=user?.image ?? '/profile1.jpg'
      this.name=user?.name
    })
  }

  logout(): void {
    this.store.dispatch(authActions.logout())
  }


}
