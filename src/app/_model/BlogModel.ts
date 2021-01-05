import { User } from './User';

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
  export class Country {
    id: string
    title: string 
    description: string
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