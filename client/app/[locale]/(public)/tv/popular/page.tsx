





import DiscoverSection from '@/features/title/components/DiscoverSection'
import { Stack, Typography } from '@mui/material'
import { getTranslations } from 'next-intl/server'


async function page() {
    const t= await getTranslations("")
    return (
        <Stack spacing={3} sx={{padding:2}}>
            <Typography variant='h1'>{t("title.mostPopularTV")}</Typography>
            <DiscoverSection
                queryKey={["top-rated","tv"]}
                params={{
                    type:"tv",
                    sortBy: "popularity.desc",
                }}
            />
        </Stack>
    )
}

export default page
