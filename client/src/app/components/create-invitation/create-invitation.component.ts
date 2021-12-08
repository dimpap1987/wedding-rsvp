import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Invintation } from 'src/app/interfaces/invitation.interface';
import { ApiService } from 'src/app/services/api.service';

const emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
  selector: 'app-create-invitation',
  templateUrl: './create-invitation.component.html',
  styleUrls: ['./create-invitation.component.scss']
})
export class CreateInvitationComponent implements OnInit {

  _form: FormGroup;
  invitations: Invintation[] = [];

  constructor(private _fb: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) {

    this._form = this._fb.group({
      data: this._fb.array([
        this._fb.group({
          'email': [], //validator merge email & mobile
          'mobile': [],
          'lastName': [],
        })
      ])
    });
  }

  get getDataControl() {
    return (this._form.get('data') as FormArray).controls;
  }

  ngOnInit(): void {
  }

  onSubmit() {

    const data = this._form.value.data;
    
    // TODO validate email and phone number

    this.api.saveInvitation(data).subscribe(() => {
      this.snackBar.open("Succeessfully saved", "Close", { duration: 2000 });
      this.dialog.closeAll();
    }, e => this.snackBar.open(e.error?.message, "Close", { duration: 4000 }));
  }

  _addRow() {
    const formArray: FormArray = this._form.get("data") as FormArray;

    const form = this._fb.group({
      'email': [], //validator merge email & mobile
      'mobile': [],
      'lastName': [],
    });

    formArray.push(form);
  }

  _removeRow(index: number) {
    const formArray: FormArray = this._form.get("data") as FormArray;

    formArray.removeAt(index);
  }
}
