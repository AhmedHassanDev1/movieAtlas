"use client"

import Loading from "@/design-system/components/ui/loading";

import { Box, Button } from "@mui/material"
import { useMutation } from "@tanstack/react-query";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import useTitleStatistics from "@/features/title/hooks/useTitleStatistics";
import { addToWatchList, deleteFromWatchList } from "@/features/Interactions/api/watchList";
import { queryClient } from "@/design-system/components/providers";
import { blue, yellow } from "@mui/material/colors";
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
  const queryKey = ["title stat", titleId];

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async () => {
      return stat?.watchlist
        ? deleteFromWatchList({ titleId })
        : addToWatchList({ titleId });
    },

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData(queryKey);

      queryClient.setQueryData(queryKey, (old: InteractionsTitleStat) => ({
        ...old,
        watchlist: !old?.watchlist,
      }));

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
  const iconSize = 35

  if (isLoading) {
    return (type == "icon" ? (
      <Box
        sx={{
          position: 'relative',
          padding: 2,
          cursor: "pointer"
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
          backgroundColor: blue[600]
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
      sx={{ cursor: "pointer" }}
    >
      {type == "icon" ? (
        <Box>
          {state ? (
            <Box >
              <BookmarkAddIcon sx={{ color: yellow[800], fontSize: iconSize }} />
            </Box>
          ) : (
            <Box>
              <BookmarkAddOutlinedIcon sx={{ color: yellow[800], fontSize: iconSize }} />
            </Box>
          )}
        </Box>
      ) : (
        <Button
          loading={isPending}
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            backgroundColor: blue[600]
          }}>
          {state ? (
            <>
              <CheckIcon />
              {t("removeFromWatchList")}
            </>
          ) : (
            <>
              <AddIcon />
              {t("addToWatchlist")}
            </>
          )}
        </Button>
      )}
    </Box>
  );
}

export default WatchListButton