import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ChatComponent } from './features/chat/chat.component';
import { DeviceListComponent } from './features/device-list/device-list.component';
import { MeasurementStatsComponent } from './features/measurement-stats/measurement-stats.component';
import { UserDetailsComponent } from './features/user-details/user-details.component';
import { UserListComponent } from './features/user-list/user-list.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { AdminRoleService } from './services/admin-role.service';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {path:'',redirectTo:"login",pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'register', component: RegisterComponent},
  {path:'users',component:UserListComponent, canActivate: [AuthGuardService,AdminRoleService]},
  {path:'user-details/:userId', component: UserDetailsComponent },
  {path:'devices',component:DeviceListComponent, canActivate: [AuthGuardService]},
  {path:'measurements',component:MeasurementStatsComponent, canActivate: [AuthGuardService]},
  {path:'chat',component:ChatComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
