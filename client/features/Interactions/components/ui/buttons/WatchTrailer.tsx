"use client"
import { useTranslations } from "next-intl";
import { Button, Typography } from "@mui/material"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';



function WatchTrailer() {
  const t = useTranslations("button")

  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      size="small"
      sx={{
        boxShadow: 3,
        fontWeight: 700,
        fontSize: "18px",
        maxWidth: "min-content",
      }}>
      <PlayArrowIcon />
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,

        }}>
        {t("watchTrailer")}
      </Typography>
    </Button>
  )
}

export default WatchTrailer
