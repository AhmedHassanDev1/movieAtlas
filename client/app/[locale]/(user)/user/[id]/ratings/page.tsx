"use client"

import { InfiniteScrollTrigger } from "@/design-system/components/layout/InfiniteScroll/InfiniteScrollTrigger"
import MovieCard from "@/features/title/components/ui/card/MovieCard"
import { getUserTitleInteraction } from "@/features/user/api/client"
import useUserStatistics from "@/features/user/hooks/useUserStatistics"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { Box, Grid, Stack, Typography } from "@mui/material"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { ThreeDot } from "react-loading-indicators"


function Page() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: stat } = useUserStatistics(id as string)
  const t = useTranslations("")

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["rating", id],
    queryFn: ({ pageParam }) => getUserTitleInteraction({ userId: id, type: "rating", limit: 5, page: pageParam }),
    initialPageParam: 1,
    enabled: !!id,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage
        ? lastPage.meta.page + 1
        : undefined,
  });
  const loadMoreRef = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  })
  const titles = data?.pages.flatMap(el => el.data)

  if (isLoading) {
    return <Box sx={{ marginX: "auto" }} >
      <ThreeDot variant="pulsate" color="#505050" size="medium" />
    </ Box>
  }
  return (
    <Stack sx={{ width: "100%" }}>
      <Typography variant="h5" sx={{ fontWeight: 500 }}>{stat?.rating_count} {t("title.titles")}</Typography>
      <Grid spacing={2} container>
        {titles?.map(el => (
          <Grid key={el.id} size={{ xs: 6, md: 3 }}>
            <MovieCard title={el} />
          </Grid>
        ))}
      </Grid>
      <InfiniteScrollTrigger
        innerRef={loadMoreRef}
        isLoading={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    </Stack>
  )
}

export default Page
