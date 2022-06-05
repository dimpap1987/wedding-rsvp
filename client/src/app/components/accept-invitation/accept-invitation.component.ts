import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Invintation } from 'src/app/interfaces/invitation.interface';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  isValid: boolean;
  registrationText!: string;

  maxAdults = 20;
  minAdults = 1;

  maxChildren = 20;
  minChildren = 0;

  constructor(private translateService: TranslateService,
    private route: ActivatedRoute, private api: ApiService,
    private snackBar: MatSnackBar, private _fb: FormBuilder,
    private utilService: UtilsService) {

    this.route.params.subscribe(uuid => {
      this.uuidToken = uuid;
    });

    this._form = this._fb.group({
      'numberOfAdults': ['', [Validators.required, Validators.minLength(this.minAdults), Validators.maxLength(this.maxAdults)]],
      'numberOfChildren': ['', [Validators.minLength(this.minChildren), Validators.maxLength(this.maxChildren)]],
    });
  }

  matcher = new MyErrorStateMatcher()

  ngOnInit(): void {
    if (!this.uuidToken) return;

    this.api.findInvitationByUUID(this.uuidToken?.uuid).subscribe((inv) => {
      if (!inv) {
        this.snackBar.open("Invalid invitation!", "Close", { duration: 2000 })
        return;
      }
      this.invitation = inv;
      this.translateService.use(this.invitation.language as string);
      this.utilService.changeLanguage(this.invitation.language as string);
      this.isValid = true;
      this.isRegisterActivated = !this.invitation?.registered
      // this.registrationText = this.invitation?.registered ?
      //   this.translateService.instant('rsvp.butttonAccepted') :
      //   this.translateService.instant('rsvp.butttonPending');

      if (this.invitation?.registered) {
        this._form.patchValue({
          numberOfAdults: this.invitation?.numberOfAdults,
          numberOfChildren: this.invitation?.numberOfChildren
        });
      }
    });
  }


  register() {

    if (this.invitation?._id && this._form.valid) {
      const formData = this._form.value;

      this.api.registerInvitation(this.invitation._id, true, formData.numberOfAdults, formData.numberOfChildren)
        .subscribe((result) => {
          this.invitation = result;
          this.isRegisterActivated = false;
          // this.registrationText = this.translateService.instant('rsvp.butttonAccepted');
          this.snackBar.open("Successfully registered!", "Close", { duration: 2000 })
        });
    }
  }
}
