import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Invintation } from 'src/app/interfaces/invitation.interface';
import { ApiService } from 'src/app/services/api.service';

const REGISTER = 'Register';
const UPDATE_REGISTRATION = 'Update Registration';
const REGISTERED = 'Registered!';

@Component({
  selector: 'app-accept-invitation',
  templateUrl: './accept-invitation.component.html',
  styleUrls: ['./accept-invitation.component.scss']
})
export class AcceptInvitationComponent implements OnInit {

  uuidToken: any;
  invitation: Invintation = {};
  _form: FormGroup;

  isRegisterActivated: boolean = true;
  registrationText!:string;

  constructor(private route: ActivatedRoute, private api: ApiService, private snackBar: MatSnackBar, private _fb: FormBuilder) {
    this.route.params.subscribe(uuid => {
      this.uuidToken = uuid;
    });

    this._form = this._fb.group({
      'numberOfAdults': [this.invitation?.numberOfAdults],
      'numberOfChildren': [this.invitation?.numberOfChildren],
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
      this.isRegisterActivated = !this.invitation?.registered
      this.registrationText = this.invitation?.registered ? REGISTERED : REGISTER;

      if (this.invitation?.registered) {
        this._form.patchValue({
          numberOfAdults: this.invitation?.numberOfAdults,
          numberOfChildren: this.invitation?.numberOfChildren
        });
      }
    }).add(() => {
      this._form.get('numberOfAdults')?.valueChanges.subscribe(() => {
        if (this.invitation?.registered) {
          this.isRegisterActivated = true;
          this.registrationText = UPDATE_REGISTRATION;
        }
      });
      this._form.get('numberOfChildren')?.valueChanges.subscribe(() => {
        if (this.invitation?.registered && this._form.get('numberOfAdults')?.value > 0) {
          this.isRegisterActivated = true;
          this.registrationText = UPDATE_REGISTRATION;
        }
      });
    });

  }


  register() {
    const formData = this._form.value;
    if (!this.invitation?._id || !this.isRegisterActivated) return;

    // TODO UI ERROR messages
    if(!formData.numberOfAdults || formData.numberOfAdults < 1){
      return;
    }

    this.api.registerInvitation(this.invitation._id, true, formData.numberOfAdults, formData.numberOfChildren)
      .subscribe((result) => {
        this.invitation = result;
        this.isRegisterActivated = false;
        this.registrationText = REGISTERED;

        if (formData.registered) {
          this.snackBar.open("Successfully registered!", "Close", { duration: 2000 })
        }
      });
  }

}
