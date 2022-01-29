import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {

  lat = 38.03236994402693;
  lng = 23.854960922615078;

  mapOptions: google.maps.MapOptions = {
    center: { lat: this.lat, lng: this.lng },
    zoom: 14
  }
  marker = {
    position: { lat: this.lat, lng: this.lng },
  }
  constructor() { }

  ngOnInit(): void {

  }

  redirect() {
    window.open(
      environment.weddingPlaceUrl,
      '_blank'
    );
  }
}