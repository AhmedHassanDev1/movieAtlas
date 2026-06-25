
import ReviewSection from "@/features/title/components/ReviewsSection/ReviewSection"
import CastSection from "@/features/title/components/CastSection"
import CastSkeletonGroup from "@/features/title/components/CastSection/CastSkeleton"
import ImagesSection from "@/features/title/components/ImagesSection"

import TitleHeroSection from "@/features/title/components/titleHeroSection"
import VideoSection from "@/features/title/components/videoSection"

import { Box, Stack } from "@mui/material"

import { Suspense } from "react"
import { getTitle, getTitleView } from "@/features/title/api/server"
import { genImageUrl } from "@/utils/url"
import SimilarSection from "@/features/title/components/SimilarSection"


type Props = {
  params: Promise<{ id: string }>

}

export async function generateMetadata({ params }: Props) {
  const { id } = await params
  if (!id) return
  try {
    const title = await getTitle(id);
    if (!title) return
    const poster = genImageUrl(title?.poster_path, "poster")
    const backdrop = genImageUrl(title?.backdrop_path, "backdrop")
       
    return {
      title: `${title.title} - Watch Details | Movie Atlas`,
      description: title.overview,
      openGraph: {
        title: title.title,
        images: [poster,backdrop],
      },
    };
  } catch (error) {
    return;
  }
}



async function page({ params }: Props) {
  const { id } = await params
  const view = await getTitleView(id)


  return (

    <Box sx={{width:"100%",minHeight:"100vh"}}>
      {/* Hero section */}
      <TitleHeroSection data={view} />

      <Box sx={{
        position: "relative",
        maxWidth: "1200px",
        mx: "auto",
        padding: 2,
        overflow: "hidden"
      }}>

        {/* Cast Title */}
        <Suspense fallback={<CastSkeletonGroup />}>
          <CastSection titleId={id} />
        </Suspense>

        {/* title vidoes  */}
        <Suspense fallback={<CastSkeletonGroup />}>
          <VideoSection titleId={id} />
        </Suspense>

        {/* title images  */}

        <Suspense fallback={<CastSkeletonGroup />}>
          <ImagesSection titleId={id} />
        </Suspense>

        {/* reviews */}
        <Suspense fallback={<CastSkeletonGroup />}>
          <ReviewSection titleId={id} />
        </Suspense>

        {/* similar title*/}

        <Suspense fallback={<CastSkeletonGroup />}>
          <SimilarSection titleId={id} />
        </Suspense>
      </Box>

    </Box>
  )
}

export default page

