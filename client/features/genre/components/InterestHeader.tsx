



import { Box, Stack, Typography } from '@mui/material'
import { getGenreById } from '../api/server'
import { getTranslations } from 'next-intl/server'
import { grey } from '@mui/material/colors'
import { GenreType } from '../types'


async function InterestHeader({ genre }: { genre: GenreType }) {

    const t = await getTranslations("interest")

    return (
        <Stack sx={{
            padding: 2,
            background: grey[900],
            direction: "ltr"
        }}>
            <Typography variant='h3' >{genre?.name}</Typography>
            <Stack spacing={1} sx={{ padding: 2 }}>
                <Typography variant="h5" sx={{ color: 'secondary.main', fontWeight: 500 }}>{genre.about}</Typography>
            </Stack>

        </Stack>
    )
}

export default InterestHeader
