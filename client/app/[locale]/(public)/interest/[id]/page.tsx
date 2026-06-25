

import { ParamsType } from '@/app/[locale]/(user)/user/[id]/page'
import Loading from '@/design-system/components/ui/loading'
import SectionTitle from '@/design-system/components/ui/SectionTitle'
import { getGenreById } from '@/features/genre/api/server'
import InterestHeader from '@/features/genre/components/InterestHeader'
import GenreTitlesSection from '@/features/genre/components/sections/GenreTitlesSection'
import { Stack, Typography } from '@mui/material'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export async function generateMetadata({ params }: ParamsType) {
  const { id } = await params
  if (!id) return
  try {
    const genre = await getGenreById(id);
    if (!genre) return

    return {
      title: `watch ${genre.name} - movie and tv`,
      description: genre.about,
      openGraph: {
        title: genre.name,
      },
    };
  } catch (error) {
    return;
  }
}

async function page({ params }: ParamsType) {
  const { id } = await params
  const genre = await getGenreById(id)

  if (!genre) return notFound()

  return (
    <Stack >
      <Suspense fallback={<Loading />}>
        <InterestHeader genre={genre} />
      </Suspense>
      <Stack sx={{ padding: 3 }} spacing={2}>


        <Stack>
          <SectionTitle title='title.movies&TV' />
          <GenreTitlesSection genreId={genre.tmdb_id} />
        </Stack>

      </Stack>
    </Stack>
  )
}

export default page
