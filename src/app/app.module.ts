import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { LoginComponent } from './security/login/login.component';
import { RegisterComponent } from './security/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './features/user-list/user-list.component';
import { DeviceListComponent } from './features/device-list/device-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { UserUpdateDialogComponent } from './features/user-update-dialog/user-update-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DeviceUpdateDialogComponent } from './features/device-update-dialog/device-update-dialog.component';
import { DeviceCreateDialogComponent } from './features/device-create-dialog/device-create-dialog.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DeviceCardComponent } from './features/device-card/device-card.component';
import { MatCardModule } from '@angular/material/card';
import { AppUserCardComponent } from './features/app-user-card/app-user-card.component';
import { UserDetailsComponent } from './features/user-details/user-details.component';
import { MinimalDeviceCardComponent } from './features/minimal-device-card/minimal-device-card.component';
import { MeasurementStatsComponent } from './features/measurement-stats/measurement-stats.component';
import { ChartModule } from 'angular-highcharts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ChatComponent } from './features/chat/chat.component';
import { StompService } from './services/stomp.service';


@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    LoginComponent,
    RegisterComponent,
    UserListComponent,
    DeviceListComponent,
    UserUpdateDialogComponent,
    DeviceUpdateDialogComponent,
    DeviceCreateDialogComponent,
    DeviceCardComponent,
    AppUserCardComponent,
    UserDetailsComponent,
    MinimalDeviceCardComponent,
    MeasurementStatsComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSidenavModule,
    MatCardModule,
    ChartModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    StompService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
