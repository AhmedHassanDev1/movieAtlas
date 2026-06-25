"use client"
import { Box, Stack } from "@mui/material"
import useEmblaCarousel from 'embla-carousel-react'
import CarouselControlButton from "@/design-system/components/ui/button/CarouselControlButton"
import Slide from "./HeroSlide"
import { TitleDetails } from "../../../title/types/title"
import { useEffect, useState } from "react"
import { grey } from '@mui/material/colors';
import { useLocale } from "next-intl"
type HeroProps = {
    rank: number,
    title: TitleDetails

}

function Hero({ data }: { data: HeroProps[] | undefined }) {
    const titles = data
 const locale = useLocale()

  const dir = locale === "ar" ? "rtl" : "ltr"
    const [emblaRef, emblaApi] = useEmblaCarousel({
       direction:dir,
        axis: "x",
        loop: false,
        align: "center",
        skipSnaps: false
    });

    const [scrollProgress, setScrollProgress] = useState(0)

    const [activeIndex, setActiveIndex] = useState(0);


    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            const index = emblaApi.selectedScrollSnap()
            setActiveIndex(index);

            if (titles?.length) {
                setScrollProgress((index / (titles?.length - 1)) * 100)
            }
        };

        emblaApi.on("select", onSelect);
        onSelect();
    }, [emblaApi]);

    if (!titles) return;

    return (
        <Stack>
            <Box
                component="section"
                sx={{
                    height: "85vh",
                    width: "100%",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                {/* VIEWPORT */}
                <Box
                    ref={emblaRef}
                    sx={{
                        height: "100%",
                        overflow: "hidden",
                    }}
                >
                    {/* TRACK */}
                    <Box
                        sx={{
                            display: "flex",
                            height: "100%",
                            flexDirection: "row",
                        }}
                    >
                        {titles.map((slide, index) => (
                            <Box
                                key={slide.rank}
                                sx={{
                                    flex: "0 0 100%",
                                    height: "100vh",
                                    px: 1.5
                                }}
                            >
                                <Slide
                                    slideItem={slide}
                                    active={index === activeIndex}
                                />
                            </Box>
                        ))}
                    </Box>
                </Box>

            </Box>
            <Box
                sx={{
                    width: "15%",
                    height: "5px",
                    borderRadius: "20px",
                    backgroundColor: grey[900],
                    marginY: 5,
                    marginX: "auto",
                    overflow: "hidden"
                }} >
                <Box
                    sx={{
                        width: `${scrollProgress}%`,
                        height: "100%",
                        bgcolor: "white",
                        transition: "0.3s cubic-bezier(0.33, 1, 0.68, 1)"
                    }}></Box>
            </Box>
        </Stack>
    )
}

export default Hero
