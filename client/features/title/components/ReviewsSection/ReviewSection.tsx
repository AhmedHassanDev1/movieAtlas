import { Box } from "@mui/material"
import SectionReviewsHeader from "./sectionReviewsHeader"
import { getReviews } from "@/features/review/api/server"
import ReviewCard from "@/features/review/components/ui/button/ReviewCard"
import CarouselContainer from "@/design-system/components/layout/CarouselContainer"





async function ReviewSection({ titleId }: { titleId: string }) {
    const data = await getReviews(titleId, 5)
    const reviews = data.data
 
    if (!reviews.length) return
    return (
        <Box
            component={"section"}
            sx={{}}>
            <SectionReviewsHeader />
            <CarouselContainer>
                {reviews.map(el => (
                    <Box
                        key={el.id}
                        sx={{
                            flex: "0 0 auto",
                        }}>
                        <ReviewCard review={el} />
                    </Box>
                ))}
            </CarouselContainer>
        </Box>
    )
}

export default ReviewSection
