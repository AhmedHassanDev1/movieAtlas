"use client";

import { useEffect } from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import BugReportIcon from "@mui/icons-material/BugReport";
import { useRouter } from "next/navigation";
import Logo from "@/design-system/components/ui/Logo";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // هنا ممكن تبعت error لـ logging service زي Sentry
    console.error("App Error:", error);
  }, [error]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        background: "radial-gradient(circle at top, #1f2937, #0b0f19)",
        color: "white",
      }}
    >
      <Stack spacing={2} sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Logo/>
        {/* Icon */}
        <BugReportIcon sx={{ fontSize: 80, opacity: 0.7 }} />

        {/* Title */}
        <Typography variant="h3" sx={{
          fontWeight: "bold"
        }}>
          Something went wrong
        </Typography>

        {/* Message */}
        <Typography sx={{ opacity: 0.7, maxWidth: 500 }}>
          {error.message || "Unexpected error occurred in the application"}
        </Typography>

        {/* Optional debug id */}
        {error.digest && (
          <Typography sx={{ fontSize: 12, opacity: 0.5 }}>
            Error ID: {error.digest}
          </Typography>
        )}

        {/* Actions */}
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>

          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => reset()}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              px: 3,
            }}
          >
            Try Again
          </Button>

          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={() => router.push("/")}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              px: 3,
              color: "white",
              borderColor: "rgba(255,255,255,0.2)",
            }}
          >
            Home
          </Button>

        </Stack>
      </Stack>
    </Box>
  );
}