import { Injectable } from '@angular/core';


export interface TreeNode{
    path: string,
    name: string,
    id:string,
    component: any,
    selected: boolean,
    selectable: boolean,
    expanded: boolean,
    indeterminate: boolean,
    children: any[]
}
@Injectable({
  providedIn: 'root'
})
export class RouteService {
  constructor() {}

  getRoutes(routes: any, basePath = ''): any[] {
    let routeTable: any[] = [];

    routes.forEach((route: any) => {
      if (route.data?.title !== undefined) {
        const fullPath = basePath + '/' + route.path;

        const routeEntry:TreeNode = {
          path: fullPath,
          name: route.data.title,
          id:route.data.id,
          component: route.component,
          selected: false,
          selectable: false,
          expanded: false,
          indeterminate: false,
          children: []
        };

        // Si la route a des enfants (sous-routes), les structurer correctement
        if (route.children) {
          routeEntry.children = this.getRoutes(route.children, fullPath);
        }

        routeTable.push(routeEntry);
      }
    });

    return routeTable;
  }

  checkRoutes(routes: any, path = ''): string|null {


    for (let route of routes) {
      if (route.path === path) {
          return route.data?.id
      } else{
        if(route.children===undefined)
        {
          route={
            ...route,
            children:[]
          }
        }
        this.checkRoutes(route.children, route.path);
      }
    }
    return null
  }


}
