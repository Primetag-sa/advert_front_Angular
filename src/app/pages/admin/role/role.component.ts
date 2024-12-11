import { Component } from '@angular/core';
import {RouteService} from "../../../services/core/route.service";
import { routes } from '../../../app-routing.module';
import * as CrudActions from "../../../store/crud/crud.actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.scss'
})
export class RoleComponent {
  routeList:any[] = [];
  roles:any[]=[
    {
      role:'admin',
      title:'مسؤول',
      access:[]
    },
    {
      role:'agency',
      title:'وكالة',
      access:[]
    },
    {
      role:'agent',
      title:'عميل',
      access:[]
    },
  ]
  constructor(private routeService: RouteService) {

  }

  ngOnInit(): void {
    this.routeList = this.routeService.getRoutes(routes);

    this.roles = this.roles.map(role => ({
      ...role,
      access: this.cloneRouteList(this.routeList),
    }));

  }

  // Fonction pour cloner en profondeur la liste des routes
  cloneRouteList(routes: any[]): any[] {
    return JSON.parse(JSON.stringify(routes));  // Créer une copie profonde de l'objet
  }
}
