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
    email: string
    username: string
    id: string
    createdAt: string
    blogs: BlogModel[]
  }

  export class UserPublic {
    image: string
    username: string
    id: string
  }