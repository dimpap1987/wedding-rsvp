import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private loadingService: LoadingService,
    private api: ApiService) { }

  ngOnInit(): void {
    this.loadingService.load();
    this.api.getInvitations().subscribe(console.log);
  }

}
