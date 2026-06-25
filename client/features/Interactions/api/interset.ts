import { protectedApi } from "@/api"


export async function addToInterest({ genreId }: { genreId: string }) {
    return (await protectedApi.post(`/intersets/${genreId}`)).data
}


export async function removeFromInterest({ genreId }: { genreId: string }) {
    return (await protectedApi.delete(`/intersets/${genreId}/`)).data
} 
