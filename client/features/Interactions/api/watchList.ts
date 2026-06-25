import { protectedApi } from "@/api"



export async function addToWatchList({ titleId }: { titleId: string }) {
    return (await protectedApi.put(`/title/${titleId}/watchlist`)).data
}


export async function deleteFromWatchList({ titleId }: { titleId: string }) {
    return (await protectedApi.delete(`/title/${titleId}/watchlist`)).data
} 
