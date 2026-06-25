"use client"
import { AppBar, Box, Grid, Stack, Toolbar } from "@mui/material"
import Logo from "../../ui/Logo"
import MenuButton from "./button/MenuButton"
import WatchListButton from "./button/WatchListButton"
import UserChips from "./UserChips"
import SearchBar from "../../../../features/search/components/searchBar"
import LangaugeButton from "./button/LangaugeButton"




function Header() {


    return (
        <AppBar
            position="sticky">
            <Toolbar sx={{ justifyContent: "space-between", alignItems: "center", gap: 1 }}>
                {/* right section */}
                <Grid
                    container
                    sx={{
                        display: "flex",
                        gap: 1,
                        alignItems: "center"
                    }} >
                    <Grid >
                        <Logo  />
                    </Grid>
                    <Grid sx={{
                        order: {
                            xs: -1,
                            md: 1
                        }
                    }}>
                        <MenuButton />
                    </Grid>
                </Grid>



                {/* Left Section */}
                <Stack direction={"row"}
                    sx={{
                        gap: 1,
                        flex: 1,
                        alignItems: "center",
                        justifyContent:"end" 
                    }}>
                    {/* search section */}
                    <SearchBar />
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap:"nowrap",
                            alignItems: 'center',
                            borderInlineStart: "1px solid",
                            paddingInlineStart: 2,
                            borderInlineColor: "gray",
                        }}>

                        <WatchListButton />
                        <UserChips />
                        <LangaugeButton/>
                    </Box>

                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Header
