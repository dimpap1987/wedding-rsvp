import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SpinnerComponent } from './components/loader/spinner/spinner.component';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(public loadingService: LoadingService,
    private dialog: MatDialog) { }


  ngOnInit(): void {
    this.loadingService.isLoading.subscribe(res => {
      if (res) {
        this.dialog.open(SpinnerComponent);
      } else {
        this.dialog.closeAll();
      }
    })
  }

}
