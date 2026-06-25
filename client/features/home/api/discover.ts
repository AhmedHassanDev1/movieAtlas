import { DiscoverResponse, DiscoverType } from "@/types/discover"


export async function getDiscover(type: DiscoverType, limit?: number): Promise<DiscoverResponse | undefined> {
    limit = limit || 5
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/discover/${type}?limit=${limit}`, {
            next: {
                revalidate: 3600
            }
        })
        const data = await res.json()
        return data
    } catch (error) {

    }
}