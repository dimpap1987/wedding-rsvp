import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Invintation } from 'src/app/interfaces/invitation.interface';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  invitation!: Invintation;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.invitation = data.invitation;
  }

  ngOnInit(): void {
  }

}
