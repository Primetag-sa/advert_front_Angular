import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import * as CrudActions from '../../store/crud/crud.actions';
import { Observable, of } from 'rxjs';
import { filter, first, switchMap } from 'rxjs/operators';
import {selectAuthenticatedUser} from "../../store/auth/auth.selectors";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class PreloadAccessResolver implements Resolve<boolean> {
  user$:Observable<User|null>
  currentUser:User|null=null
  constructor(private store: Store) {
    this.user$=this.store.select(selectAuthenticatedUser)

    this.user$.subscribe((user)=>{
      this.currentUser=user
    })
  }

  resolve(route: ActivatedRouteSnapshot): Observable<boolean> {
    let filteredEntities=[]

    if(route)
    {
      if(route.data['data'] &&  route.data['data']['entities'])
      {
        const entities = route.data['data']['entities'];
        filteredEntities = entities.filter((entity: any) => {
          console.log('Entity Role:', entity.role +' role '+this.currentUser?.role); // Vérifiez le rôle de chaque entité
          return entity.role === this.currentUser?.role; // Filtre basé sur le rôle
        })
          .map((data: any) => {
            console.log('Entity Data:', data.entity); // Vérifiez ce que contient data.entity
            return {"name":data.entity,"pageSize":data.pageSize,"params":data.params}; // Assurez-vous que ça renvoie ce que vous attendez
          });
      }

    }

    if(filteredEntities.length>0)
    {
      filteredEntities.forEach((entity: any) => {

        const id = route.paramMap.get('id');
        const page = parseInt(route.queryParamMap.get('page') || '1', 10);
        let pageSize = parseInt(route.queryParamMap.get('pageSize') || '10', 10);
        let params=entity.params

        if(entity.name!=undefined)
        {
          if (id) {

            this.store.dispatch(CrudActions.getOne({ entity:entity.name, id }));
            return this.store.select((state:any) => state[entity.name]?.loading).pipe(filter(loading => !loading), first());
          } else {
            if(entity.pageSize!==undefined)
            {
              pageSize=entity.pageSize
            }
            this.store.dispatch(CrudActions.getAll({ entity:entity.name, page, pageSize,params }));
            return this.store.select((state:any) => state[entity.name]?.loading).pipe(filter(loading => !loading), first());
          }
        }
        return of(true)
      })
    }
      return  of(true)




  }
}
