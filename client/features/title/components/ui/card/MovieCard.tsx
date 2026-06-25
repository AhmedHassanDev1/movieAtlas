"use client"
import { TitleDetails } from '@/features/title/types/title'
import { genImageUrl } from '@/utils/url'
import { Box, Paper, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import Image from 'next/image'
import Link from 'next/link'
import WatchListButton from '../../../../Interactions/components/ui/buttons/WatchListButton'
import { GetFullYear, parseRunTime } from '@/utils/time'
import WatchTrailer from '../../../../Interactions/components/ui/buttons/WatchTrailer'
import Rate from './Rate'

import RateButton from '@/features/Interactions/components/ui/buttons/RateButton'
import { useLocale } from 'next-intl'

function MovieCard({ title }: { title: TitleDetails }) {
  const posterUrl = genImageUrl(title.poster_path, "poster")
  const runtime = parseRunTime(title?.runtime)
  const local = useLocale()
  return (
    <Paper
      sx={{
        flex: "0 0 auto",
        width:"100%",
        maxWidth:350,
        aspectRatio: "2 / 3",
        borderRadius: "0px 10px 10px 10px",
        overflow: "hidden",
        cursor: "pointer",
        background: grey[900],
        userSelect: "none",
        position: "relative",
        "&:hover img": {
          transform: "scale(1.05)",
        },
      }}
    >
      <Link
        href={`/${local}/title/${title.id}`}
        scroll={true}
      >
        {posterUrl && (
          <Image
            src={posterUrl}
            fill
            alt={`poster image for ${title.title}`}
       
            style={{
              objectFit: "cover",
              objectPosition: "center",
              transition: "0.3s ease",

            }}
          />
        )}

        {/* Content */}
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            bottom: 0,
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexDirection: "column",
            justifyContent: "flex-end",
            p: 2,
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,.2)",
            transition: "0.3s ease",
          }}
        >


          <Typography
            variant='h5'
            sx={{ width: "100%" }}
          >
            {title.title || title.original_title}
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 1,

            }} >
            <Rate rate={title.vote_average} />
            {title.release_date && (
              <Typography>
                {GetFullYear(title.release_date)}
              </Typography>
            )}
            {runtime && (
              <Typography variant='subtitle1'>
                {runtime}
              </Typography>
            )}

            <RateButton
              titleId={title.id}
              onlyIcon={true}
              titleName={title.title}
            />

          </Box>
          <WatchTrailer />
        </Box>

      </Link>
      <Box
        sx={{
          position: "absolute",
          insetInlineStart: 0,
          top: 0,
        }}>
        <WatchListButton
          titleId={title.id}
          type='icon'
        />
      </Box>

    </Paper>
  )
}

export default MovieCard
