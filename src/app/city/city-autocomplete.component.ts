import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {CityService, City} from './city.service';


@Component({
  selector: 'app-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.css'],
  providers:  [ CityService ]
})

export class CityAutocompleteComponent implements OnInit {

  constructor(private cityService: CityService) {

  }

  myControl = new FormControl();
  result: any;

  options: City[] = [
    {name: 'Toronto'},
    {name: 'Vancouver'},
    {name: 'Quebec'}
  ];
  filteredOptions: Observable<City[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );

    this.myControl.valueChanges.subscribe(x => {

      if(this.options.filter(option => option.name == x['name']).length > 0){
          this._checkWeather(x['name'].toLowerCase());
      }

    });
  }

  displayFn(city?: City): string | undefined {
    return city ? city.name : undefined;
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase().replace(/\s/g, "");
    return this.options.filter(option => option.name.toLowerCase().replace(/\s/g, "").indexOf(filterValue) != -1);
  }

  private _checkWeather(city: string) {

    this.cityService.getCityWeather(city).subscribe(data => this.result = data);

  }
}
