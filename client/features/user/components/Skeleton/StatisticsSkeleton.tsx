
import { Grid, Skeleton } from "@mui/material";
import { grey } from "@mui/material/colors";

const StatisticsSkeleton = () => {
  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, md: 2 }}
      sx={{
        width: {
          xs: "100%",
          md: "auto",
        },
      }}
    >
      {[1, 2, 3, 4].map((item) => (
        <Grid
          key={item}
          size={{ xs: 3, md: 6 }}
          sx={{
            p: { xs: 1, md: 2 },
            background: grey[800],
            borderRadius: 0.5,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",

            minHeight: 90,
          }}
        >
          <Skeleton
            variant="text"
            width={70}
            height={25}
          />

          <Skeleton
            variant="text"
            width={40}
            height={40}
          />
        </Grid>
      ))}
    </Grid>
  );
};
export default StatisticsSkeleton