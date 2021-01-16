import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Country, Place } from '../_model/BlogModel';
import { Authorization } from '../_services/AuthrizationService';
import { Constants as K } from '../_model/Constants'
import { map, startWith, filter} from 'rxjs/operators';
import { Http, Param } from '../_services/httpClient';

@Component({
  selector: 'app-location-view',
  templateUrl: './location-view.component.html',
  styleUrls: ['./location-view.component.scss']
})
export class LocationViewComponent implements OnInit {

  myControl = new FormControl()
  countries: Country[]
  filtred: Observable<Country[]>

  selected: string = ''
  willCreateNew: string = ''

  places: Place[]

  load = false

  constructor(private httpClient: HttpClient, private cookie: CookieService) { }
  auth = new Authorization(this.cookie, this.httpClient)
  http = new Http(this.cookie, this.httpClient)

  ngOnInit(): void {
    this.load = true
    //api/countries/list
    this.updateCountryList()

  }

  private updateCountryList() {
    this.$getCountriesList().subscribe( (val) => {
      this.countries = val;
      this.load = false;

      this.filtred = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value =>  this._filter(value))
        );

    });
  }

  selectedCountry(title: string) {

    if (title == undefined) {
      this.selected = ''
      this.places = undefined
      return;
    }

    if (this.selected == title) {
      return;
    }

    console.log("selectedCountry: " + title)
    let country: Country = this.countries.filter((val) => {
      return val.title.toLowerCase() === title.toLowerCase()
    })[0]

    console.log(country)
    if (country != undefined) {
      this.selected = country.id
      console.log(country)

      this.updatePlaceList();
    } else { console.log('country not found'); this.selected = ''; this.places = undefined }


  }

  private updatePlaceList() {

    this.places = undefined

    if (this.selected == '') {
      return
    }

    this.http.get<[Place]>(
        `${K.server}api/places/search`,
        [new Param("field", "country_id"), new Param("value", this.selected)]
      ).then(val => {
        console.log(val)
        this.places = val.body;
      })
  }


  $getCountriesList(): Observable<Country[]> {

    return new Observable<Country[]> ( (obser) =>  {
      this.http.get <Country[]> (`${K.server}api/countries/list`, [] )
      .then ( (response) => { 
        obser.next(response.body) })
      .catch ( () =>  { 
        this.load = false 
        console.log ('catch')
      })
      .finally ( () => { 
        this.load = false 
        console.log ('finally')
      })
    } ) 
  }

  clear() {
      this.selected = ''
      this.places = undefined;
      (<HTMLInputElement>document.getElementById('country')).value = '';
      this.updateCountryList()
      return;
  }

  private
  _filter(value: string): Country[] {
    return this.countries.filter((val) => {
      return val.title.toLowerCase().includes(value.toLowerCase())
    }
    )
  }

  addNewCountry() {
    this.willCreateNew = 'country'
    this.selected = '';
    (<HTMLInputElement>document.getElementById('country')).value = ''
  }

  //C R E A T E 
  saveCountryPlace(val: boolean, title?: string, description?: string) {

    console.log(title)
    console.log(this.willCreateNew)

    if (this.willCreateNew == 'place') {

      if (val && this.selected != '') {

        this.httpClient.post<Place>(`${K.server}api/places/`, JSON.stringify({ title: title, description: description, countryId: this.selected }),
          { headers: new HttpHeaders({ 'Authorization': this.auth.token, 'Content-Type': 'application/json' }) }).subscribe((val) => {
            this.willCreateNew = ''
            this.places = undefined

            this.updateCountryList()
            this.updatePlaceList()
          })
      } else {
        this.willCreateNew = ''
      }

    } else if (this.willCreateNew == 'country') {

      console.log ('create country!')

      if (val) {
        this.httpClient.post<Country>(`${K.server}api/countries/`, JSON.stringify({ title: title, description: description }),
          { headers: new HttpHeaders({ 'Authorization': this.auth.token, 'Content-Type': 'application/json' }) }).subscribe((val) => {
            this.willCreateNew = ''
            this.updateCountryList();
          })
      } else {
        this.willCreateNew = ''
        this.willCreateNew = this.willCreateNew
      }

    } else {
      this.willCreateNew = ''
    }

  }

  addNewPlace() {
    if (this.selected != '') {
      this.willCreateNew = 'place'
    }
  }

  isMobile () : boolean {
    return K.isMobile()
  }

}
