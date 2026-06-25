"use client"
import Image from "next/image";
import { Box, Skeleton, Stack } from "@mui/material";
import { genImageUrl } from "@/utils/url";
import { useState } from "react";

type PosterProps = {
    url: string | null;
    title?: string;
};

function Poster({ url, title }: PosterProps) {
    const [isLoading, setLoading] = useState(true)
    const [error, setError] = useState(false);
    const posterUrl =
        !error && url
            ? genImageUrl(url, "poster")
            : "/images/poster-placeholder.webp";

    return (
        <Stack
            sx={{
                position: "relative",
                width: "50%",
                aspectRatio: "2 / 3",
                borderRadius: 2,
                background: "secondary.main",
                bgcolor: "grey.900",
                cursor:"pointer"
            }}
        >
            {posterUrl ? (
                <   >
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,

                            backgroundImage: `url(${posterUrl})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",

                            filter: "blur(25px)",
                            transform: "scale(1.1)",

                            opacity: .4
                        }}
                    >

                    </Box>
                    <Image
                        src={posterUrl}
                        alt={title ? `${title} poster` : "Movie poster"}
                        fill
                        onLoadingComplete={() => setLoading(false)}
                        onError={() => setError(true)}
                        sizes="250px"
                       className=" hover:scale-110 duration-200"
                        style={{
                            objectFit: "cover",
                            borderRadius: "inherit",

                        }}
                    />
                    {isLoading && <Skeleton
                        variant="rectangular"
                        width={"100%"}
                        height={"100%"}
                    />}
                </>
            ) : (
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "text.secondary",
                        fontSize: 14,
                    }}
                >
                    No Image
                </Box>
            )}

        </Stack>
    );
}

export default Poster;