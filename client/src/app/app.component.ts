import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  // languages = ['en', 'gr'];

  constructor() {
    // this.translateService.addLangs(this.languages);
    // this.translateService.setDefaultLang('gr');

    //     const browserlang: string = this.translateService.getBrowserLang() || 'gr';
    // console.log(this.translateService.getBrowserLang());

    //     console.log('Browser Language => ', browserlang);

    //     if (this.languages.includes(browserlang)) {
    //     }
    // this.translateService.use(browserlang);
  }


  ngOnInit(): void { }

}
