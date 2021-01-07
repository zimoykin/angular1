export class BlogModel {

    title: string
    description: string
    image: string
    id: string
    user: Author
    tags: [string]
    place: Place
    created: string

  }

  export class Place {
    id: string
    title: string 
    description: string
    country: Country
  }

  export class PlaceFull {
    id: string
    title: string 
    description: string
    country: Country
    blogs: BlogModel[]
  }

  export class Country {
    id: string
    title: string 
    description: string
    place: [Place]
  }


  export class BlogDraft {
    title: string
    description: string
    place: string
    tags: string
  }

  export class Author {
    id: string
    username: string
  }