"use client"

import { queryClient } from '@/design-system/components/providers';
import { markAsWatched, removeWatched } from '@/features/Interactions/api/watchHistory';
import { InteractionsTitleStat  } from '@/features/Interactions/types/interactions';
import useTitleStatistics from '@/features/title/hooks/useTitleStatistics';
import { errorMessage, successMessage } from '@/utils/message';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Box, Button, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';


function WatchButton({ titleId, variant = "outlined" }: { titleId: string, variant?: "text" | "outlined" | "contained" }) {
    const t = useTranslations("button")

    const { data: stat, isLoading, } = useTitleStatistics(titleId)
    const queryKey = ["title-stat", titleId];
    const { mutateAsync: toggleWatch, isPending } = useMutation({
        mutationFn: async () => {
            return stat?.watched
                ? removeWatched({ titleId })
                : markAsWatched({ titleId });
        },

        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });

            const previous = queryClient.getQueryData(queryKey);

            queryClient.setQueryData(queryKey, (old: InteractionsTitleStat | undefined) => {
                if (!old) return old;
                return {
                    ...old,
                    watched: !old.watched,
                };
            });

            return { previous };
        },

        onError: (_err, _vars, context) => {
            queryClient.setQueryData(queryKey, context?.previous);
            errorMessage("Operation failed");
        },

        onSuccess: () => {
            successMessage("Updated successfully");
        },
    });

    const loading = isLoading || isPending
    const isWatched = stat?.watched;

    return (
        <Button
            variant={variant}
            loading={loading}
            onClick={(e) => {
                if (loading) return
                e.preventDefault()
                e.stopPropagation()
                toggleWatch()
            }}
            sx={{
                display: "flex",
                gap: 1.5,
                padding: '10px 24px',
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'all 0.2s ease-in-out',
                gridColumn: {
                    xs: "1 / span 2",
                    md: "3/ span 3",
                },
                ...(isWatched ? {
                    color: '#10b981',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    backgroundColor: 'rgba(16, 185, 129, 0.05)',
                    '&:hover': {
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.5)',
                    }
                } : {
                    color: '#e2e8f0',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        transform: 'translateY(-1px)'
                    }
                })
            }}>
            {isWatched ? (
                <>
                    <RemoveRedEyeIcon sx={{ fontSize: 20 }} />
                    <Typography sx={{ fontWeight: 600 }}>{t("watched")}</Typography>
                </>
            ) : (
                <>
                    <RemoveRedEyeOutlinedIcon sx={{ fontSize: 20, opacity: 0.8 }} />
                    <Typography sx={{ fontWeight: 600 }}>{t("unWatched")}</Typography>
                </>
            )}
        </Button>
    )
}

export default WatchButton;
