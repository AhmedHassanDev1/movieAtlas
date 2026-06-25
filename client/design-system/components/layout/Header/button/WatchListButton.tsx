"use client"
import useUserStatistics from '@/features/user/hooks/useUserStatistics';
import useAuth from '@/hooks/useAuth';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import { Box, Chip, Stack, Typography } from '@mui/material';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';


function WatchListButton() {
  const t = useTranslations("global")
  const locale = useLocale()
  const { data: user } = useAuth()
  const { data } = useUserStatistics(user?.id)
  const count = data?.watchlist_count ?? null
  if (!count ) return
  return (
    <Box sx={{
      display: {
        xs: "none",
        md: "flex",
      },
    }}>
      <Link
        href={`/${locale}/user/${user?.id}/watchlist`} >
        <Stack
          direction={"row"}
          sx={{
            alignItems: "center"
          }}
        >
          <BookmarkAddIcon />
          <Typography
            variant='subtitle2'
            sx={{ fontWeight: 500 }}
          >
            {t("watchlist")}
          </Typography>

          <Chip
            label={count <= 100 ? count : "99+"}
            size="small"
            sx={{
              backgroundColor: "primary.main",
              mx: 1,
              fontWeight: 600,
              color: "white"
            }} />

        </Stack>
      </Link>
    </Box>
  )
}

export default WatchListButton

