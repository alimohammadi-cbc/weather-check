import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, tap } from "rxjs/operators";

export class City {
  name: string;
}

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
    })
};

const apiURL = 'https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather';
const apiID = 'c03531387aed7cd065a19cc3e1191d2a';

@Injectable()
export class CityService {

  constructor(private http:HttpClient) {}

  // Uses http.get() to load data from a single API endpoint
  getCityWeather(cityName: string): Observable<any>{
      return this.http.get(apiURL+'?q='+cityName+'&APPID='+apiID+'&units=metric', httpOptions);
  }
}
