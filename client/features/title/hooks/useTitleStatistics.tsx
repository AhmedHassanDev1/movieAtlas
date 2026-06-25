"use client";

import { getTitleStat } from "@/features/Interactions/api/interactions";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

function useTitleStatistics(titleId: string) {
  const { data: user, isLoading: authLoading } = useAuth();

  const isEnabled =
    Boolean(user?.id) &&
    typeof titleId === "string" &&
    titleId.length > 0 &&
    !authLoading;

  return useQuery({
    queryFn: () => getTitleStat(titleId),
    queryKey: ["title-stat", titleId],
    enabled: isEnabled,
    refetchOnWindowFocus: false,
  });
}

export default useTitleStatistics;