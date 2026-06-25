import SectionTitle from "@/design-system/components/ui/SectionTitle"
import { Box, Grid, Typography } from "@mui/material"
import Link from "next/link"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { getDiscover } from "../api/discover";
import { getTranslations } from "next-intl/server";
import LandscapeCard from "@/features/title/components/ui/card/LandscapeCard";

async function TopratedSection() {
    const data = await getDiscover("popular", 3)
    const t = await getTranslations();
    if (!data?.data) return
    const titles = data.data
    return (
        <Box component="section" >
            <Link href={"/en/"}>

                <Box sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center"
                }}>
                    <SectionTitle title='title.topRated' />
                
                </Box>
                <Typography variant="subtitle2">

                </Typography>
            </Link>

            <Grid container columns={3} spacing={2} >
                {titles.map(({ rank, title }) => (
                    <LandscapeCard
                        key={rank}
                        item={{ rank, title }}
                    />
                ))}
            </Grid>
            <Link href={""}>
                <Typography
                    variant="h6"
                    sx={{
                        width: "25%",
                        gap: 1,
                        border: "1px solid",
                        color: "#5799ef",
                        textAlign: "center",
                        padding: 2,
                        my: 2,
                        mx: "auto",
                        borderRadius: "20px",
                    }}>{t("button.seeMore")}</Typography>
            </Link>
        </Box >
    )
}

export default TopratedSection
