import { PartialType } from "@nestjs/swagger"
import { Expose } from "class-transformer"


export class TitleEntity {
    @Expose()
    id: string

    @Expose()
    title: string

    @Expose()
    original_title: string

    @Expose()
    original_language: string

    @Expose()
    tagline: string

    @Expose()
    overview: string

    @Expose()
    release_date: string

    @Expose()
    media_type: string

    @Expose()
    poster_path: string

    @Expose()
    backdrop_path: string

    @Expose()
    popularity: number

    @Expose()
    vote_average: number

    @Expose()
    vote_count: number

    @Expose()
    runtime: number

}


export class ImageAssetDTO {
    @Expose()
    id: string

    @Expose()
    url: string

    @Expose()
    type: string

    @Expose()
    width: number

    @Expose()
    height: number

    @Expose()
    aspect_ratio: number
}

export class VideoAssetDTO {
    @Expose()
    id: string

    @Expose()
    url: string

    @Expose()
    name: string

    @Expose()
    size: number

    @Expose()
    site: string

    @Expose()
    published_at: string
}

export class TitleSimilarReponseDTO extends PartialType(TitleEntity) {
    commonGenres: number
    score: number
}