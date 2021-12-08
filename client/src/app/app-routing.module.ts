import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptInvitationComponent } from './components/accept-invitation/accept-invitation.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { PanelComponent } from './components/panel/panel.component';
import { AuthGuardService } from './guard/auth-guard.service';


const routes: Routes = [
  { path: 'panel', component: PanelComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'invitation/:uuid', component: AcceptInvitationComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
