import { HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BlogModel, Country, Place } from '../_model/BlogModel'
import { Constants as K } from '../_model/Constants'
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from '../_services/resizeImage';
import { Http } from '../_services/http-service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-post-view',
  templateUrl: './edit-post-view.component.html',
  styleUrls: ['./edit-post-view.component.scss']
})
export class EditPostViewComponent implements OnInit {

  blogObj?: BlogModel
  isRequestSend: boolean

  public file: any
  files: [File]
  imagePathPlanet = K.imagePath

  uploadProgress$: Subject<number> = new BehaviorSubject(0);

  myControlPlace = new FormControl();
  myControlCountry = new FormControl();
  placeid: string
  countryid: string

  places: Place[]
  countries: Country[]
  filteredPlaces: Observable<Place[]>
  filteredCountry: Observable<Country[]>
  selected: string

  imagePreview$: Subject<string> = new BehaviorSubject(`${environment.server}images/system/imageSelect.jpg`);

  constructor(
    private route: ActivatedRoute, 
    private httpClient: Http, 
    private sanitizer: DomSanitizer) { }


  ngOnInit(): void {

    this.httpClient.get<Country[]>(
      `api/countries`)
      .then( (val)  => {
      console.log(val.body)
      this.countries = val.body
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
    })
    .subscribe((val) => {
      if (val != 'new') {
  
          this.uploadProgress$.next (1)

          this.httpClient.get<BlogModel>(`api/blogs/id?blogid=${val}`)
            .then( (val) => {
            
              this.blogObj = val.body;
              (<HTMLInputElement>document.getElementById('place')).value = val.body.place.title;
              (<HTMLInputElement>document.getElementById('country')).value = val.body.place.country.title;
              this.placeid = val.body.place.id
              this.countryid = val.body.place.country.id
              this.uploadProgress$.next (0)
              console.log(val.body.image)
              if (val.body.image != '') {
                this.imagePreview$.next(val.body.image)
              }
            })
          }}
      )
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

  async save(title: string, description: string, tags: string) {

    console.log(this.file)
    this.uploadProgress$.next ( this.files != undefined ? this.files.length : 1 )

    if (this.blogObj != null) {

      this.httpClient.put<BlogModel>(`api/blogs?blogid=${this.blogObj.id}`,
        JSON.stringify({
          title: title, description: description, placeId: this.placeid, tags: tags
        })
        )
        .then( async (val) => {
          await this.uploadFiles(val.body).then ( () => {
            this.uploadProgress$.next(0)
            window.location.href = '/home'
          })
        })

    } else {
      
      this.httpClient.post<BlogModel>(
        `api/blogs/`, 
        JSON.stringify({title: title, description: description, placeId: this.placeid, tags: tags})
        )
        .then( async (resp) => {
          await this.uploadFiles(resp.body).then ( () => {
            this.uploadProgress$.next(0)
            window.location.href = '/home'
          })
        })
    }
  }

  private async uploadFiles(blog: BlogModel): Promise<void> {

    console.log("start load " + blog.title);

    console.log('update here')
    return await new Promise<void>( async response => {
      if( this.files == undefined) {
        response()
        return
      }
      for (let item of this.files) {
        await this.uploadPhoto(blog.id, item, item.name == this.file.name)
        .then(() => {
          //alert("file loaded: " + item.name);
        })
      }
      response()
    }
    )
  }

  delete() {
    if (confirm("Are you sure to delete blog?")) {
      console.log("delete confirmed here");
      this.httpClient.delete (`api/blogs?blogid=${this.blogObj.id}`
      )
        .then(response => {
          console.log(response)
        })

    }
  }

  private async uploadPhoto(blogid: string, file: File, asMain: boolean) : Promise <void> {

    let end = new Promise<void>( (response) => {

      if (blogid != undefined && file != undefined) {

        console.log(file.name)
        console.log(asMain)
  
        let imgService = new ImageService()
        imgService.resizeImage(file)
          .then(resizedFile => {
            const data = new FormData();
            data.append('file', resizedFile);
            data.append('filename', file.name);
            this.httpClient.post<BlogModel>(
              `api/blogs/uploads?blogid=${blogid}&asMain=${asMain}`,
              null,
              data, 
              ).then( (val) => {
                  console.log(val);
                  response()
                }
              );
          })
          .catch(error => {
            alert(error)
            response()
          })
      } else { 
        response()
      }

    })

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

    this.files = file
    console.log(this.files)

    this.imagePreview$.next(window.URL.createObjectURL(this.file))
  }

  getSafeURL(val: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(val)
  }

  isMobile() : boolean {
    return K.isMobile()
  }
}

