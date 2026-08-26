
import { Box, Typography } from '@mui/material'
import React from 'react'
import { ThreeDot } from 'react-loading-indicators'

function loading() {
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            minHeight: "50vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            p: 4
        }} >
            <ThreeDot variant="pulsate" color="#3b82f6" size="medium" />
            <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, letterSpacing: 1 }}>
                LOADING...
            </Typography>
        </ Box>
    )
}

export default loading
