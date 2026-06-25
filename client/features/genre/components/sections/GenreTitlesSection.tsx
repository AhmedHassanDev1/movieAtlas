"use client"

import { InfiniteScrollTrigger } from "@/design-system/components/layout/InfiniteScroll/InfiniteScrollTrigger";
import { getTitles } from "@/features/title/api/client";
import MovieCard from "@/features/title/components/ui/card/MovieCard";
import { SortBy, TitleType } from "@/features/title/types/title";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Box, Grid, MenuItem, Select, SelectChangeEvent, Stack, Tab, Tabs, Typography } from "@mui/material"
import { useInfiniteQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ThreeDot } from "react-loading-indicators";


function GenreTitlesSection({ genreId }: { genreId: number }) {
    const t = useTranslations("")
    const [value, setValue] = useState(0);
    const [sortBy, setSordBy] = useState<SortBy>("popularity.desc");
    const [type, setType] = useState<TitleType | "all">("all");

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        switch (newValue) {
            case 1:
                setSordBy("rating.desc")
                break;

            default:
                setSordBy("popularity.desc")
                break;
        }
    };
    const handleChangeType = (e: SelectChangeEvent) => {
        setType(e.target.value as TitleType | "all")
    }
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["get titles by genre", genreId, "sortBy", sortBy, "type", type],
        queryFn: ({ pageParam }) => getTitles({
            genreIds: [genreId],
            limit: 10,
            page: pageParam,
            sortBy,
            ...(type != "all" && { type })
        }),
        initialPageParam: 1,
        enabled: !!genreId,
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
    if (!titles || !titles.length) {
        return <Box sx={{
            width: "100$",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: 2
        }}>
            <Typography variant="h4">No content found matching your current filters.</Typography>
        </Box>
    }
    return (
        <Stack spacing={2}>
            <Stack spacing={2} direction={"row"} sx={{ borderBottom: 1, borderColor: 'divider', padding: 2 }}>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={type}
                    onChange={handleChangeType}
                    label="Age"
                >
                    <MenuItem value={"all"}>
                        ALL
                    </MenuItem>
                    <MenuItem value={"movie"}>Movie</MenuItem>
                    <MenuItem value={"tv"}>TV</MenuItem>

                </Select>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Popular" />
                    <Tab label="top rating" />
                </Tabs>
            </Stack>
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

export default GenreTitlesSection
