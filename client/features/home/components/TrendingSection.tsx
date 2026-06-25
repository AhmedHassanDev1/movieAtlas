


import React from 'react'
import CarouselContainer from '../../../design-system/components/layout/CarouselContainer'
import { Box } from '@mui/material'
import SectionTitle from '../../../design-system/components/ui/SectionTitle'
import { getDiscover } from '../api/discover'
import MovieCard from '@/features/title/components/ui/card/MovieCard'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link'


async function TrendingSection() {
    const data = await getDiscover("trending", 15)
    if (!data?.data) return
    const titles = data.data

    return (
        <Box component="section">
            <Link href={"/en/"}>
                <Box sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center"
                }}>
                    <SectionTitle title='title.trending' />
                </Box>
            </Link>
            <CarouselContainer>
                {titles.map(el => {
                    return <MovieCard
                        key={el.rank}
                        title={el.title}
                    />
                })}
            </CarouselContainer>
        </Box>
    )
}

export default TrendingSection
