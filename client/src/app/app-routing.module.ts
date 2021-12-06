import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { HomeComponent } from './components/home/home.component';
import { AcceptInvitationComponent } from './components/accept-invitation/accept-invitation.component';


const routes: Routes = [
  { path: 'panel', component:  PanelComponent},
  { path: 'invitation/:uuid', component:  AcceptInvitationComponent},
  { path: '**', component:  HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
