import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Country, Place } from "../_model/BlogModel";
import { Constants as K } from "../_model/Constants";
import { map, startWith, filter } from "rxjs/operators";
import { Http, Param } from "../_services/http-service.service";

@Component({
  selector: "app-location-view",
  templateUrl: "./location-view.component.html",
  styleUrls: ["./location-view.component.scss"],
})
export class LocationViewComponent implements OnInit {
  myControl = new FormControl();
  countries: Country[];
  filtred: Observable<Country[]>;

  selected: string = "";
  willCreateNew: string = "";

  places: Place[];

  load = false;

  constructor(private http: Http) {}

  ngOnInit(): void {
    this.load = true;
    //api/countries/list
    this.updateCountryList();
  }

  private updateCountryList() {
    this.$getCountriesList()
      .then((val) => {
        this.countries = val;
        this.load = false;

        this.filtred = this.myControl.valueChanges.pipe(
          startWith(""),
          map((value) => this._filter(value))
        );
      })
      .catch((error) => {
        alert(error);
      });
  }

  selectedCountry(title: string) {
    if (title == undefined) {
      this.selected = "";
      this.places = undefined;
      return;
    }

    if (this.selected == title) {
      return;
    }

    console.log("selectedCountry: " + title);
    let country: Country = this.countries.filter((val) => {
      return val.title.toLowerCase() === title.toLowerCase();
    })[0];

    console.log(country);
    if (country != undefined) {
      this.selected = country.id;
      console.log(country);

      this.updatePlaceList();
    } else {
      console.log("country not found");
      this.selected = "";
      this.places = undefined;
    }
  }

  private updatePlaceList() {
    this.places = undefined;

    if (this.selected == "") {
      return;
    }

    this.http
      .get<[Place]>(`api/places/search`, [
        new Param("field", "country_id"),
        new Param("value", this.selected),
      ])
      .then((val) => {
        console.log(val);
        this.places = val.body;
      });
  }

  $getCountriesList(): Promise<Country[]> {
    return new Promise<Country[]>((resolve, reject) => {
      this.http
        .get<Country[]>(`api/countries/list`, [])
        .then((response) => {
          resolve(response.body);
        })
        .catch(() => {
          this.load = false;
          console.log("catch");
        })
        .finally(() => {
          this.load = false;
          console.log("finally");
        });
    });
  }

  clear() {
    this.selected = "";
    this.places = undefined;
    (<HTMLInputElement>document.getElementById("country")).value = "";
    this.updateCountryList();
    return;
  }

  private;
  _filter(value: string): Country[] {
    return this.countries.filter((val) => {
      return val.title.toLowerCase().includes(value.toLowerCase());
    });
  }

  addNewCountry() {
    this.willCreateNew = "country";
    this.selected = "";
    (<HTMLInputElement>document.getElementById("country")).value = "";
  }

  //C R E A T E
  saveCountryPlace(
    val: boolean,
    title?: string,
    description?: string,
    longitude?: string,
    latitude?: string
  ) {
    if (this.willCreateNew == "place") {
      if (val && this.selected != "") {
        this.http
          .post<Place>(
            `api/places/`,
            JSON.stringify({
              title: title,
              description: description,
              longitude: parseFloat(longitude),
              latitude: parseFloat(latitude),
              countryId: this.selected,
            })
          )
          .then( (val) => {
            this.willCreateNew = "";
            this.places = undefined;

            this.updateCountryList();
            this.updatePlaceList();
          });
      } else {
        this.willCreateNew = "";
      }
    } else if (this.willCreateNew == "country") {
      console.log("create country!");

      if (val) {

        this.http
          .post<Country>( `api/countries/`, JSON.stringify({ title: title, description: description })
          ).then( (val) => {
            this.willCreateNew = "";
            this.updateCountryList();
          });

      } else {
        this.willCreateNew = "";
        this.willCreateNew = this.willCreateNew;
      }
    } else {
      this.willCreateNew = "";
    }
  }

  addNewPlace() {
    if (this.selected != "") {
      this.willCreateNew = "place";
    }
  }

  isMobile(): boolean {
    return K.isMobile();
  }
}
