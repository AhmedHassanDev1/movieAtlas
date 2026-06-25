

import { Box, Grid, Stack, Typography } from "@mui/material"
import { ViewType } from "../../types/title"
import BackDrop from "./BackDrop"
import GradeIcon from '@mui/icons-material/Grade';
import TitleActionButton from "./TitleActionButton";
import Divider from '@mui/material/Divider';
import GenresList from "./GenresList";
import Poster from "./Poster";
import RateButton from "../../../Interactions/components/ui/buttons/RateButton";
import {Fragment} from "react";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

async function TitleHeroSection({ data }: { data: ViewType|null }) {
  if(!data) return notFound()
  const { details } = data
  const { overview, release_date, media_type, vote_average } = details
  const directors = data.directors.map(el => el.person.name)
  const actors = data.actors.map(el => el.person.name)
  const release_year = (new Date(release_date)).getFullYear()
  const t =await getTranslations("title")


  return (
    <Box component={"section"} sx={{ position: "relative", width: "100wh", minHeight: "100vh" }}>
      <BackDrop url={details.backdrop_path} />
      <Grid container
        sx={{
          minHeight: "90vh",
          position: "relative",
          placeItems: "end",
          padding: 2,
          gap: 3,
          zIndex: 10
        }} >

        {/* Title  Poster*/}
        <Grid
          size={{ xs: 12, lg: 5 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Poster url={details.poster_path} />
        </Grid>

        {/* Title details */}
        <Grid
          size={{ xs: 12, lg: 6 }}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Typography
            variant="h6"
            color="secondary"
            sx={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <Box
              component={"div"}
              sx={{
                width: "60px",
                height: "3px",
                backgroundColor: "primary.main",
              }}>
            </Box>
            Movie Atlas .  A Film by {directors.join(".")}
          </Typography>
          <Typography variant="h1" sx={{ fontWeight: 500 }}>{details.title}</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }} >
            <Typography
              variant="subtitle1"
              sx={{ color: "white", }} >{release_year}
            </Typography>
            <Box component="span"
              sx={{
                width: 5,
                height: 5,
                borderRadius: 2,
                backgroundColor: "secondary.main",
              }} ></Box>
            <Typography
              variant="subtitle1"
              color="secondary"
              sx={{ border: "0.1px solid", fontWeight: 600, padding: 0.5, borderRadius: "20%" }}>
              {media_type}
            </Typography>

            <Dot />
            <Typography
              variant="subtitle1"
              color="secondary"
              sx={{ fontWeight: 600, padding: 0.5 }}>
              <GradeIcon color="primary" sx={{ mx: 0.5 }} />
              {vote_average.toFixed(1)}
            </Typography>

            <Dot />
            <RateButton
              titleId={data.details.id}
              onlyIcon={false}
              titleName={data.details.title}
            />
          </Box>
          <GenresList genres={data.genres} />
          <Typography
           variant="h5" 
           color="secondary"
           sx={{fontWeight:400}}
           >{overview}</Typography>
          <TitleActionButton titleId={data.details.id} />
          <Divider orientation="horizontal" />
          <Box>
            <Stack
              direction={"row"}
              sx={{
                gap: 2,
                alignItems: "center"
              }}>
              <Typography
                variant="subtitle2"
                color="secondary"
                sx={{ fontWeight: 500,textTransform:"uppercase"  }}
              >
                  {t("directors")}
              </Typography>
              {directors.slice(0, 2).map((el, ind, arr) => (
                <Fragment  key={ind}>
                  {ind > 0 && <Dot />}
                  <div >
                    <Typography
                     
                      variant="subtitle1"
                    >
                      {el}
                    </Typography>
                    {ind + 1 != arr.length && <Dot />}
                  </div>
                </Fragment>
              ))}
            </Stack>
            <Stack
              direction={"row"}
              sx={{
                gap: 2,
                alignItems: "center"
              }}>
              <Typography
                variant="subtitle1"
                color="secondary"
                sx={{ fontWeight: 500,textTransform:"uppercase" }}
              >
                {t("actors")}
              </Typography>
              {actors.slice(0, 2).map((el, ind, arr) => (
                <Fragment  key={ind}>
                  {ind > 0 && <Dot />}
                  <div key={ind}>
                    <Typography
                      key={ind}
                      variant="subtitle1"
                    >
                      {el}
                    </Typography>
                    {ind + 1 != arr.length && <Dot />}
                  </div>
                </Fragment>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>

    </Box >
  )
}

export default TitleHeroSection


function Dot() {
  return (
    <Box component="span"
      sx={{
        width: 5,
        height: 5,
        borderRadius: 2,
        backgroundColor: "secondary.main",
      }} ></Box>
  )
}