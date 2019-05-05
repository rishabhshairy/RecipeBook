import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'RecepieBook';
  loadedFeature = 'recipe';
  ngOnInit() {
    firebase.initializeApp({
      // Add your own api key and auth domain
      apiKey: '',
      authDomain: ''
    });
  }
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
