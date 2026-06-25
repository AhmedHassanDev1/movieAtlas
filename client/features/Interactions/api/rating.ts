import { protectedApi } from "@/api";
import { RatingResponseType } from "../types/interactions";

export async function addRating({ titleId, value }: { titleId: string, value: number }): Promise<RatingResponseType> {
    return (await protectedApi.put(`/title/${titleId}/rating`, {
        value
    })).data
}


export async function removeRating({ titleId }: { titleId: string }) {
    return (await protectedApi.delete(`/title/${titleId}/rating`)).data
} 
