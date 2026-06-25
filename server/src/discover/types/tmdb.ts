

export type TmdbDiscoverItem = {
    id: number;
    tmdb_id: string
    media_type: "Movie" | "TV"
    title?: string;
    name?: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    original_language: string;
    original_title: string;
    original_name: string;
    genre_ids: number[]
    adult: boolean
    vote_average: number;
    popularity: number;
    vote_count: number;
    release_date?: string;
    first_air_date?: string;

}

export interface TmdbDiscoverResponse {
    page: number;
    results: TmdbDiscoverItem[];
    total_pages: number;
}

export type TmdbGenre = {
    id: number;
    name: string;
}

export type TmdbImage = {
    file_path: string;
    width?: number;
    height?: number;
    aspect_ratio?: number;
}

export type TmdbVideo = {
    key: string;
    name: string;
    size?: number;
    site: string;
    published_at?: string;
}

export type TmdbReview = {
    id: string;
    author?: string;
    content: string;
    created_at?: string;
    author_details?: {
        name?: string;
        username?: string;
        avatar_path?: string;
    };
}

export type TmdbCreditPerson = {
    id: number;
    name: string;
    popularity?: number;
    profile_path?: string;
    known_for_department?: string;
}

export type TmdbCastCredit = TmdbCreditPerson & {
    character?: string;
    order?: number;
}

export type TmdbCrewCredit = TmdbCreditPerson & {
    department?: string;
    job?: string;
}

export type TmdbMovieDetailsResponse = {
    id: number;
    title?: string;
    original_title?: string;
    original_language?: string;
    overview?: string;
    tagline?: string;
    homepage?: string;
    imdb_id?: string;
    poster_path?: string;
    backdrop_path?: string;
    popularity?: number;
    vote_average?: number;
    vote_count?: number;
    adult?: boolean;
    release_date?: string;
    runtime?: number;
    status?: string;
    genres?: TmdbGenre[];
    images?: {
        posters?: TmdbImage[];
        backdrops?: TmdbImage[];
    };
    videos?: {
        results?: TmdbVideo[];
    };
    reviews?: {
        results?: TmdbReview[];
    };
    credits?: {
        cast?: TmdbCastCredit[];
        crew?: TmdbCrewCredit[];
    };
}

export type TmdbPersonDetailsResponse = TmdbCreditPerson & {
    biography?: string;
    birthday?: string;
}
