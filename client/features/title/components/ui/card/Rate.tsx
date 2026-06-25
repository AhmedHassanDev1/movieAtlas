import { Typography } from "@mui/material"
import { yellow } from "@mui/material/colors"
import GradeIcon from '@mui/icons-material/Grade';



function Rate({rate}:{rate:number}) {
  return (
  <Typography
              variant='subtitle1'
              sx={{
                display: "flex",
                alignItems: "center",
                gap:0.5,
                fontWeight:700,
              }}>
              {rate?.toFixed(1)}
              <GradeIcon sx={{ color: yellow[900] }} />
            </Typography>
  )
}

export default Rate
