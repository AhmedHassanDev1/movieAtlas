import { protectedApi, publicApi } from "@/api";
import { InteractionsTitleStat, ProfileStatisticsType } from "../types/interactions";

export async function getTitleStat(titleId: string): Promise<InteractionsTitleStat> {
    return (await protectedApi.get(`/interaction/${titleId}/stat`)).data
} 


export const GetProfileStatistics = async (userId: string): Promise<ProfileStatisticsType> => {
    return (await publicApi.get(`interaction/${userId}/user`)).data
}
