import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './security/auth/login/login.component';
import { RegisterComponent } from './security/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withFetch, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { ProfileComponent } from './pages/admin/profile/profile.component';
import { NotificationComponent } from './pages/admin/notification/notification.component';
import { SidebarAdminComponent } from './layouts/sidebar-admin/sidebar-admin.component';
import { AgencyListComponent } from './pages/crud/agency/agency-list/agency-list.component';
import { SettingsComponent } from './pages/admin/settings/settings.component';
import { ResetComponent } from './security/auth/reset/reset.component';
import { MsgWelcomComponent } from './security/auth/msg-welcom/msg-welcom.component';
import { MsgSendResetComponent } from './security/auth/msg-send-reset/msg-send-reset.component';
import { AddAgencyComponent } from './pages/crud/agency/add-agency/add-agency.component';
import { EditAgencyComponent } from './pages/crud/agency/edit-agency/edit-agency.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminListComponent } from './pages/crud/admin/admin-list/admin-list.component';
import { EditAdminComponent } from './pages/crud/admin/edit-admin/edit-admin.component';
import { AddAdminComponent } from './pages/crud/admin/add-admin/add-admin.component';
import { AddAgentComponent } from './pages/crud/agent/add-agent/add-agent.component';
import { ListAgentComponent } from './pages/crud/agent/list-agent/list-agent.component';
import { EditAgentComponent } from './pages/crud/agent/edit-agent/edit-agent.component';
import { SidebarAgencyComponent } from './layouts/sidebar-agency/sidebar-agency.component';
import { SidebarAgentComponent } from './layouts/sidebar-agent/sidebar-agent.component';
import { AgentDashboardComponent } from './pages/dashboard/agent-dashboard/agent-dashboard.component';
import { TweetsComponent } from './components/tweets/tweets.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AlertComponent } from './components/alert/alert.component';
import { TiktokComponent } from './components/tiktok/tiktok.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CsrfInterceptor } from "./security/interceptor/csrf.interceptor";
import { crudReducer } from "./store/crud/crud.reducer";
import { CrudEffects } from "./store/crud/crud.effects";
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { RoleComponent } from './pages/admin/role/role.component';
import { WrapperComponent } from "./components/wrapper/wrapper.component";
import { RouteTreeComponent } from "./components/route-tree/route-tree.component";
import { NotFoundComponent } from "./security/not-found/not-found.component";
import { AuthInterceptor } from "./security/interceptor/auth.interceptor";
import { GenaralChartComponent } from './components/genaral-chart/genaral-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { NgbModule, NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from "@angular/common";
import { DataTablesModule } from 'angular-datatables';
import {AdminDashboardComponent} from "./pages/dashboard/admin-dashboard/admin-dashboard.component";
import {HeaderComponent} from "./layouts/header/header.component";
import {AgencyDashboardComponent} from "./pages/dashboard/agency-dashboard/agency-dashboard.component";
import {AgencyNotificationComponent} from "./pages/social-networks/agency-notification/agency-notification.component";
import {AgencyRapportComponent} from "./pages/rapport/agency-rapport/agency-rapport.component";
import {AgencyfacebookComponent} from "./pages/social-networks/agencyfacebook/agencyfacebook.component";
import {AgencyXComponent} from "./pages/social-networks/agency-x/agency-x.component";
import {AgencySnapshatComponent} from "./pages/social-networks/agency-snapshat/agency-snapshat.component";
import {AgencyInstagramComponent} from "./pages/social-networks/agency-instagram/agency-instagram.component";
import {AgencyTiktokComponent} from "./pages/social-networks/agency-tiktok/agency-tiktok.component";
import {AgencyProfileComponent} from "./pages/social-networks/agency-profile/agency-profile.component";
import { AgencyGoogleComponent } from './pages/social-networks/agency-google/agency-google.component';
import {SnapchatCallbackComponent} from "./pages/social-networks/snapchat-callback/snapchat-callback.component";
import {AgencyTrackingComponent} from "./pages/social-networks/agency-tracking/agency-tracking.component";
import {AdminRapportComponent} from "./pages/rapport/admin-rapport/admin-rapport.component";
// last version of 06-12-2024
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminDashboardComponent,
    HeaderComponent,
    SidebarComponent,
    ProfileComponent,
    NotificationComponent,
    AdminRapportComponent,
    SidebarAdminComponent,
    AgencyListComponent,
    SettingsComponent,
    ResetComponent,
    MsgWelcomComponent,
    MsgSendResetComponent,
    AddAgencyComponent,
    EditAgencyComponent,
    AdminListComponent,
    EditAdminComponent,
    AddAdminComponent,
    AddAgentComponent,
    ListAgentComponent,
    EditAgentComponent,
    SidebarAgencyComponent,
    SidebarAgentComponent,
    AgentDashboardComponent,
    AgencyDashboardComponent,
    AgencyNotificationComponent,
    AgencyRapportComponent,
    AgencyfacebookComponent,
    AgencyXComponent,
    AgencySnapshatComponent,
    AgencyInstagramComponent,
    AgencyTiktokComponent,
    AgencyProfileComponent,
    AddAgentComponent,
    EditAgentComponent,
    AgencyGoogleComponent,
    TweetsComponent,
    AlertComponent,
    TiktokComponent,
    SnapchatCallbackComponent,
    RoleComponent,
    WrapperComponent,
    RouteTreeComponent,
    NotFoundComponent,
    GenaralChartComponent,
    AgencyTrackingComponent,
  ],
  exports: [
    HeaderComponent,
    SidebarAdminComponent,
    SidebarAgencyComponent,
    SidebarAgentComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ crud: crudReducer, auth: authReducer }),
    EffectsModule.forRoot([CrudEffects, AuthEffects]),
    ReactiveFormsModule,
    NgChartsModule,
    NgbCollapse,
    DataTablesModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
    DatePipe
  ]
})
export class AppModule { }
