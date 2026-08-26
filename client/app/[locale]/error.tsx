"use client";

import { useEffect } from "react";
import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useRouter } from "next/navigation";
import Logo from "@/design-system/components/ui/Logo";
import { motion } from "framer-motion";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
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
        background: "linear-gradient(135deg, #0b0f19 0%, #111827 100%)",
        color: "white",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Subtle background glow effect */}
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0, pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ zIndex: 1 }}
      >
        <Paper
          elevation={24}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 4,
            background: "rgba(31, 41, 55, 0.6)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: 500,
            textAlign: "center"
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Logo />
          </Box>
          
          <Box sx={{ 
            width: 80, 
            height: 80, 
            borderRadius: '50%', 
            background: 'rgba(239, 68, 68, 0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mb: 3
          }}>
            <WarningRoundedIcon sx={{ fontSize: 40, color: '#ef4444' }} />
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}>
            Oops! Something went wrong.
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, lineHeight: 1.6 }}>
            {error.message || "We've encountered an unexpected issue. Our team has been notified and is working on a fix."}
          </Typography>

          {error.digest && (
            <Typography variant="caption" sx={{ color: "text.disabled", mb: 4, fontFamily: 'monospace' }}>
              Error ID: {error.digest}
            </Typography>
          )}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%' }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={() => reset()}
              fullWidth
              sx={{
                borderRadius: 2,
                textTransform: "none",
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
                '&:hover': { background: 'linear-gradient(to right, #2563eb, #1d4ed8)' }
              }}
            >
              Try Again
            </Button>

            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => router.push("/")}
              fullWidth
              sx={{
                borderRadius: 2,
                textTransform: "none",
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                color: "white",
                borderColor: "rgba(255,255,255,0.2)",
                '&:hover': { borderColor: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)' }
              }}
            >
              Go Home
            </Button>
          </Stack>
        </Paper>
      </motion.div>
    </Box>
  );
}