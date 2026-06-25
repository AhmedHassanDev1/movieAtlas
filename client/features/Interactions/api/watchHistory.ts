import { protectedApi } from "@/api"
import { WatchedResponseType } from "../types/interactions"


export async function markAsWatched({ titleId }: { titleId: string }): Promise<WatchedResponseType> {
    return (await protectedApi.put(`/title/${titleId}/watched`)).data
}


export async function removeWatched({ titleId }: { titleId: string }) {
    return (await protectedApi.delete(`/title/${titleId}/watched`)).data
} 
