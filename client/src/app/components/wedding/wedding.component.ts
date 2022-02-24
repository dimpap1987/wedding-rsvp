import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Invintation } from 'src/app/interfaces/invitation.interface';

@Component({
  selector: 'app-wedding',
  templateUrl: './wedding.component.html',
  styleUrls: ['./wedding.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeddingComponent implements OnInit {

  invitation: Invintation;

  constructor() { }

  ngOnInit(): void {
  }

}
