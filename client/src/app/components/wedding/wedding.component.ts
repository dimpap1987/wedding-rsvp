import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, tap } from 'rxjs';
import { Invintation } from 'src/app/interfaces/invitation.interface';

@Component({
  selector: 'app-wedding',
  templateUrl: './wedding.component.html',
  styleUrls: ['./wedding.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeddingComponent implements OnInit {

  invitation: Invintation;
  languages = [
    {
      label: 'Ελληνικά',
      value: 'gr'
    },
    {
      label: 'English',
      value: 'en'
    }
  ];
  selectedLang = 'gr';

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(this.languages.map(l => l.value));
    this.translateService.setDefaultLang(this.languages[0].value);
  }

  ngOnInit(): void {
    if (this.isGreece()) {
      this.translateService.use(this.languages[0].value)
      this.selectedLang = this.languages[0].value
    } else {
      this.translateService.use(this.languages[1].value);
      this.selectedLang = this.languages[1].value;
    }
  }

  onChange(lang: string) {
    this.selectedLang = lang;
    console.log(this.selectedLang);
    this.translateService.use(this.selectedLang);
  }

  isGreece(): boolean {
    const result = Intl.DateTimeFormat().resolvedOptions().timeZone.match('Athens');
    return !!result
  }
}
