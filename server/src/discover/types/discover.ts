
export type FilterType = {
    type?: "movie" | "tv";
    genreIds?: number[];
    sortBy?: string;
    minRating?: number;
    page: number;
    limit: number;
}

