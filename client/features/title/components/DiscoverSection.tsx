"use client"
import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { GetTitlesParams } from "../types/title";
import { getTitles } from "../api/client";
import { Box, Grid, Stack } from "@mui/material";
import MovieCard from "./ui/card/MovieCard";
import { InfiniteScrollTrigger } from "@/design-system/components/layout/InfiniteScroll/InfiniteScrollTrigger";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { ThreeDot } from "react-loading-indicators";

type DiscoverSectionProps = {
    queryKey: QueryKey;
    params: Omit<GetTitlesParams, "page" | "limit">;
};

function DiscoverSection({
    queryKey,
    params,
}: DiscoverSectionProps) {
    const {
        data,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: [...queryKey, params],

        queryFn: ({ pageParam }) =>
            getTitles({
                ...params,
                page: pageParam,
                limit: 20,
            }),

        initialPageParam: 1,

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
        return <Box sx={{ width: "100%", display: "flex", justifyContent: "center", p: 2 }} >
            <ThreeDot variant="pulsate" color="#505050" size="medium" />
        </ Box>
    }
    return (
        <Stack spacing={2}>

            <Grid spacing={2} container>
                {titles?.map(el => (
                    <Grid key={el.id} size={{ xs: 6, md: 3 }}>
                        <MovieCard title={el} />
                    </Grid>
                ))}
            </Grid >
            <InfiniteScrollTrigger
                innerRef={loadMoreRef}
                isLoading={isFetchingNextPage}
                hasNextPage={hasNextPage}
            />
        </Stack>
    )
}

export default DiscoverSection