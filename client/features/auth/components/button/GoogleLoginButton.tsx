"use client";

import { Button, Typography } from "@mui/material"
import Image from "next/image";
import { getGoogleLoginUrl } from "@/config/api";
import { useTranslations } from "next-intl";

export default function GoogleLoginButton() {
  const t = useTranslations("auth");
  const handleLogin = () => {
    window.location.href = getGoogleLoginUrl();
  };

  return (
    <Button
      variant="text"
      onClick={handleLogin}
      sx={{
        background: "white",
        display: 'flex',
        gap: 1,
        alignItems: "center",
        borderRadius: 2,
        px: 2,
        py: 1,
        '&:hover': {
          background: "#f1f5f9"
        }
      }}
    >
      <Image src="/google_icon.png" width={32} height={32} alt="google icon" />
      <Typography variant="subtitle1" sx={{ color: "black", fontWeight: 600 }} > {t("continueWithGoogle")}</Typography>
    </Button>
  );
}