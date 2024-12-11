import { Injectable, Type } from '@angular/core';

import {NotificationComponent} from "../../pages/admin/notification/notification.component";

import {AddAgentComponent} from "../../pages/crud/agent/add-agent/add-agent.component";
import {EditAgentComponent} from "../../pages/crud/agent/edit-agent/edit-agent.component";

import {AdminDashboardComponent} from "../../pages/dashboard/admin-dashboard/admin-dashboard.component";
import {AgencyDashboardComponent} from "../../pages/dashboard/agency-dashboard/agency-dashboard.component";
import {
  AgencyNotificationComponent
} from "../../pages/social-networks/agency-notification/agency-notification.component";
import {AgencyRapportComponent} from "../../pages/rapport/agency-rapport/agency-rapport.component";
import {AdminRapportComponent} from "../../pages/rapport/admin-rapport/admin-rapport.component";
// Importez d'autres composants ici

@Injectable({
  providedIn: 'root'
})
export class RoleComponentService {

  // Table de correspondance entre rôles, routes et composants
  private roleComponentMap: { [key: string]: { [path: string]: any } } = {
    'super_admin': {
      'dashboard': {
        'component':AdminDashboardComponent,
        'data':[],
      },
      'notifications': {
        'component':NotificationComponent,
        'data':[],
      },
      'agents/add':{
        'component':AddAgentComponent,
        'data':[],
      },
      'agents/edit':{
        'component':EditAgentComponent,
        'data':[],
      },
      'rapport':{
        'component':AdminRapportComponent,
        'data':[],
      },
    },
    'admin': {
      'dashboard': {
        'component':AdminDashboardComponent,
        'data':[],
      },
      'notifications': {
        'component':NotificationComponent,
        'data':[],
      },
      'agents/add':{
        'component':AddAgentComponent,
        'data':[],
      },
      'agents/edit':{
        'component':EditAgentComponent,
        'data':[],
      },
      'rapport':{
        'component':AdminRapportComponent,
        'data':[],
      },
    },
    'agency': {
      'dashboard':{
        'component':AgencyDashboardComponent,
        'data':['agency/agents'],
      },
      'notifications':{
        'component':AgencyNotificationComponent,
        'data':[],
      },
      'agents/add/:id':{
        'component':AddAgentComponent,
        'data':[],
      },
      'agents/edit/:id':{
        'component':EditAgentComponent,
        'data':[],
      },
      'rapport':{
        'component':AgencyRapportComponent,
        'data':[],
      },
    },

    'agent': {
      'dashboard':{
        'component':AgencyDashboardComponent,
        'data':['agency/agents'],
      },
      'notifications':{
        'component':AgencyNotificationComponent,
        'data':[],
      },
      'agents/edit/:id':{
        'component':EditAgentComponent,
        'data':[],
      },
      'rapport':{
        'component':AgencyRapportComponent,
        'data':[],
      },
    },

  };

  // Obtenir le composant correspondant à un rôle et à une route spécifique
  getComponentForRoleAndPath(role: string|null|undefined, path: string): any | null {

    let roleRoutes=null;
    if(role)
    {
      roleRoutes = this.roleComponentMap[role];

    }
    roleRoutes&&console.log(path,roleRoutes)
    return roleRoutes ? roleRoutes[path] : null;
  }
}
