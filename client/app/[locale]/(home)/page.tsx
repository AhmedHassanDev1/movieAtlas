import TrendingSection from "@/features/home/components/TrendingSection";
import { getDiscover } from "@/features/home/api/discover";
import Hero from "@/features/home/components/hero";

import { Stack } from "@mui/material";
import { Suspense } from "react";
import MovieCardSkeletonGroup from "@/features/title/components/ui/Skeleton/movieCardSkeleton";
import TopRatedSection from "@/features/home/components/TopratedSection";
import GenresContainer from "@/features/home/components/GenresContainer";
import NowPlaySection from "@/features/home/components/NowPlaySection";


export default async function Home() {
  const HeroContent = await getDiscover("upcoming", 5)


  return (
    <Stack
      direction={"column"}
      spacing={3}
      sx={{
        width: "100%",
        
        minHeight: "100vh",
        padding: 2
      }}
    >
      <Hero data={HeroContent?.data} />
   
      {/* trending section */}
      <Suspense fallback={<MovieCardSkeletonGroup />}>
        <TrendingSection />
      </Suspense>

      <Suspense fallback={<MovieCardSkeletonGroup />}>
        <TopRatedSection />
      </Suspense>

       <Suspense fallback={<MovieCardSkeletonGroup />}>
        <GenresContainer />
      </Suspense>
    
     <Suspense fallback={<MovieCardSkeletonGroup />}>
        <NowPlaySection />
      </Suspense>


    </Stack>
  );
}
