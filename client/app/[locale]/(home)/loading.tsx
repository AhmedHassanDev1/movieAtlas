import { Box, Skeleton, Stack } from "@mui/material";

export default function HeroSkeleton() {
  return (
    <Box
      sx={{
        height: "85vh",
        width: "100%",
        overflow: "hidden",
        position: "relative",
        padding:2
      }}    
    >
      {/* TRACK */}
      <Box
        sx={{
          display: "flex",
          height: "100%",
          gap: 2,
          px: 2,
        }}
      >
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              flex: "0 0 85%",
              height: "100%",
              position: "relative",
              borderRadius: 3,
              overflow: "hidden",
              bgcolor: "rgba(255,255,255,0.04)",
            }}
          >
            {/* BACKDROP SKELETON */}
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                position: "absolute",
                inset: 0,
                bgcolor: "rgba(255,255,255,0.08)",
              }}
            />

            {/* OVERLAY GRADIENT (cinematic feel) */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,.8), transparent 60%)",
              }}
            />

            {/* CONTENT SKELETON */}
            <Stack
              spacing={2}
              sx={{
                position: "absolute",
                bottom: 24,
                left: 24,
                right: 24,
                zIndex: 2,
              }}
            >
              <Skeleton
                variant="text"
                width="60%"
                height={50}
                sx={{ bgcolor: "rgba(255,255,255,0.1)" }}
              />

              <Skeleton
                variant="text"
                width="80%"
                height={20}
                sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
              />

              <Stack direction="row" spacing={2}>
                <Skeleton
                  variant="rounded"
                  width={120}
                  height={40}
                  sx={{ bgcolor: "rgba(255,255,255,0.12)" }}
                />
                <Skeleton
                  variant="rounded"
                  width={100}
                  height={40}
                  sx={{ bgcolor: "rgba(255,255,255,0.08)" }}
                />
              </Stack>
            </Stack>
          </Box>
        ))}
      </Box>
    </Box>
  );
}