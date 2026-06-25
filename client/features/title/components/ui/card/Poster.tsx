import { genImageUrl } from "@/utils/url"
import { Box } from "@mui/material"
import { grey } from "@mui/material/colors"
import Image from "next/image"



function Poster({ url }: { url: string | null }) {
    const posterUrl = genImageUrl(url, "poster")
    return (
        <Box
            sx={{
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                bgcolor: grey[900],
                overflow: "hidden"
            }}>
            {posterUrl && (
                <Image
                    src={posterUrl}
                    alt="image poster"
                    fill
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        transition:"transform 0.3s"
                    }}
                />
            )}
        </Box>
    )
}

export default Poster
