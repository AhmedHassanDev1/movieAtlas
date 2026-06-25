import AddToWatchListButton from "@/features/Interactions/components/ui/buttons/WatchListButton"
import Poster from "@/features/title/components/ui/card/Poster"
import { TitleDetails } from "@/features/title/types/title"
import { GetFullYear, parseRunTime } from "@/utils/time"
import { genImageUrl } from "@/utils/url"
import { Box,  Stack, Typography } from "@mui/material"
import {  grey, yellow } from "@mui/material/colors"
import StarIcon from '@mui/icons-material/Star';
import { numberFormater } from "@/utils/number"
import RateButton from "@/features/Interactions/components/ui/buttons/RateButton"
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import Link from "next/link"
import { useLocale } from "next-intl"

function SearchResulteCard({ item }: { item: TitleDetails }) {
    const urlPoster = genImageUrl(item.poster_path, "small-poster")
    const locale=useLocale()
    return (
        <Link 
        href={`/${locale}/title/${item.id}`}
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            padding: 2,
            borderBottom: "1px solid",
            borderColor: grey[900]
        }}>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                }}>
                <Box
                    sx={{
                        position: "relative",
                        width: 84,
                        aspectRatio: "16/14"
                    }}>
                    <Poster url={urlPoster} />
                    <Box sx={{
                        position: "relative",
                        zIndex: 2
                    }}>
                        <AddToWatchListButton titleId={item.id} type="icon" />
                    </Box>
                </Box>

                <Stack spacing={1}>
                    <Typography variant="h6">{item.title}</Typography>
                    <Stack direction={"row"} spacing={2}>
                        {item?.release_date && (
                            <Typography variant="subtitle1" sx={{
                                paddingX:1
                            }}>{GetFullYear(item?.release_date)}</Typography>
                        )}
                        
                        {item?.runtime && (
                            <Typography variant="subtitle1">{parseRunTime(item?.runtime)}</Typography>
                        )}
                    </Stack>
                    <Stack>
                        <Stack spacing={1} direction={"row"} sx={{ alignItems: "center" }} >
                            {!!item?.vote_average && (
                                <Typography
                                    variant="subtitle1"
                                    sx={{
                                        display: "flex",
                                        alignItems: "center"
                                    }}
                                >
                                    <StarIcon sx={{ color: yellow[800] }} />
                                    {item.vote_average?.toFixed(1)}
                                </Typography>
                            )}

                            <Typography variant="subtitle1">
                                {item.vote_count && (
                                    numberFormater(item.vote_count)
                                )}
                            </Typography>
                            <RateButton size={18} onlyIcon={true} titleId={item.id} titleName={item.title} />

                        </Stack>
                    </Stack>
                </Stack>
            </Box>
           
        </Link>
    )
}

export default SearchResulteCard
