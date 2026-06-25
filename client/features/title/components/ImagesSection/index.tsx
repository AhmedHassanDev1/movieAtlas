import { Box, Grid, ImageList, ImageListItem, Stack } from "@mui/material"

import SectionTitle from "@/design-system/components/ui/SectionTitle"
import { ImagesReponseType } from "../../types/media"

import Image from "next/image"

async function getImages(titleId: string): Promise<ImagesReponseType> {
    const res = await fetch(`${process.env.API_URL}/title/${titleId}/images?limit=8`, {
        next: { revalidate: 3600 }
    })

    if (!res.ok) throw new Error("")
    const data = await res.json()
    return data
}
async function ImagesSection({ titleId }: { titleId: string }) {
    const data = await getImages(titleId);
    const images = data.data;

    if (!images.length) {
        return (
            <Stack spacing={2}>
                <SectionTitle title="title.images" />

                <Box
                    sx={{
                        aspectRatio: "16/9",
                        bgcolor: "grey.900",
                        borderRadius: 2,
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    No Images Available
                </Box>
            </Stack>
        );
    }

    return (
        <Stack spacing={2}>
            <SectionTitle title="title.images" />

            <Box
                sx={{
                    columnCount: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },
                    columnGap: 1.5,
                }}
            >
                {images.map((img) => (
                    <Box
                        key={img.id ?? img.url}
                        sx={{
                            breakInside: "avoid",
                            marginBottom: 1.5,
                            borderRadius: 2,
                            overflow: "hidden",
                            position: "relative",
                        }}
                    >
                        <Box
                            sx={{
                                position: "relative",
                                width: "100%",
                                aspectRatio: img.aspect_ratio || "16 / 9",
                            }}
                        >
                            <Image
                                src={img.url}
                                alt=""
                                fill
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    </Box>
                ))}
            </Box>
        </Stack>
    );
}

export default ImagesSection;