import { PaginationType } from "@/types/pagination";
import { PersonType } from "./person";

export type TitleDetails = {
    id: string;
    type: "movie" | "series";
    original_title: string;
    title: string;
    tagline?: string;
    original_language: string;
    runtime?: number;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    release_date: string;
    media_type: string;

};

export type TitleResponseType = {
    data: TitleDetails[],
    meta: PaginationType
}

export type GenreType = {
    id: string
    name: string
}


export type CreditType = {
    job: string;
    person: PersonType;
}

export type ViewType = {
    details: TitleDetails;
    actors: CreditType[];
    directors: CreditType[];
    genres: GenreType[]
} 


export type TitleType = "movie" | "tv";

export type SortBy =
  | "popularity.desc"
  | "popularity.asc"
  | "rating.desc"
  | "rating.asc"
  | "releaseDate.desc"
  | "releaseDate.asc";

export interface GetTitlesParams {
  type?: TitleType;

  genreIds?: number[];

  sortBy?: SortBy;

  minRating?: number;

  page?: number;

  limit?: number;
}