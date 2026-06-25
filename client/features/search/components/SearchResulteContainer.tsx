"use client"

import { Box, Button, Stack, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ThreeDot } from "react-loading-indicators"
import { searchTitles } from '../api/client'

import SearchResulteCard from './SearchResulteCard'
import SearchNotFound from './NotFoundSearchResultes'
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
function SearchResulteContainer({ q }: { q: string }) {

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,

  } = useInfiniteQuery({
    queryKey: ["search", q],
    queryFn: ({ pageParam = 1 }) => searchTitles({ q, limit: 5, page: pageParam }),
    initialPageParam: 1,
    enabled: !!q.trim(),
    getNextPageParam: (lastPage) => {
      return lastPage.meta.hasNextPage
        ? lastPage.meta.page + 1
        : undefined;
    },
  });


  
  if (isLoading) {
    return <Box sx={{ marginX: "auto" }} >
      <ThreeDot variant="pulsate" color="#505050" size="medium" />
    </ Box>
  }
  const titles =
    Array.from(
      new Map(
        data?.pages
          .flatMap(page => page.data)
          .map(item => [item.id, item])
      ).values()
    );
  if (!titles.length) {
    return <SearchNotFound/>
  }

  return (
    <Stack
      spacing={2}
      sx={{
        padding: 2,
        border: "1px solid",
        borderColor: grey[900]
      }}>
      {titles?.map(el => {
        return <SearchResulteCard key={el.id} item={el} />
      })}
      <Button
        variant="text"
        disabled={!hasNextPage}
        loading={isFetchingNextPage}
        onClick={() => fetchNextPage()}
      >
        <Typography variant='h6'>
          More machers
        <AllInclusiveIcon sx={{mx:1}}/>
        </Typography>
      </Button>
    </Stack>
  )
}

export default SearchResulteContainer
