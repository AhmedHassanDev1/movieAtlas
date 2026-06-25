"use client"
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography } from "@mui/material"
import WatchTrailer from "../../../Interactions/components/ui/buttons/WatchTrailer"
import ToggleWatchListButton from "../../../Interactions/components/ui/buttons/WatchListButton"
import ToggleWatchButton from '../../../Interactions/components/ui/buttons/WatchButton';
import AddToWatchListButton from '../../../Interactions/components/ui/buttons/WatchListButton';


function TitleActionButton({titleId}:{titleId:string}) {
  return (
    <Box sx={{
      display: "grid",
      alignItems: "center",
      gap: 2,
      gridTemplateColumns: {
        xs: "1fr",
        md: "1fr 1fr auto"
      },
      gridTemplateRows: {
        xs: "1fr 1fr",
        md: "1fr"
      }
    }}>
      <WatchTrailer />
      <AddToWatchListButton titleId={titleId}/>
      <ToggleWatchButton titleId={titleId} />
    </Box>
  )
}

export default TitleActionButton
