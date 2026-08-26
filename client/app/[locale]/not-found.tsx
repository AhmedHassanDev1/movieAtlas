"use client";

import { Box, Typography, Button, Stack, Paper } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";
import Logo from "@/design-system/components/ui/Logo";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";

export default function NotFound() {
  const router = useRouter();
  const locale = useLocale();

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
        width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(0,0,0,0) 70%)',
        zIndex: 0, pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
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
            background: 'rgba(59, 130, 246, 0.1)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            mb: 3
          }}>
            <SearchOffIcon sx={{ fontSize: 40, color: '#3b82f6' }} />
          </Box>

          <Typography variant="h1" sx={{ fontWeight: 900, mb: 1, fontSize: '4rem', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #60a5fa, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            404
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            Page Not Found
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", mb: 4, lineHeight: 1.6 }}>
            The page you're looking for doesn't exist or has been moved to another location. Let's get you back on track.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: '100%' }}>
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              fullWidth
              onClick={() => router.push(`/${locale}/`)}
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
              Go Home
            </Button>

            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              fullWidth
              onClick={() => router.back()}
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
              Go Back
            </Button>
          </Stack>
        </Paper>
      </motion.div>
    </Box>
  );
}