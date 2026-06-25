"use client"
import GradientOverlay from "@/design-system/components/ui/overlay/GradientOverlay";
import WatchTrailer from "@/features/Interactions/components/ui/buttons/WatchTrailer";
import { TitleDetails } from "@/features/title/types/title";
import { genImageUrl } from "@/utils/url";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

import { useTranslations } from "next-intl";
import OverviewContainer from "@/features/title/components/ui/OverviewContainer";
import Link from "next/link";
const MotionBox = motion(Box);

type SlideProps = {
    slideItem: {
        rank: number,
        title: TitleDetails
    },
    active: boolean
}

export default function Slide({ slideItem: { rank, title }, active }: SlideProps) {
    const t = useTranslations("button")
    const url = genImageUrl(title.backdrop_path, "backdrop")

    return (
        <Link href={`en/title/${title.id}`}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    flex: "0 0 100%",
                    height: "100vh",
                    position: "relative",
                    overflow: "hidden",
                    userSelect: "none",
                    borderRadius: "20px",
                    padding: 5,
                    transition: "transform 0.5s",
                    transform: active ? "scale(1)" : "scale(0.7)",
                    transformOrigin: "center"
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        inset: 0
                    }} >
                    {url && <Image
                        src={url}
                        alt={`backdrop image ${title.title}`}
                        fill

                        quality={100}
                        style={{
                            objectFit: "cover",
                            objectPosition: "center",
                        }}

                    />}
                    <GradientOverlay />
                </Box>
                <Box
                    sx={{
                        display: "grid",
                        gap: 3,
                        maxWidth: "80%",
                        position: "relative",
                        zIndex: 10
                    }}>
                    <Typography variant="h1">
                        {title.title}
                    </Typography>
                    <OverviewContainer text={title.overview} maxLine={3} />
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,

                        }}
                    >
                        <WatchTrailer />
                    </Box>
                </Box>
            </Box>
        </Link>
    );
}