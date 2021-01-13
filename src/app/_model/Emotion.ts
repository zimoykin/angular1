import { UserPublic } from "./User";

export interface Emotion {
    user: UserPublic
    blog_id: string
    image: string //path
}
