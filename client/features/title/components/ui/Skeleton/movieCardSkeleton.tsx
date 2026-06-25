

import { Box, Paper, Skeleton } from "@mui/material";

export function MovieCardSkeleton() {
    return (
        <Paper
            sx={{
                flex:"0 0 1",
                minWidth: {
                    xs: 200,
                    sm: 250,
                    md: 350,
                },
                aspectRatio: "2 / 3",
                borderRadius: 1,
                overflow: "hidden",
                position: "relative",
                background: "grey.900",
            }}
        >
            {/* Image skeleton */}
            <Skeleton
                variant="rectangular"
                sx={{
                    width: "100%",
                    height: "100%",
                }}
            />

            {/* Watchlist button skeleton */}
            <Skeleton
                variant="circular"
                width={40}
                height={40}
                sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                }}
            />

            {/* Bottom overlay */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    background: "rgba(0,0,0,0.4)",
                    backdropFilter: "blur(8px)",
                }}
            >
                {/* title */}
                <Skeleton variant="text" width="80%" height={28} />

                {/* meta row */}
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Skeleton variant="text" width={40} />
                    <Skeleton variant="text" width={60} />
                    <Skeleton variant="text" width={50} />
                </Box>

                {/* trailer button */}
                <Skeleton variant="rounded" width="100%" height={32} />
            </Box>
        </Paper>
    );
}


export default function MovieCardSkeletonGroup(){
    return <Box
        sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: 3,
            overflow:"hidden"
        }}>
        {Array(6).fill(null).map((el,ind)=>(
             <MovieCardSkeleton key={ind}/>
        ))}
    </Box>
}