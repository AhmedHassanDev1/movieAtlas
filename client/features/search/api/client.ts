import { publicApi } from "@/api"
import { TitleResponseType } from "@/features/title/types/title"


export const searchTitles = async ({
    q,
    limit,
    page,
}: {
    q: string;
    limit?: number;
    page?: number;
}): Promise<TitleResponseType> => {
    const { data } = await publicApi.get("/search/titles", {
        params: { q, limit, page },
    });

    return data;
};