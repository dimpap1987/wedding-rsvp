import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AcceptInvitationComponent } from './components/accept-invitation/accept-invitation.component';
import { ButtonComponent } from './components/button/button.component';
import { CountDownComponent } from './components/count-down/count-down.component';
import { CreateInvitationComponent } from './components/create-invitation/create-invitation.component';
import { GoogleMapsComponent } from './components/google-maps/google-maps.component';
import { HomeComponent } from './components/home/home.component';
import { SpinnerComponent } from './components/loader/spinner/spinner.component';
import { LoginComponent } from './components/login/login.component';
import { MatTableResponsiveDirective } from './components/mat-table-responsive.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PanelComponent } from './components/panel/panel.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { WeddingComponent } from './components/wedding/wedding.component';
import { HttpConfigInterceptor } from './interceptors/httpconfig.interceptor';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    PanelComponent,
    CreateInvitationComponent,
    HomeComponent,
    AcceptInvitationComponent,
    LoginComponent,
    NavbarComponent,
    CountDownComponent,
    WeddingComponent,
    ButtonComponent,
    QrcodeComponent,
    MatTableResponsiveDirective,
    GoogleMapsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    NgbModule,
    HttpClientModule,
    AppRoutingModule,
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSortModule,
    GoogleMapsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
