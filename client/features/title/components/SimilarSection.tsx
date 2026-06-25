


import { Box, Stack } from '@mui/material'

import { getTitleSimilars } from '../api/server'
import CarouselContainer from '@/design-system/components/layout/CarouselContainer'
import MovieCard from './ui/card/MovieCard'
import SectionTitle from '@/design-system/components/ui/SectionTitle'

async function SimilarSection({ titleId }: { titleId: string }) {
    
    const titles = await getTitleSimilars(titleId)
   if (!titles?.length) return
    return (
        <Stack>
            <SectionTitle title='title.similarTitles'/>
            <CarouselContainer>
                {titles?.map(el => (
                    <MovieCard key={el.id} title={el} />
                ))}
            </CarouselContainer>
        </Stack>
    )
}

export default SimilarSection
