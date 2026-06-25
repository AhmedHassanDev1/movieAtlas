"use client"
import { Avatar,  Stack, Typography } from '@mui/material'
import { useParams } from 'next/navigation'

import { GetProfileInfo } from "@/features/user/api/client"
import { useQuery } from "@tanstack/react-query"
import { useLocale, useTranslations } from "next-intl"
import { blue } from '@mui/material/colors'
import Link from 'next/link'
import ProfileInfoSkeleton from '@/features/user/components/Skeleton/ProfileInfoSkeleton'




function Page() {
  const { id } = useParams()
  const locale = useLocale()
  const t = useTranslations("")

  const { data: user, isLoading } = useQuery({
    queryFn: () => GetProfileInfo(id as string),
    queryKey: ["get profile info", id],
    enabled: !!id
  })
 if (isLoading) return <ProfileInfoSkeleton />

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
      <Stack spacing={2} >
        <Typography variant='h3'>
          {t("user.yourWatchList")}
        </Typography>
        <Stack direction={"row"} spacing={2} sx={{alignItems:"center"}}>
          <Avatar src={user?.avatar?.url} />
          <Link
          style={{color:blue[600], fontFamily:"blod" }}
            href={`/${locale}/user/${user?.id}`}
          >{user?.user_name}
          </Link>
        </Stack>
        <Typography variant="h6">{t("user.watchlistDescription")}</Typography>
      </Stack>
    </Stack>
  )
}

export default Page
