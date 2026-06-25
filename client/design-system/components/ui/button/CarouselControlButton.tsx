"use client";

import { Box, IconButton } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
type Props = {
    emblaApi: EmblaCarouselType | undefined;
    direction: "prev" | "next";
};

function CarouselControlButton({ emblaApi, direction }: Props) {
    const [canScroll, setCanScroll] = useState(false);

    const updateState = useCallback(() => {
        if (!emblaApi) return;

        if (direction === "prev") {
            setCanScroll(emblaApi.canScrollPrev());
        } else {
            setCanScroll(emblaApi.canScrollNext());
        }
    }, [emblaApi, direction]);

    useEffect(() => {
        if (!emblaApi) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        updateState();
        emblaApi.on("select", updateState);
        emblaApi.on("reInit", updateState);

        return () => {
            emblaApi.off("select", updateState);
            emblaApi.off("reInit", updateState);
        };
    }, [emblaApi, updateState]);

    const handleClick = () => {
        if (!emblaApi) return;

        if (direction === "prev") {
            emblaApi.scrollPrev();
        } else {
            emblaApi.scrollNext();
        }
    };

    return (
        <Box>
            <IconButton
                onClick={handleClick}
                disabled={!canScroll}
                sx={{
                    opacity: !canScroll ? 0.3 : 1,
                    transition: "0.2s",
                }}
            >
                {direction === "prev" ? <ArrowBackIcon/> : <ArrowForwardIcon/>}
            </IconButton>
        </Box>
    );
}

export default CarouselControlButton;