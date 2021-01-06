import { BlogModel } from "./BlogModel"

  export class User {
    image: string
    username: string
    refreshToken: string
    accessToken: string
    id: string
  }

  export class UserFullInfo {
    image: string
    username: string
    id: string
    blogs: BlogModel[]
  }