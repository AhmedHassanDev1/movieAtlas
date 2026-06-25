import { publicApi } from "@/api";
import { GetTitlesParams } from "../types/title";



export const getTitles = async (
    params: GetTitlesParams
) => {

    const response = await publicApi.get(
        "/discover/titles",
        {
            params: {
                ...params,

                genreIds: params.genreIds?.join(","),
            },
        }
    );

    return response.data;
};

