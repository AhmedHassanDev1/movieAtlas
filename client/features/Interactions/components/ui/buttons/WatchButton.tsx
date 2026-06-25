"use client"

import { queryClient } from '@/design-system/components/providers';
import { markAsWatched, removeWatched } from '@/features/Interactions/api/watchHistory';
import { InteractionsTitleStat  } from '@/features/Interactions/types/interactions';
import useTitleStatistics from '@/features/title/hooks/useTitleStatistics';
import { errorMessage, successMessage } from '@/utils/message';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Button, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';


function WatchButton({ titleId, variant = "outlined" }: { titleId: string, variant?: "text" | "outlined" | "contained" }) {
    const t = useTranslations("button")

    const { data: stat, isLoading, } = useTitleStatistics(titleId)
    const queryKey = ["title stat", titleId];
    const { mutateAsync: toggleWatch, isPending } = useMutation({
        mutationFn: async () => {
            return stat?.watched
                ? removeWatched({ titleId })
                : markAsWatched({ titleId });
        },

        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });

            const previous = queryClient.getQueryData(queryKey);

            queryClient.setQueryData(queryKey, (old: InteractionsTitleStat) => ({
                ...old,
                watched: !old?.watched,
            }));

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
                gap: 1,
                border: "1px solid",
                color: "#5799ef",
                padding: 2,
                boxShadow: "none",
                borderRadius: "20px",
                gridColumn: {
                    xs: "1 / span 2",
                    md: "3/ span 3",
                },
                backgroundColor: "transparent"
            }}>
            {stat?.watched ? (
                <Box sx={{ display: 'flex', gap: 1, alignItems: "center" }}>
                    <RemoveRedEyeIcon />
                    <Box >{t("watched")}</Box>
                </Box>
            ) : (
                <>
                    <RemoveRedEyeIcon />
                    <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700 }}>
                        {t("unWatched")}
                    </Typography>
                </>
            )}
        </Button>
    )
}

export default WatchButton
