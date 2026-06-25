import Link from "next/link";
import { TitleDetails } from "../../../types/title";
import { Box, Grid, Paper,Typography } from "@mui/material";
import ToggleWatchButton from "../../../../Interactions/components/ui/buttons/WatchButton";
import OverviewContainer from "../OverviewContainer";
import Poster from "./Poster";
import Rank from "./Rank";
import { GetFullYear, parseRunTime } from "@/utils/time";
import Rate from "./Rate";
import { grey } from "@mui/material/colors";
import { getLocale } from "next-intl/server";



export default async function LandscapeCard({ item:{rank,title} }: { item: { rank: number, title: TitleDetails } }) {
     const local =await getLocale()
   
    return (
        <Paper
            key={rank}
            sx={{
                flex: "0 0 auto",
                width: {
                    xs: "100%",
                    md: "calc(97%/2)",
                    lg: "calc(97%/3)"
                },
                maxHeight: 300,
                aspectRatio: "3 /2.5 ",
                borderRadius: 1,
                overflow: "hidden",
                cursor: "pointer",
                background: grey[900],
                userSelect: "none",
                position: "relative",
                "&:hover img": {
                    transform: "scale(1.05)",
                },
            }}>
            <Link href={`/${local}/title/${title.id}`}>
                <Grid
                    container
                    spacing={3}
                    sx={{
                        width: "100%",
                        height: "100%",
                        p: 1
                    }}>
                    <Grid
                        size={6}
                        sx={{
                            position: 'relative',
                            borderRadius: 0.5
                        }}
                    >
                        <Poster url={title.poster_path} />
                    </Grid>
                    <Grid
                        size={6}
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: 1
                        }}>
                        <Rank rank={rank} />
                        <Typography
                            variant="h6"
                            sx={{ mb: 2 }}>
                            {title.title || title.original_title}
                        </Typography>
                        <Box>
                            {title.release_date && (
                                <Typography variant="subtitle2">
                                    {GetFullYear(title.release_date)}
                                </Typography>
                            )}

                            {title.runtime && (
                                <Typography variant="subtitle2">
                                    {parseRunTime(title.runtime)}
                                </Typography>
                            )}
                        </Box>
                        <Box>
                            {title.vote_average && < Rate rate={title.vote_average} />}
                        </Box>
                        <OverviewContainer
                            variant="body2"
                            maxLine={2}
                            text={title.tagline || title.overview}
                        />
                        <ToggleWatchButton titleId={title.id} />
                    </Grid>
                </Grid>
            </Link>
        </Paper>
    )
}
