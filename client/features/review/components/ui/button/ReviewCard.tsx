"use client"
import { ReviewType } from "@/features/review/types"
import OverviewContainer from "@/features/title/components/ui/OverviewContainer"
import { genImageUrl } from "@/utils/url"
import { Avatar, Box, Card, Divider, Stack, Typography } from "@mui/material"
import Image from "next/image"

function ReviewCard({ review }: { review: ReviewType }) {
    const profileImage = genImageUrl(review.avatar_path, "person")
    return (
        <Card
            sx={{
                position: "relative",
                overflow: "hidden",

                width: "100%",
                maxWidth: "356px",
                height:"100%",
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.1)",

                p: 3,

                "&::before": {
                    content: '""',
                    position: "absolute",

                    width: 250,
                    height: 250,

                    right: -100,
                    bottom: -100,

                    borderRadius: "50%",

                    background: (theme) =>
                        `radial-gradient(
                                    circle,
                                    ${theme.palette.primary.main} 0%,
                                    ${theme.palette.primary.main}80 25%,
                                    ${theme.palette.primary.main}20 50%,
                                    transparent 75%
                                    )`,


                    filter: "blur(50px)",

                    zIndex: 0,
                },


                "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,

                    backdropFilter: "blur(30px)",
                    WebkitBackdropFilter: "blur(30px)",

                    background: "rgba(255,255,255,.02)",

                    zIndex: 1,
                },
            }}
        >
            <Box
                sx={{
                    position: "relative",
                    width: "100%",
                    overflow: "hidden",
                    zIndex: 2,
                }}
            >
                <Stack direction={"row"} sx={{ justifyContent: "space-between" }}>
                    <Box sx={{
                        display: 'flex',
                        gap: 1,
                        marginY: 1
                    }}>
                        {profileImage ? (
                            <Avatar src={profileImage} sx={{ width: 56, height: 56 }} />
                        ) : (
                            <Avatar sx={{ width: 56, height: 56 }}>
                                {review.name.charAt(0)}
                            </Avatar>
                        )}
                        <Typography sx={{ padding: 1 }} variant="h6">{review.name}</Typography>
                    </Box>
                    {review.source == "LOCAL" ? (
                        <Image
                            src="/app_Logo.svg"
                            width={40}
                            height={30}
                            alt="imdb logo"
                            style={{ objectFit: "cover" }} />
                    ) : (
                        <Image
                            src="/IMDB_Logo.svg"
                            width={40}
                            height={20}
                            alt="imdb logo" />
                    )}
                </Stack>
                <Divider />
                <Box sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    overflow: "hidden",
                }}>
                    <OverviewContainer maxLine={3} text={review.content} />


                </Box>
            </Box>
        </Card>
    )
}

export default ReviewCard
