

import { Box } from '@mui/material'
import { blue } from '@mui/material/colors'


function Rank({ rank }: { rank: number }) {
    return (
        <Box
            component="span"
            sx={{
                width:"fit-content",
                background: blue[800],
                px:2,
                py:0.5,
                borderRadius:0.5,
                fontWeight:800,
                clipPath:"polygon(0 0, 100% 0%, 80% 100%, 0% 100%)"
            }} >
            #{rank}
        </Box>
    )
}

export default Rank
