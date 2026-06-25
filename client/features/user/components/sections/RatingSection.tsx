import SectionTitle from "@/design-system/components/ui/SectionTitle"
import { Box, Typography } from "@mui/material"
import { getUserTitleInteraction } from "../../api/server"
import CarouselContainer from "@/design-system/components/layout/CarouselContainer"
import MovieCard from "@/features/title/components/ui/card/MovieCard"
import { getTranslations } from "next-intl/server"


async function RatingSection({ userId }: { userId: string }) {
    const t = await getTranslations("title")

    const data = await getUserTitleInteraction(userId, "rating", 10)

    const titles = data?.data
    if (!titles || !titles.length) {
        return (
            <Box sx={{
                width: "100%",
                height: "1/1",
            }}>
                <SectionTitle title={"interaction.rating"} />
                <Typography sx={{
                    padding: 5,
                    color:"secondary.main",
                    fontWeight:500
                }}
                    align='center'
                    variant="h5">{t("noRatingYet")}</Typography>
            </Box>
        )
    }
    return (
        <Box>
            <SectionTitle title={"interaction.rating"} />
            <CarouselContainer>
                {titles.map(el => (
                    <MovieCard key={el.id} title={el} />
                ))}
            </CarouselContainer>
        </Box>
    )
}

export default RatingSection
