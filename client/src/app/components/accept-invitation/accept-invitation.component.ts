import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Invintation } from 'src/app/interfaces/invitation.interface';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-accept-invitation',
  templateUrl: './accept-invitation.component.html',
  styleUrls: ['./accept-invitation.component.scss']
})
export class AcceptInvitationComponent implements OnInit {

  uuidToken: any;
  invitation: Invintation = {};

  constructor(private route: ActivatedRoute, private api: ApiService, private snackBar: MatSnackBar) {
    this.route.params.subscribe(uuid => {
      this.uuidToken = uuid;
    });
  }

  ngOnInit(): void {
    if (!this.uuidToken) return;

    this.api.findInvitationByUUID(this.uuidToken?.uuid).subscribe((inv) => {
      if (!inv) {
        this.snackBar.open("Invalid invitation!", "Close", { duration: 2000 })
        return;
      }
      this.invitation = inv;
    });
  }


  register(bool: boolean) {
    if (!this.invitation?._id) return;

    this.api.registerInvitation(this.invitation._id, bool)
      .subscribe((result) => {
        this.invitation = result;
        if (bool) {
          this.snackBar.open("Successfully registered!", "Close", { duration: 2000 })
        } else {
          this.snackBar.open("Bye Bye!", "Close", { duration: 2000 })
        }
      });
  }

}
