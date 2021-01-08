import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BlogDraft, BlogModel, Country, Place } from '../_model/BlogModel'
import { Authorization } from '../_services/AuthrizationService'
import { Constants as K } from '../_model/Constants'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-post-view',
  templateUrl: './edit-post-view.component.html',
  styleUrls: ['./edit-post-view.component.scss']
})
export class EditPostViewComponent implements OnInit {

  blogObj?: BlogModel
  isRequestSend: boolean

  public file: any
  imagePathPlanet = K.imagePath

  myControlPlace = new FormControl();
  myControlCountry = new FormControl();
  placeid: string
  countryid: string

  places: Place[]
  countries: Country[]
  filteredPlaces: Observable<Place[]>
  filteredCountry: Observable<Country[]>
  selected: string

  imagePreview$: Subject<string> = new BehaviorSubject(`${K.server}images/system/imageSelect.jpg`);

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private cookieService: CookieService, private sanitizer: DomSanitizer) { }
  auth = new Authorization(this.cookieService, this.httpClient)

  ngOnInit(): void {

    this.httpClient.get<Country[]>(`${K.server}api/countries`, {
      headers: { Authorization: this.auth.token }
    }).subscribe(countries => {
      console.log(countries)
      this.countries = countries
      this.filteredCountry = this.myControlCountry.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCountry(value))
        );

      this.places = new Array<Place>()

      this.countries.map(country => {
        country.place.map(place => {
          this.places.push(place)
        })
      })

      this.filteredPlaces = this.myControlPlace.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterPlace(value))
        );

      console.log(this.places)

    })

    const blogid = new Observable<string>(obser => {
      this.route.paramMap.subscribe((param) => {
        obser.next(param.get('blogid'))
      })
    }).subscribe((val) => {
      if (val != 'new') {
        if (this.auth.isJwtOk) {
          this.httpClient.get<BlogModel>(`${K.server}api/blogs/id?blogid=${val}`,
            {
              headers:
                { Authorization: this.auth.token }
            })
            .subscribe((blogObject: BlogModel) => {
              console.log(blogObject)
              this.blogObj = blogObject;
              (<HTMLInputElement>document.getElementById('place')).value = blogObject.place.title;
              (<HTMLInputElement>document.getElementById('country')).value = blogObject.place.country.title;
              this.placeid = blogObject.place.id
              this.countryid = blogObject.place.country.id
              console.log (blogObject.image)
              if (blogObject.image != '') {
                this.imagePreview$.next(blogObject.image)
              }
            })
        }
      } //
      else {
        console.log('111')
        if (localStorage.getItem('blog')) {
          let draft = JSON.parse(localStorage.getItem('blog')) as BlogDraft
          let title = document.getElementById('title') as HTMLInputElement
          title.value = draft.title
          let description = document.getElementById('description') as HTMLInputElement
          description.value = draft.description
          let place = document.getElementById('place') as HTMLInputElement
          place.value = draft.place
          let tags = document.getElementById('tags') as HTMLInputElement
          tags.value = draft.tags
        }
      }
    })


  }

  getTags(blog: BlogModel): string { return '#' + blog.tags.join(' #') }

  clear() {
    let title = document.getElementById('title') as HTMLInputElement
    title.value = ''
    let description = document.getElementById('description') as HTMLInputElement
    description.value = ''
    let place = document.getElementById('place') as HTMLInputElement
    place.value = ''
    let tags = document.getElementById('tags') as HTMLInputElement
    tags.value = ''
  }

  save(title: string, description: string, tags: string) {

    const headers = new HttpHeaders({
      'Authorization': this.auth.token,
      'Content-Type': 'application/json'
    })

    console.log(this.file)

    if (this.blogObj != null) {
     
      console.log('update here')
      this.httpClient.put<BlogModel>(`${K.server}api/blogs?blogid=${this.blogObj.id}`,
        JSON.stringify({
          title: title, description: description, placeId: this.placeid, tags: tags
        }),
        { headers: headers })
        .subscribe((blog) => {
          console.log ('upload start')
          this.uploadPhoto(blog).subscribe ( () => { 
            window.location.href = '\home'
          })
          //window.location.href = '\home'
        })

    } else {
      console.log('create new here')
      this.httpClient.post<BlogModel>(`${K.server}api/blogs/`,
        JSON.stringify({
          title: title, description: description, placeId: this.placeid, tags: tags
        })
        , { headers: headers })
        .subscribe((blog: BlogModel) => {
          if (blog != undefined) {
            this.uploadPhoto(blog).subscribe ( () => {
              window.location.href = '\home'
            })
            //
          }
        })
    }
  }

  delete() {
    if (confirm("Are you sure to delete blog?")) {
      console.log("delete confirmed here");
      this.httpClient.delete(`${K.server}api/blogs?blogid=${this.blogObj.id}`,
        {
          observe: 'response',
          headers: this.auth.jwtHeader()
        }
      )
        .subscribe(response => {
          console.log(response)
          if (response.status == 200) {
            window.location.href = '/home'
          } else {
            alert(response.statusText)
          }
        })

    }
  }

  private uploadPhoto(blog: BlogModel): Observable<void> {
    
    let end = new Observable<void>((obser) => {

      if (blog != undefined && this.file != undefined) {
       
        const data = new FormData();
        data.append('file', this.file);
        data.append('filename', this.file.name);
        this.httpClient.post<BlogModel>(`${K.server}api/blogs/uploads?blogid=${blog.id}`, data, {headers: this.auth.jwtHeader()})
        .subscribe(
            (val) => {
              console.log(val);
              obser.next()
            }
          );
      } else {
        obser.next()
      }
    }
    )

    return end

  }

  private _filterPlace(value: string): Place[] {
    console.log("_filterPlace" + value)
    return this.places.filter((val) => {
      return val.title.toLowerCase().includes(value.toLowerCase())
    }
    )
  }
  private _filterCountry(value: string): Country[] {
    console.log("_filterCountry" + value)
    return this.countries.filter((val) => {
      return val.title.toLowerCase().includes(value.toLowerCase())
    }
    )
  }

  draft(title: string, description: string, place: string, tags: string) {
    console.log(title)
    localStorage.setItem("blog", JSON.stringify({
      title: title,
      description: description,
      place: place,
      tags: tags
    }))
  }

  selectedPlace($event: string) {
    console.log($event)
    this.placeid = ''

    let filtred = this.places.filter(val => {
      return val.title === $event
    })

    if (filtred.length > 0) {
      this.placeid = filtred[0].id;
    }
  }

  selectedCountry($event: string) {
    console.log($event)
    this.countryid = ''

    let filtred = this.countries.filter(val => {
      return val.title === $event
    })

    if (filtred.length > 0) {
      this.countryid = filtred[0].id
      this.places = filtred[0].place
      this.filteredPlaces = this.myControlPlace.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterPlace(value))
        );

      if ((<HTMLInputElement>document.getElementById('place')).value != '')
        console.log("check selected place")
      {

        console.log(
          this.places.filter(val => {
            return val.title == (<HTMLInputElement>document.getElementById('place')).value
          }).length
        )
        if (this.places.filter(val => {
          return val.title == (<HTMLInputElement>document.getElementById('place')).value
        }).length == 0) {
          console.log("check selected place 2");
          (<HTMLInputElement>document.getElementById('place')).value = ''
        }
      }

    }

  }


  fileBrowseHandler(files) {
    this.prepareFilesList(files);
  }


  prepareFilesList(file: [any]) {

    this.file = file[0]
    console.log(this.file)

    // let safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl( URL.createObjectURL(this.file));
    // let sanitizedUrl = this.sanitizer.sanitize(SecurityContext.RESOURCE_URL, safeUrl);
    // console.log (sanitizedUrl)
    this.imagePreview$.next(window.URL.createObjectURL(this.file))
  }

  getSafeURL(val: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(val)
  }

}

