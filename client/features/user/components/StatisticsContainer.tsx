

import GridViewIcon from '@mui/icons-material/GridView';
import { Typography, Grid } from '@mui/material'
import { GetProfileStatistics } from '@/features/Interactions/api/interactions'
import { useQuery } from '@tanstack/react-query'
import { grey } from '@mui/material/colors'
import { useTranslations } from 'next-intl';
import useUserStatistics from '../hooks/useUserStatistics';
function StatisticsContainer({ userId }: { userId: string }) {
    const { data } = useUserStatistics(userId)
    const t = useTranslations("interaction")
    const gridItemStyle = {
        padding: {
            xs: 1,
            md: 2
        },
        background: grey[800],
        borderRadius: 0.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    }
    return (
        <Grid container
            rowSpacing={1}
            columnSpacing={{ xs: 1, md: 2 }}
            sx={{
                width: {
                    xs: "100%",
                    md: "auto"
                }
            }}
        >
            <Grid
                size={{ xs: 3, md: 6 }}
                sx={gridItemStyle}>
                <Typography variant='h6'>{t("rating")}</Typography>
                <Typography variant='h5'>{data?.rating_count}</Typography>
            </Grid>
            <Grid
                size={{ xs: 3, md: 6 }}
                sx={gridItemStyle}>
                <Typography variant='h6'>{t("watchList")}</Typography>
                <Typography variant='h5'>{data?.watchlist_count}</Typography>
            </Grid>
            <Grid
                size={{ xs: 3, md: 6 }}
                sx={gridItemStyle}>
                <Typography variant='h6'>{t("reviews")}</Typography>
                <Typography variant='h5'>{data?.reviews_count}</Typography>
            </Grid>
            <Grid
                size={{ xs: 3, md: 6 }}
                sx={gridItemStyle}>
                <Typography variant='h6'>{t("more")}</Typography>
                <GridViewIcon sx={{ fontSize: 25 }} />
            </Grid>
        </Grid>
    )
}

export default StatisticsContainer
