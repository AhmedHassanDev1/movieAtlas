"use client"
import Logo from "@/design-system/components/ui/Logo"
import AuthPageWallpaper from "@/features/auth/components/AuthPageWallpaper"
import AuthPosterCollage from "@/features/auth/components/AuthPosterCollage"
import GoogleLoginButton from "@/features/auth/components/button/GoogleLoginButton"
import { Box, Divider, Grid, Stack } from "@mui/material"
import { createContext, useState } from "react"


export type AuthStateType = {
    email: string | null
    pending_Verification: boolean

}
const defaultAuthState: AuthStateType = {
    email: null,
    pending_Verification: false

}
export type AuthContextType = {
    authState: AuthStateType
    setAuthState: React.Dispatch<React.SetStateAction<AuthStateType>>
}

export const AuthContext = createContext<AuthContextType>({
    authState: defaultAuthState,
    setAuthState: () => { }
})
function Layout({
    children
}: {
    children: React.ReactNode
}) {
    const [authState, setAuthState] = useState<AuthStateType>(defaultAuthState)

    return (
        <Box sx={{
            top: "0px",
            position: "relative",
            width: "100wv",
            // maxWidth:"100vh",
            minHeight: "100vh",
            overflowX: "hidden"
        }}>
            <AuthPageWallpaper />
            <Grid container spacing={2} sx={{ position: 'relative', minHeight: "100vh", zIndex: 10 }}>
                <Grid size={{ xs: 12, md: 6, lg: 5 }} sx={{
                    display: {
                        xs: "none",
                        md: "none",
                        lg: "block",
                    }
                }}>
                    <AuthPosterCollage />
                </Grid>
                <Grid
                    size={{ xs: 12, md: 12, lg: 7, }}
                    sx={{
                        minHeight: "100vh",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }} >
                    <AuthContext.Provider value={{ authState, setAuthState }}>
                        <Stack spacing={2} sx={{ width: "80%", maxWidth: "550px" }}>
                            <Logo />
                            {children}
                            {!authState.pending_Verification && (
                                <Stack spacing={2}>
                                    <Divider >OR</Divider>
                                    <GoogleLoginButton />
                                </Stack>
                            )}
                        </Stack>
                    </AuthContext.Provider>
                </Grid>
            </Grid>

        </Box>
    )
}

export default Layout
