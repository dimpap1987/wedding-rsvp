import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from '../components/loader/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private dialog: MatDialog) { }

  load() {
    this.dialog.open(SpinnerComponent);
  }
}
