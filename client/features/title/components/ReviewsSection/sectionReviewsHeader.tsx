

import SectionTitle from '@/design-system/components/ui/SectionTitle'
import { Box } from '@mui/material'
import AddReviewButton from '../../../review/components/ui/button/AddReviewButton'

function SectionReviewsHeader() {
    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
            <Box>
                <SectionTitle title="title.sectionReviewsTitle" />
            </Box>
            <Box>
                <AddReviewButton />
            </Box>
        </Box>
    )
}

export default SectionReviewsHeader
