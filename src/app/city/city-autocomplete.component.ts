import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

export interface City {
  name: string;
}


@Component({
  selector: 'app-city-autocomplete',
  templateUrl: './city-autocomplete.component.html',
  styleUrls: ['./city-autocomplete.component.css']
})

export class CityAutocompleteComponent implements OnInit {
  myControl = new FormControl();
  
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
  }

  displayFn(city?: City): string | undefined {
    return city ? city.name : undefined;
  }

  private _filter(name: string): City[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}