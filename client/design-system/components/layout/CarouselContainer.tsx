"use client"

import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import CarouselControlButton from '../ui/button/CarouselControlButton'
import { Box, useTheme } from '@mui/material'
import { ReactNode } from 'react'
import { useLocale } from 'next-intl'

type CarouselContainerType = {
    options?: EmblaOptionsType,
    children: ReactNode
}
function CarouselContainer({ options, children }: CarouselContainerType) {
    const locale = useLocale()
const theme = useTheme();

const isRTL = theme.direction === "rtl";
    const dir = locale == "ar" ? "rtl" : "ltr"
    const [emblaRef, emblaApi] = useEmblaCarousel({
        direction: dir,
        axis: "x",
        skipSnaps: true,
        ...options
    })
    return (
        <Box
            ref={emblaRef}
            sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
                userSelect: "none",
                padding: 2,
             
            }}>
            <Box
                sx={{
                    display: "flex",
                    width: "100%",
                    height: "100%",
                    gap: 2
                }}>
                {children}
            </Box>
            <Box

                sx={{
                    position: "absolute",
                    insetInlineEnd: 2,
                    top: "50%",
                    translate: "0% -50%",
                    zIndex: 20,
                       transform:isRTL?"rotate(180deg)":"rotate(0deg)"
                }}>
                <CarouselControlButton emblaApi={emblaApi} direction="next" />
            </Box>
            <Box

                sx={{
                    position: "absolute",
                    insetInlineStart: 2,
                    top: "50%",
                    translate: "0% -50%",
                    zIndex: 20,
                     transform:isRTL?"rotate(180deg)":"rotate(0deg)"
                }}>
                <CarouselControlButton emblaApi={emblaApi} direction="prev" />
            </Box>
        </Box>
    )
}

export default CarouselContainer
