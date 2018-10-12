import { Component } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  chart = []; // This will hold our chart info

  constructor(private _weather: WeatherService) { }

  toC(degree: number) {
    return (degree - 32) * (5 / 9)
  }

  ngOnInit() {
    console.log(this.toC(32));


    this._weather.getWeatherData()
      .subscribe(res => {
        let temp = res['list'].map(res => res.main.temp);
        let humidity = res['list'].map(res => res.main.humidity);
        let alldates = res['list'].map(res => res.dt)


        let weatherDates = []
        alldates.forEach((res) => {
          let jsdate = new Date(res * 1000)
          weatherDates.push(jsdate.toLocaleTimeString('en', { year: 'numeric', month: 'short', day: 'numeric' }))
        })

        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                label: 'Temperature',
                data: temp,
                backgroundColor: "#3cba9f",
                borderColor: "#3cba9f",
                fill: false
              },
              {
                label: 'Humidity',
                data: humidity,
                backgroundColor: "#ffcc00",
                borderColor: "#ffcc00",
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: true
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });

      })
  }



}
