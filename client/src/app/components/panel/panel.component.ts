import { Component, OnInit } from '@angular/core';
import { Invintation } from 'src/app/interfaces/invitation.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  invitations: Invintation[] = [];
  displayedColumns: string[] = ['index', 'name', 'mobile', 'email','registered','emailSent','smsSent','dateCreated','dateRegistered'];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getInvitations().subscribe(response => {
      this.invitations = response;
      console.log(this.invitations);
    });
  }

}
