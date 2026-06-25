import { Box, Typography } from "@mui/material"
import { GenreType } from "../../types"
import { genImageUrl } from "@/utils/url"
import Link from "next/link"
import { getLocale } from "next-intl/server"
import Image from "next/image"
import { grey } from "@mui/material/colors"



async function GenreCard({ item }: { item: GenreType }) {
    const genreUrl = genImageUrl(item.image, "poster")
    const locale = await getLocale()
    return (
        <Box
            sx={{
                flex: "0 0 auto",
                width: {
                    xs: 200,
                    sm: 250,
                    md: 320
                },
                aspectRatio: '3/2',
                background:grey[900],
                borderRadius:1,
                overflow:"hidden"
            }} >
            <Link
                href={`/${locale}/interest/${item.id}`}
                style={{
                    display: "grid",
                    gridTemplateRows: "1fr auto",
                    height:"100%"
                }}>


                <Box
                    sx={{
                        position: 'relative'
                    }} >
                    {(genreUrl && (
                        <Image
                            src={genreUrl}
                            fill
                            alt="genre image"
                            style={{
                                objectFit: "cover",
                                objectPosition: "center"
                            }}
                        />
                    ))}
                </Box>
                <Box
                sx={{
                    position:"relative",
                    p:1
                }}>
                  
                    <Typography variant="h6">{item.name}</Typography>
                </Box>

            </Link>
        </Box>
    )
}

export default GenreCard
