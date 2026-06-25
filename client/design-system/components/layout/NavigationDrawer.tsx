"use client";

import { useState } from "react";
import NextLink from "next/link";
import { useLocale, useTranslations } from "next-intl";

import {
  Box,
  Collapse,
  Drawer,
  DrawerProps,
  List,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import Logo from "../ui/Logo";

function NavigationDrawer(props: DrawerProps) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const locale = useLocale();
  const t = useTranslations("title");

  const [openMovies, setOpenMovies] = useState(false);
  const [openTV, setOpenTV] = useState(false);

  const isRTL = locale === "ar";

  return (
    <Drawer
      {...props}
      anchor={isDesktop ? "top" : (isRTL ? "right" : "left")}
      variant="temporary"
    >
      <Box
        sx={{
          width: !isDesktop?280:"auto",
          p: 2,
          direction: isRTL ? "rtl" : "ltr",
          display:isDesktop?"flex":"inline-block"
        }}
      >
        <Logo />

        <List >
          {/* Movies */}
          <ListItemButton
            onClick={() => setOpenMovies((prev) => !prev)}
            sx={{
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
            {!isDesktop&&(openMovies ? <ExpandLess /> : <ExpandMore />)}

            <ListItemText
              primary={t("movie")}
              sx={{
                textAlign: isRTL ? "right" : "left",
                mx: 1,
              }}
            />
          </ListItemButton>

          <Collapse in={openMovies||isDesktop} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={NextLink}
                href={`/${locale}/movies/top-rate`}
                sx={{
                  paddingInlineStart: 4,
                }}
              >
                <ListItemText primary={t("topRatingMovies")} />
              </ListItemButton>

              <ListItemButton
                component={NextLink}
                href={`/${locale}/movies/popular`}
                sx={{
                  paddingInlineStart: 4,
                }}
              >
                <ListItemText primary={t("mostPopularMovies")} />
              </ListItemButton>
            </List>
          </Collapse>
      </List>
      <List>
          {/* TV */}
          <ListItemButton
            onClick={() => setOpenTV((prev) => !prev)}
            sx={{
              flexDirection: isRTL ? "row-reverse" : "row",
            }}
          >
           {!isDesktop&&(openTV ? <ExpandLess /> : <ExpandMore />)}

            <ListItemText
              primary={t("tv")}
              sx={{
                textAlign: isRTL ? "right" : "left",
                mx: 1,
              }}
            />
          </ListItemButton>

          <Collapse in={openTV||isDesktop} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton
                component={NextLink}
                href={`/${locale}/tv/top-rate`}
                sx={{
                  paddingInlineStart: 4,
                }}
              >
                <ListItemText primary={t("topRatingTV")} />
              </ListItemButton>

              <ListItemButton
                component={NextLink}
                href={`/${locale}/tv/popular`}
                sx={{
                  paddingInlineStart: 4,
                }}
              >
                <ListItemText primary={t("mostPopularTV")} />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
}

export default NavigationDrawer;