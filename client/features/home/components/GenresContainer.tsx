import CarouselContainer from "@/design-system/components/layout/CarouselContainer"
import SectionTitle from "@/design-system/components/ui/SectionTitle"
import { discoverGenres } from "@/features/genre/api/server"
import GenreCard from "@/features/genre/components/ui/GenreCard"
import { Box } from "@mui/material"





async function GenresContainer() {
    const data = await discoverGenres()
    const genres = data?.data
    if (!genres) return

    return (
        <Box>
            <SectionTitle title="title.genres"/>
            <CarouselContainer>
                {genres.map(el => (
                    <GenreCard key={el.id} item={el} />
                ))}

            </CarouselContainer>
        </Box>
    )
}

export default GenresContainer
