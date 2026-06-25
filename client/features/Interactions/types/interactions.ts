

export type InteractionsTitleStat = {
    watched: boolean;
    watchlist: boolean;
    rating: number;
}


export type RatingResponseType = {
    user_id: string
    title_id: string
    value: number
    createdAt: Date
}


export type WatchedResponseType = {
    user_id: string
    title_id: string
    createdAt: Date
}

export type ProfileStatisticsType = {
    reviews_count: number
    rating_count: number
    watchlist_count: number
    interests_count: number
    watched_count: number
}