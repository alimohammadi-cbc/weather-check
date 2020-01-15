import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/text' })
};

@Injectable()
export class CityService {

  constructor(private http:HttpClient) {}

    // Uses http.get() to load data from a single API endpoint
    getCityWeather(name: string){
        return this.http.get('https://samples.openweathermap.org/data/2.5/weather?q=London,uk&appid=b6907d289e10d714a6e88b30761fae22')
        .subscribe(
              data => {
        	      console.log(data);
        	  }
        );
    }
}
