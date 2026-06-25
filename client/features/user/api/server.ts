import { getCookieHeader } from "@/api/server"
import { TitleResponseType } from "@/features/title/types/title"
import { cookies } from "next/headers"

export const getUserTitleInteraction = async (
    userId: string,
    type: "rating" | "watchlist" | "watched",
    limit = 20,
    page = 1
): Promise<TitleResponseType | undefined> => {
    try {
        const res = await fetch(`${process.env.API_URL}/user/${userId}/${type}?limit=${limit}&page=${page}`, {
            cache: "no-store",

        })
        return await res.json()
    } catch (error) {

    }
}
