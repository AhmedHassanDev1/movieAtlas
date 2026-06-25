


import { Typography, TypographyVariant } from '@mui/material'
import React from 'react'
type OverviewContainerProps = {
    variant?: TypographyVariant,
    text: string,
    maxLine?: number
}
function OverviewContainer({ text, maxLine = 3, variant }: OverviewContainerProps) {
    return (
        <Typography
            variant={variant || "h5"}
            sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: maxLine,
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: 400

            }}
        >
            {text}
        </Typography >
    )
}

export default OverviewContainer
