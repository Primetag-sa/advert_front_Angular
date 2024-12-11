import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/auth/login/login.component';
import { RegisterComponent } from './security/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AgencyListComponent } from './pages/crud/agency/agency-list/agency-list.component';
import { ResetComponent } from './security/auth/reset/reset.component';
import { MsgWelcomComponent } from './security/auth/msg-welcom/msg-welcom.component';
import { MsgSendResetComponent } from './security/auth/msg-send-reset/msg-send-reset.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { AddAgencyComponent } from './pages/crud/agency/add-agency/add-agency.component';
import { EditAgencyComponent } from './pages/crud/agency/edit-agency/edit-agency.component';
import { GuestGuardService } from './services/core/guest-guard.service';
import { AdminListComponent } from './pages/crud/admin/admin-list/admin-list.component';
import { AddAdminComponent } from './pages/crud/admin/add-admin/add-admin.component';
import { EditAdminComponent } from './pages/crud/admin/edit-admin/edit-admin.component';
import { ListAgentComponent } from './pages/crud/agent/list-agent/list-agent.component';

import {RoleComponent} from "./pages/admin/role/role.component";
import {WrapperComponent} from "./components/wrapper/wrapper.component";
import {PreloadAccessResolver} from "./security/resolvers/preload.access.resolver";
import {NotFoundComponent} from "./security/not-found/not-found.component";
import {AddAgentComponent} from "./pages/crud/agent/add-agent/add-agent.component";
import {EditAgentComponent} from "./pages/crud/agent/edit-agent/edit-agent.component";
import {AdminDashboardComponent} from "./pages/dashboard/admin-dashboard/admin-dashboard.component";
import {AgencyProfileComponent} from "./pages/social-networks/agency-profile/agency-profile.component";
import {AgencyfacebookComponent} from "./pages/social-networks/agencyfacebook/agencyfacebook.component";
import {AgencyXComponent} from "./pages/social-networks/agency-x/agency-x.component";
import {AgencyInstagramComponent} from "./pages/social-networks/agency-instagram/agency-instagram.component";
import {AgencySnapshatComponent} from "./pages/social-networks/agency-snapshat/agency-snapshat.component";
import {AgencyTrackingComponent} from "./pages/social-networks/agency-tracking/agency-tracking.component";
import {AgencyTiktokComponent} from "./pages/social-networks/agency-tiktok/agency-tiktok.component";
import {AgencyGoogleComponent} from "./pages/social-networks/agency-google/agency-google.component";
import {SnapchatCallbackComponent} from "./pages/social-networks/snapchat-callback/snapchat-callback.component";

function addPreloadResolverToRoutes(routes: Routes): Routes {
  return routes.map((route:any) => {
    // Ajoute le resolver à la route si elle a une route enfant ou un composant
    if (route.component) {
      route.resolve = {
        ...route.resolve,
        preloadAccess: PreloadAccessResolver  // Ajoute le resolver
      };
    }

    // Si la route a des enfants, applique la fonction récursive
    if (route.children) {
      route.children = addPreloadResolverToRoutes(route.children);
    }

    return route;
  });
}
function addCanActivateToRoutes(routes: Routes): Routes {
  return routes.map((route:any) => {
    // Ajoute le resolver à la route si elle a une route enfant ou un composant
    if (route.component && route.data?.notSecure==undefined) {
      route.canActivate = [
        GuestGuardService // Ajoute le guard
      ]


    }

    // Si la route a des enfants, applique la fonction récursive
    if (route.children) {
      route.children = addCanActivateToRoutes(route.children);
    }

    return route;
  });
}
export const routes: Routes = [

      { path: '', component: HomeComponent, data: {id:"1", title:'الصفحة الرئيسية' } },
      { path: 'home', redirectTo: '', pathMatch: 'full',data: {id:"2" } },
      {
        path: 'login',
        component: LoginComponent,
        data: {id:"3" }
      },
      { path: 'register', component: RegisterComponent ,data: {id:"4" ,notSecure:true} },
      { path: 'reset', component: ResetComponent ,data: {id:"5" , title:'إعادة الضبط' } },
      { path: 'reset/message', component: MsgSendResetComponent,data: {id:"6" } },
      { path: 'success', component: MsgWelcomComponent,data: {id:"7" } },
      { path: 'profile', component: ProfileComponent,data: {id:"8" } },

      {
        path: 'dashboard',
        component: WrapperComponent,
        data: {id:"10", title: 'لوحة التحكم' ,data:{"entities":[{"role":"agency","entity":"agency/agents","pagination":true},{"role":"admin","entity":"users","pagination":true}]}} // Données spécifiques pour cette sous-route
      },
      {
        path: 'notifications',
        component: WrapperComponent ,
        data: {id:"11",title:'الإشعارات', roles: ['super_admin','admin'] }
      },
      {
        path: 'agents',
        data: {id:"12", title: 'الوكلاء' },
        children: [
          {
            path: ':id',
            component: ListAgentComponent,
            data: {id:"12-1", title: 'إدارة الوكلاء' }
          },
          {
            path: 'add/:id',
          component: AddAgentComponent,
            data: {id:"12-2", title:'إضافة الوكلاء' , roles: ['super_admin','admin','agency']  }
          },
          {
            path: 'edit/:id',
            component: EditAgentComponent,
            data: {id:"12-3", title: 'تحديث الوكلاء', roles: ['super_admin','admin','agency'] }
          }
        ]
      },
      { path: 'rapport',
        component: WrapperComponent ,

        data: {id:"13",title:'التقارير', roles: ['super_admin','admin'] }
      },
      {
        path: 'agencies',
        redirectTo: 'agencies/list', // Redirects to the 'list' child route
        pathMatch: 'full', // Ensure the entire path is matched
        data: { id: "14", title: 'الوكالة', roles: ['super_admin', 'agent', 'agency'] }
      },
      {
        path: 'agencies',
        children: [
          {
            path: 'list',
            component: AgencyListComponent,
            data: {id:"14-1", title:  'إدارة الوكالات' ,roles: ['super_admin','agent', 'agency']}
          },
          {
            path: 'add',
            component: AddAgencyComponent,
            data: {id:"14-2", title: 'إضافة وكالة' }
          },
          {
            path: 'edit/:id',
            component: EditAgencyComponent,
            data: {id:"14-3", title: 'تحديث الوكالة' }
          },
          { path: 'create',
            component: AdminDashboardComponent ,
            data: {id:"14-4",title:'إضافة وكالة', roles: ['admin'] }},
          { path: 'edit:{id}',
            component: AdminDashboardComponent ,
            data: {id:"14-5",title:'تحديث الوكالة', roles: ['admin'] }},

        ]
      },
      {
        path: 'admins',

        data: {id:"15", title: 'المدراء' },
        children: [
          {
            path: 'list',
            component: AdminListComponent,
            data: {id:"15-1", title: 'إدارة المدراء' }
          },
          {
            path: 'add',
            component: AddAdminComponent,
            data: {id:"15-2", title: 'إضافة المدراء' }
          },
          {
            path: 'edit/:id',
            component: EditAdminComponent,
            data: {id:"15-3", title: 'تحديث المدراء' }
          }
        ]
      },
      { path: 'settings',

        data: {id:"16",title:'الإعدادات', roles: ['super_admin','admin','agency'] },
        children: [
          { path: 'profile',
            component:  AgencyProfileComponent ,
            data: {id:"16-1",title:'الملف الشخصي' }
          },
          { path: 'role',
            component: RoleComponent ,
            canActivate: [ GuestGuardService ] ,
            data: {id:"16-2" , title:'إدارة الصلاحيات' }
          },
        ]

      },
      { path: 'facebook',
        component:  AgencyfacebookComponent ,
        data: {id:"18",title:'فيسبوك', roles: ['super_admin','agent', 'agency'] }},

      { path: 'x',
        component:  AgencyXComponent ,
        data: {id:"19",title:'X', roles: ['super_admin','agent', 'agency'] ,data:{"entities":[{"role":"agency","entity":"account","pageSize":0,"pagination":false}]} }},

      { path: 'instagram',
        component:  AgencyInstagramComponent ,
        data: {id:"20",title:'انستغرام', roles: ['super_admin','agent', 'agency'] }},

      { path: 'snapchat',
        component:  AgencySnapshatComponent ,
        data: {id:"21",title:'سناب شات',data:{"entities":[{"role":"agency","entity":"get-snap-data"},{"role":"super_admin","entity":"get-snap-data"}]}, roles: ['super_admin','agent', 'agency'] }},

        { path: 'tracking',
          component:  AgencyTrackingComponent ,
          data: {id:"23",title:'Tracking', roles: ['super_admin','agent', 'agency'] }
        },
      { path: 'tiktok',
        component:  AgencyTiktokComponent ,
        data: {id:"22",title:'تيك توك', roles: ['super_admin','agent', 'agency'] }},

      { path: 'google',
        component:  AgencyGoogleComponent ,
        data: {id:"24",title:'google', roles: ['super_admin','agent', 'agency'] }},

      { path: 'auth/snapchat/callback', component: SnapchatCallbackComponent },
      { path: '**',  component: NotFoundComponent  },
];


const routesWithResolvers = addPreloadResolverToRoutes(routes);
const routesWithCanActivate = addCanActivateToRoutes(routesWithResolvers);

@NgModule({
  imports: [RouterModule.forRoot(routesWithCanActivate)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
