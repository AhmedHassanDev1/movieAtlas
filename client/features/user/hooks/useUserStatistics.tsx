import { useQuery } from "@tanstack/react-query";
import { GetMe } from "../api/client";
import { GetProfileStatistics } from "@/features/Interactions/api/interactions";

function useUserStatistics(userId:string) {
  return useQuery({
    queryKey: ["user profile statistics"],
    queryFn: ()=>GetProfileStatistics(userId),
    enabled:!!userId,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
}

export default useUserStatistics;