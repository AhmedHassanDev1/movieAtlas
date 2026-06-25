import { Box, Stack } from "@mui/material"
import { grey } from "@mui/material/colors"
import { ReactNode } from "react"


function layout({
    Header,
    children
}: {
    Header: ReactNode,
    children: ReactNode
}) {
    return (
        <Stack>
            <Box
            sx={{
                background:grey[900]
            }}>
                {Header}
            </Box>
            <Stack
                direction={"column"}
                spacing={3}
                sx={{
                    width: "100%",
                    minHeight: "100vh",
                    padding: 2
                }}>

                {children}

            </Stack>
        </Stack>
    )
}

export default layout
