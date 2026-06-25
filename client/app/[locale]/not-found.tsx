"use client";

import { Box, Typography, Button, Stack, ButtonGroup } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Logo from "@/design-system/components/ui/Logo";
import { useLocale } from "next-intl";

export default function NotFound() {
  const router = useRouter();
  const locale = useLocale()
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: "radial-gradient(circle at top, #111827, #0b0f19)",
        color: "white",
      }}
    >

      <Stack spacing={2} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>

        <Logo />
        <SearchOffIcon sx={{ fontSize: 80, opacity: 0.7 }} />


        <Typography variant="h2" sx={{
          fontWeight: "bold"
        }}>
          404
        </Typography>

        {/* Subtitle */}
        <Typography variant="h6" sx={{ opacity: 0.7, maxWidth: 420 }}>
          The page you’re looking for doesn’t exist or has been moved.
        </Typography>

        {/* Actions */}
        <ButtonGroup >

          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            fullWidth
            onClick={() => router.push(`/${locale}/`)}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              px: 3,
            }}
          >
            Home
          </Button>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            fullWidth
            onClick={() => router.back()}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              px: 3,
              color: "white",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            Go Back
          </Button>

        </ButtonGroup>
      </Stack>
    </Box>
  );
}