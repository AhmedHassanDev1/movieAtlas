import { GetMe } from "@/features/user/api/client"
import { useQuery } from "@tanstack/react-query"




function useAuth() {
  return useQuery({
    queryKey: ["me"],
    queryFn: GetMe,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });
}

export default useAuth;