
import MovieCardSkeletonGroup from "@/features/title/components/ui/Skeleton/movieCardSkeleton"
import RatingSection from "@/features/user/components/sections/RatingSection"
import WatchListSection from "@/features/user/components/sections/watchListSection"
import { Box } from "@mui/material"

import { Suspense } from "react"


export type ParamsType = {
  params: Promise<{ id: string }>

}

async function page({ params }: ParamsType) {
  const { id } = await params

  return (   
    <Box>
      <Suspense fallback={<MovieCardSkeletonGroup />}>
        <RatingSection userId={id} />
      </Suspense>
      
      <Suspense fallback={<MovieCardSkeletonGroup />}>
        <WatchListSection userId={id} />
      </Suspense>
    </Box>


  )
}

export default page
