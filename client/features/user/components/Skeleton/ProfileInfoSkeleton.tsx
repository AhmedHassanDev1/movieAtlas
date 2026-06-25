
import { Skeleton, Stack, Box } from "@mui/material";


import StatisticsSkeleton from "./StatisticsSkeleton";

function ProfileInfoSkeleton() {
  return (
    <Stack
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        padding: 2,
        flexDirection: {
          xs: "column",
          md: "row",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <Skeleton
          variant="circular"
          width={80}
          height={80}
        />

        <Stack spacing={1}>
          <Skeleton variant="text" width={180} height={50} />
          <Skeleton variant="text" width={140} height={30} />
          <Skeleton
            variant="rounded"
            width={120}
            height={40}
          />
        </Stack>
      </Box>

      <StatisticsSkeleton />
    </Stack>

  )
}

export default ProfileInfoSkeleton

