import { Expose } from "class-transformer"

export class GenreType {

    @Expose({name:"id"})
    tmdb_id: string

    @Expose()
    name: string

    @Expose()
    image: string

     @Expose()
    about: string
}