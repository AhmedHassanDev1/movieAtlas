"use client"

import { Chip, Stack } from '@mui/material'
import { GenreType } from '../../types/title'
import Link from 'next/link'
import { useLocale } from 'next-intl'


function GenresList({ genres }: { genres: GenreType[] }) {
  const locale = useLocale()
  return (
    <Stack direction={"row"} sx={{ gap: 3 }} >
      {genres.map(el => (
        <Link
          href={`/${locale}/interest/${el.id}`}
          key={el.id}

        >
          <Chip
            variant='outlined'
            label={el.name}
          />
        </Link>

      ))}
    </Stack>
  )
}

export default GenresList
