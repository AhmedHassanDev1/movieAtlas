import { ReviewsResponseType } from "../types"


export async function getReviews(title_id: string, limit?: number, page?: number): Promise<ReviewsResponseType> {
    try {
        limit = limit || 20
        page = page || 1
        const res = await fetch(`${process.env.API_URL}/title/${title_id}/reviews?limit=${limit}&page=${page}`, {
            cache: "no-store"
        })

        if (!res.ok) {
            throw new Error("Failed to fetch reviews");
        }
        const data = await res.json()
        return data
    } catch (error) {
        throw error;
    }
}

