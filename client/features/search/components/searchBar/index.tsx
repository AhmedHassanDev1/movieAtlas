"use client"
import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { KeyboardEvent } from "react";
import {
    Box,
    IconButton,
    InputBase,
    useTheme
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

function SearchBar() {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("")
    const router = useRouter()
    const locale = useLocale()
    const t = useTranslations("global");

    const handleSearch = () => {
        router.push(`/${locale}/search?q=${searchValue}`)

    }
    const handleEnter = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key == "Enter") {
            handleSearch()
        }

    }
    return (
        <>
            {/* Large Screen */}
            <Box

                component="div"
                sx={{
                    display: {
                        xs: "none",
                        md: "flex"
                    },
                    alignItems: "center",
                    background: "white",
                    borderRadius: 10,
                    px: 2,
                    height: 40,
                    flex: 1,

                }}
            >
                <InputBase
                    placeholder={t("searchMovies")}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyUp={handleEnter}
                    type="search"
                   
                    sx={{
                        flex: 1,
                        color: "black",
                    }}
                />

                <IconButton
                    onClick={handleSearch}
                >
                    <SearchOutlinedIcon sx={{ color: "primary.main" }} />
                </IconButton>
            </Box>

            {/* Small Screen Icon */}
            <IconButton
                onClick={() => setOpen(true)}
                sx={{
                    justifySelf: "end",
                    backgroundColor: "red",
                    display: {
                        xs: "flex",
                        md: "none"
                    }
                }}
            >
                <SearchOutlinedIcon />
            </IconButton>

            {/* Overlay Search */}
            {open && (
                <Box
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 64,
                        background: "background.paper",
                        display: "flex",
                        alignItems: "center",

                        px: 2,

                        zIndex: (theme) => theme.zIndex.appBar + 1,
                    }}
                >
                    <InputBase
                        onBlur={() => setOpen(false)}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyUp={(e) => handleEnter(e)}
                        type="search"
                      
                        autoFocus
                        placeholder={t("searchMovies")}
                        sx={{
                            flex: 1,
                            background: "white",
                            px: 2,
                            py: 1,
                            color: "black",
                            borderRadius: 10,
                        }}
                    />

                    {/* <IconButton

                        onClick={() => setOpen(false)}
                    >
                        <CloseIcon sx={{ color: "primary.main" }} />
                    </IconButton> */}
                </Box>
            )}
        </>
    );
}

export default SearchBar;