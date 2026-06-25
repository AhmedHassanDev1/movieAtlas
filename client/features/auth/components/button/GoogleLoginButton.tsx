"use client";

import { Button, Typography } from "@mui/material"
import Image from "next/image";
export default function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_GOOGLE_CALLBACK as string;
  };

  return (
    <Button
      variant="text"
      onClick={handleLogin}
      sx={{
        background: "white",
        display: 'flex',
        gap: 1,
        alignItems: "center"
      }}
    >
      <Image src="/google_icon.png" width={32} height={32} alt="google icon" />
      <Typography variant="subtitle1" sx={{ color: "black", fontWeight: 600 }} > Continue with Google</Typography>
    </Button>
  );
}