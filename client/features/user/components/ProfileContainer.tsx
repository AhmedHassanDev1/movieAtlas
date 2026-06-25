"use client"
import useAuth from "@/hooks/useAuth"
import { Avatar, Box, Button, Stack, styled, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { GetProfileInfo } from "../api/client"
import { parseJoinDate } from "@/utils/time"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { blue, grey } from "@mui/material/colors"
import { useLocale, useTranslations } from "next-intl"
import StatisticsContainer from "./StatisticsContainer"
import ProfileInfoSkeleton from "./Skeleton/ProfileInfoSkeleton"
import Link from "next/link"
import UserAvatar from "./UserAvatar"


function ProfileContainer({ userId }: { userId: string }) {
    const locale = useLocale()
    const t = useTranslations("button")
    const { data: me } = useAuth()
    const { data: user, isLoading } = useQuery({
        queryFn: () => GetProfileInfo(userId),
        queryKey: ["get profile info", userId]
    })
    if (isLoading) return <ProfileInfoSkeleton />
    const avatar = user?.avatar?.url
    const isSelf = user?.id == me?.id
    return (
        <Stack
            sx={{
                justifyContent: "space-between",
                gap: 4,
                padding: 2,
                flexDirection: {
                    xs: "column",
                    md: "row"
                }
            }}
        >
            <Box sx={{
                display: "flex",
                gap: 1,
            }}>
                <Box>
                    {avatar && (
                        <UserAvatar avatar={avatar} user_name={user.user_name} />
                    )}
                </Box>
                <Stack spacing={2} direction={"column"}>
                    <Typography variant="h4">{user?.user_name}</Typography>
                    {user?.created_at && (
                        <Typography variant="h6"
                            sx={{
                                color: "gray",
                                display: 'flex',
                                gap: 1,
                                alignItems: "center"
                            }}>
                            <CalendarMonthIcon />
                            {parseJoinDate(new Date(user?.created_at))}
                        </Typography>
                    )}
                    {isSelf && (
                        <Link href={`/${locale}/editeprofile`}>
                            <Button
                                variant="text"
                                sx={{
                                    width: "fit-content",
                                    background: grey[800],
                                    color: blue[600]
                                }}>
                                <Typography variant="h6">
                                    {t("editeProfile")}
                                </Typography>
                            </Button>
                        </Link>
                    )}
                </Stack>
            </Box>
            <StatisticsContainer userId={userId} />
        </Stack>
    )
}

export default ProfileContainer
