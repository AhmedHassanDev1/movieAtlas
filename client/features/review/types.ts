import { PaginationType } from "@/types/pagination";



export type ReviewType = {
    id: string;
    title_id: string;
    content: string;
    name: string;
    source: "LOCAL"|"IMDB";
    user_id: string;
    avatar_path: string | null;
};


export type ReviewsResponseType = {
    data: ReviewType[]
    meta: PaginationType
}