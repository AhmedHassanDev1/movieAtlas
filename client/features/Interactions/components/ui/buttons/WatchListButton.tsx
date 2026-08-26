"use client"

import Loading from "@/design-system/components/ui/loading";

import { Box, Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import useTitleStatistics from "@/features/title/hooks/useTitleStatistics";
import { addToWatchList, deleteFromWatchList } from "@/features/Interactions/api/watchList";
import { queryClient } from "@/design-system/components/providers";
import { useTranslations } from "next-intl";
import { InteractionsTitleStat } from "@/features/Interactions/types/interactions";
import { errorMessage, successMessage } from "@/utils/message";

function WatchListButton({
  titleId,
  type = "text"

}: {
  titleId: string
  type?: "icon" | "text"
}) {
  const t = useTranslations("button")
  const { data: stat, isLoading, } = useTitleStatistics(titleId)
  const queryKey = ["title-stat", titleId];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      return stat?.watchlist
        ? deleteFromWatchList({ titleId })
        : addToWatchList({ titleId });
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: InteractionsTitleStat | undefined) => {
        if (!old) return old;
        return {
          ...old,
          watchlist: !old.watchlist,
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

    }
  });

  const state = stat?.watchlist
  const iconSize = 28

  if (isLoading) {
    return (type == "icon" ? (
      <Box
        sx={{
          position: 'relative',
          padding: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
        }}>
        <Loading />
      </Box>
    ) : (
      <Button
        loading={true}
        sx={{
          display: "flex",
          gap: 1,
          alignItems: "center",
          padding: '10px 24px',
          borderRadius: '12px',
          backgroundColor: 'rgba(59, 130, 246, 0.5)'
        }}>
      </Button>
    )
    )
  }
  return (
    <Box onClick={(e) => {
      e.stopPropagation()
      e.preventDefault()
      mutateAsync()
    }}
      sx={{ cursor: "pointer", display: 'inline-block' }}
    >
      {type == "icon" ? (
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 44,
          height: 44,
          borderRadius: '50%',
          transition: 'all 0.2s ease',
          backgroundColor: state ? 'rgba(234, 179, 8, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          '&:hover': {
            backgroundColor: state ? 'rgba(234, 179, 8, 0.25)' : 'rgba(255, 255, 255, 0.1)',
            transform: 'scale(1.05)'
          }
        }}>
          {state ? (
            <BookmarkAddedIcon sx={{ color: '#facc15', fontSize: iconSize }} />
          ) : (
            <BookmarkAddOutlinedIcon sx={{ color: '#e2e8f0', fontSize: iconSize }} />
          )}
        </Box>
      ) : (
        <Button
          loading={isPending}
          sx={{
            display: "flex",
            gap: 1.5,
            alignItems: "center",
            padding: '10px 24px',
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.95rem',
            transition: 'all 0.2s ease-in-out',
            ...(state ? {
                color: '#e2e8f0',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                }
            } : {
                color: 'white',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                backgroundColor: 'rgba(59, 130, 246, 0.9)',
                boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
                '&:hover': {
                    backgroundColor: '#2563eb',
                    border: '1px solid rgba(59, 130, 246, 0.5)',
                    transform: 'translateY(-1px)'
                }
            })
          }}>
          {state ? (
            <>
              <CheckIcon sx={{ fontSize: 20 }} />
              {t("removeFromWatchList")}
            </>
          ) : (
            <>
              <AddIcon sx={{ fontSize: 20 }} />
              {t("addToWatchlist")}
            </>
          )}
        </Button>
      )}
    </Box>
  );
}

export default WatchListButton;