import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store'
import {selectEntityList} from "../../store/crud/crud.selectors";
import {RoleAccess} from "../../models/role-access.model";
import {filter, map, Observable} from 'rxjs';
import {selectAuthenticatedUser} from "../../store/auth/auth.selectors";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CheckAccessService {

  role_access$: Observable<RoleAccess[]> | undefined;
  user$: Observable<User|null> | undefined;
  currentUser:User|null=null
  idsList:any[]|null=null

  constructor() {}

  loadArrayRoutesAccess(userRole:string|null|undefined,route:any):string[]{

    for(let rout of route)
    {
      if(rout.role===userRole)
      {
        return this.extractIds(JSON.parse(rout.access));
      }
    }
    return []
  }

  extractIds(accessArray: any[]): string[] {
    let paths: string[] = [];
    accessArray.forEach((acc) => {
      // Ajouter le chemin de l'élément principal
      if (acc.id && (acc.selected || acc.indeterminate)) {
        paths.push(acc.id);
      }

      // Si l'élément a des children, on les traite récursivement
      if (acc.children && acc.children.length > 0) {
        paths = paths.concat(this.extractIds(acc.children));
      }
    });

    return paths;
  };



  checkIds(id:string,ids:string[]|null=null):boolean|undefined{
    return ids?.includes(id)
  }

}
