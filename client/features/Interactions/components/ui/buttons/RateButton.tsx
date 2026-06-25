"use client"

import { Box, Button, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarRateIcon from '@mui/icons-material/StarRate';
import Loading from '@/design-system/components/ui/loading';
import AddRatingDialog from '../../AddRatingDialog';
import { useState } from 'react';

import { getTitleStat } from '@/features/Interactions/api/interactions';
import { useQuery } from '@tanstack/react-query';

type ToggleRateButtonProps = {
  titleId: string;
  onlyIcon?: boolean;
  size?: number;
  titleName: string
}

function RateButton({
  onlyIcon = false,
  size = 25,
  titleId,
  titleName
}: ToggleRateButtonProps) {
  const t = useTranslations("title")
  const [open, setOpen] = useState(false);

 
  
   
  const { data: stat, isLoading, } = useQuery({
    queryFn: () => getTitleStat(titleId),
    queryKey: ["title stat", titleId],
    enabled: !!titleId,
    retry: false,
  })

  if (isLoading) {
    return <Box sx={{
      p: 1,
      position: "relative"
    }}>
      <Loading />
    </Box>
  }

  return (
    <Box
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
      }
      }>
      <Button
        size="small"
        variant="text"
        sx={{ maxWidth: "fit-content" }}
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setOpen(true)

        }}
      >
        {stat?.rating ? (
          <Box
            sx={{ display: 'flex', alignItems: "center", gap: 1, cursor: "pointer" }}>
            <StarRateIcon sx={{ fontSize: size }} />
            {!onlyIcon && <Typography
              variant='h5'
              sx={{
                display: 'flex',
                alignItems: "center",
                gap: 1,
                fontWeight: 700,
              }}
            >
              {`${t("yourRate")} 
              ${stat.rating && (
                  stat.rating + "/10"
                )}`}

            </Typography>}
          </Box>
        ) : (
          <Box sx={{ cursor: "pointer" }}>
            <StarBorderIcon sx={{
              fontSize: size
            }} />
          </Box>
        )}
      </Button>
      <AddRatingDialog
        isOpen={open}
        titleId={titleId}
        titleName={titleName}
        onClose={() => setOpen(false)}
      />

    </Box >
  )
}

export default RateButton

