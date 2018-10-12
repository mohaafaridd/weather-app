import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherData(){
    return this.http.get("http://api.openweathermap.org/data/2.5/forecast?id=353219&units=metric&APPID=30e884d9f66fa6ae431675f0a7120897");
  }
}
