import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wheater-container',
  templateUrl: './wheater-container.component.html',
  styleUrls: ['./wheater-container.component.css']
})
export class WeatherContainerComponent implements OnInit {

  cityName = 'app';
  sidebarMode = 'side';

  constructor() { }

  ngOnInit() {
  }

  public search(cityName: string) {
    this.cityName = cityName;
  }


}
