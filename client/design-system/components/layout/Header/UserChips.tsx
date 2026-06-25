"use client";
import ProfileMenu from "../../ui/menus/ProfileMenu";
import { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Typography,
} from "@mui/material";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import useAuth from "@/hooks/useAuth";
import Loading from "../../ui/loading";
import Link from "next/link";

function UserChip() {
    const { data, isLoading, isError } = useAuth()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const isOpen = Boolean(anchorEl);

    if (isLoading) return <Box sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        border: "0.5px solid gray",
        height: 25,
        px: 3,
        py: 2,
        borderRadius: "999px",
        cursor: "pointer",

        "&:hover": {
            bgcolor: "action.hover",
        },
    }}>
        <Loading />
    </Box>
    if (!data || isError) {
        return <Link href={"/en/login"}>
            <Button
                size="small"
                variant="outlined"
                sx={{
                    height: "min-content",
                    padding: "none",

                }}
            >
                <Typography variant="subtitle1">
                    Log in
                </Typography>
            </Button>
        </Link>
    }
    const { id, user_name, avatar } = data

    return (
        <Box sx={{ position: "relative" }}>
            <Box
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,

                    height: 32,
                    px: 1,

                    borderRadius: "999px",
                    cursor: "pointer",

                    "&:hover": {
                        bgcolor: "action.hover",
                    },
                }}
            >
                {avatar ? (
                    <Avatar
                        sx={{
                            width: 32,
                            height: 32,
                            fontSize: 12,
                        }}
                        src={avatar.url}
                        alt="user avatar"
                    />
                ) : (
                    <Avatar
                        sx={{
                            width: 24,
                            height: 24,
                            fontSize: 12,
                        }} >
                        {user_name.charAt(0).toUpperCase()}
                    </Avatar>
                )}
                <Box
                    sx={{
                        alignItems: "center",
                        display: {
                            xs: "none",
                            md: "flex"
                        }
                    }}>
                    <Typography variant="subtitle2">
                        {user_name}
                    </Typography>
                    {!isOpen ? <ArrowDropDownIcon fontSize="small" /> : <ArrowDropUpIcon fontSize="small" />}
                </Box>
            </Box>
            <ProfileMenu isOpen={isOpen} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />

        </Box >
    );
}

export default UserChip;