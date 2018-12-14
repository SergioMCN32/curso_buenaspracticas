import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-weather-search',
  template: `
  <mat-card>
  <mat-card-content>
    <mat-form-field>
      <input matInput placeholder="Ciudad" name="cityName" [(ngModel)]="cityName">
    </mat-form-field>
    <button mat-raised-button color="primary" [ngClass]="cityName !== undefined && cityName !== '' ? 'active': 'no-active'" (click)="searchCity($event)">Buscar ciudad</button>
    <mat-spinner *ngIf="loading"></mat-spinner>
  </mat-card-content>
</mat-card>
  `,
  styles: [
    `
    .active {
      visibility: visible;
  }

  .no-active {
      visibility: hidden;
  }
    `
  ]
})
export class WeatherSearchComponent implements OnInit {

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();

  loading: boolean;
  cityName: string;

  constructor() { }

  ngOnInit() {
    this.loading = false;
  }

  public searchCity($event) {
    this.loading = !this.loading;
    this.searchEvent.emit(this.cityName);
  }

}
