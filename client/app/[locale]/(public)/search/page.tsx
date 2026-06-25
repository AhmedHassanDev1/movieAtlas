

import SectionTitle from '@/design-system/components/ui/SectionTitle'
import SearchResulteContainer from '@/features/search/components/SearchResulteContainer';
import {  Stack, Typography } from '@mui/material'


type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};


async function Page({ searchParams }: Props) {

  const { q } = await searchParams;

  return (
    <Stack spacing={{
      xs: 3,
      md: 5
    }} sx={{ padding: 3 }}>
      <Typography variant='h2'>Search &quot;{q}&quot;</Typography>
      <Stack>
        <SectionTitle title='title.titles' />
        {!!q?.trim()?.length && (
          <SearchResulteContainer q={q?.trim()} />
        )}
      </Stack>
     
    </Stack>
  )
}

export default Page
