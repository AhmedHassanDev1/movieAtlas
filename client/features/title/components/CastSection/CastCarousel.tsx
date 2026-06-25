"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useCallback } from "react"
import { CastType } from "../../types/person"
import PersonCard from "./PersonCard"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useLocale } from "next-intl"
function CastCarousel({ data }: { data: CastType[] }) {
  const locale = useLocale()

  const dir = locale == "ar" ? "rtl" : "ltr"
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    direction: dir,

    axis: "x",

  })

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative">

      {/* left button */}
      <button
        onClick={scrollPrev}
        className="
          absolute left-0 top-1/2 -translate-y-1/2
          z-10 text-white bg-black/50 px-3 py-2
          hover:bg-red-500/30 transition
        "
      >
        <ArrowBackIosNewIcon />
      </button>

      {/* right button */}
      <button
        onClick={scrollNext}
        className="
          absolute right-0 top-1/2 -translate-y-1/2
          z-10 text-white bg-black/50 px-3 py-2
          hover:bg-red-500/30 transition
        "
      >
        <ArrowForwardIosIcon />
      </button>

      {/* viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {data.map((el) => (
            <div
              key={el.person.id}
              className="
                flex-[0_0_70%]
                sm:flex-[0_0_45%]
                md:flex-[0_0_35%]
                lg:flex-[0_0_25%]
                xl:flex-[0_0_20%]
                      "
            >
              <PersonCard person={el} />
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default CastCarousel