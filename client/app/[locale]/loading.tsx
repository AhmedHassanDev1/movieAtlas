


import { Box } from '@mui/material'
import React from 'react'
import { ThreeDot } from 'react-loading-indicators'

function loading() {
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2
        }} >
            <ThreeDot variant="pulsate" color="#505050" size="medium" />
        </ Box>
    )
}

export default loading
