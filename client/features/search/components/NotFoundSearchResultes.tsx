"use client"
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { Button, Stack, Typography } from "@mui/material";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SearchNotFound( ) {
    const locale=useLocale()
    const searchParams=useSearchParams()
    const q=searchParams.get("q")
    return (
        <Stack

            sx={{
                minHeight: "70vh",
                textAlign: "center",
                px: 2,
                spacing: 3,
                alignItems: "center",
                justifyContent: "center"
            }}
        >
            <SearchOffIcon
                sx={{
                    fontSize: 100,
                    opacity: 0.6,
                }}
            />

            <Typography variant="h3" sx={{ fontWeight: 700 }}>
                No results found
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 500 }}
            >
                We couldn t find any movies or TV shows matching{" "}
                <Typography
                    component="span"
                    sx={{ fontWeight: 700 }}
                >
                    &quot;{q}&quot;
                </Typography>
            </Typography>

            <Stack direction="row" spacing={2}>
                <Button
                    variant="contained"
                    component={Link}
                    href={`/${locale}/`}
                >
                    Back Home
                </Button>

                <Button
                    variant="outlined"
                    component={Link}
                    href="/movies/trending"
                >
                    Trending Movies
                </Button>
            </Stack>
        </Stack>
    );
}