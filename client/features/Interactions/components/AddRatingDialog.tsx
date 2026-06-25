"use client"

import { Button, Dialog, DialogActions, DialogContent, Rating, Typography } from "@mui/material"
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { addRating, removeRating } from "../api/rating";
import { queryClient } from "@/design-system/components/providers";
import useTitleStatistics from "@/features/title/hooks/useTitleStatistics";


type AddRatingDialogProps = {
    isOpen: boolean;
    titleId: string;
    titleName: string;

    onClose: () => void
}



function AddRatingDialog({ isOpen, titleId, titleName, onClose }: AddRatingDialogProps) {

    const { data: stat } = useTitleStatistics(titleId)


    const { mutateAsync: DeleteRating, isPending: removing } = useMutation({
        mutationFn: () => removeRating({ titleId }),
        mutationKey: ["delete rating", titleId]
    })
    const { mutateAsync, isPending: adding } = useMutation({
        mutationFn: addRating,
        mutationKey: ["add rating", titleId]
    })
    const t = useTranslations("")
    const [rating, setRating] = useState<number | null>(stat?.rating || 0)

    const handleSubmit = async () => {
        if (rating) {
            const res = await mutateAsync({ titleId, value: rating })
            queryClient.setQueryData(["title stat", titleId], {
                ...stat,
                rating
            })
            onClose()
        }
    }

    const handleRemoveRating = async () => {
        await DeleteRating()
        queryClient.setQueryData(["title stat", titleId], {
            ...stat,
            rating: 0
        })
        onClose()

    }
    return (

        <Dialog

            open={isOpen}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            sx={{
                backgroundColor: "transparent"
            }}
            scroll="paper"
            slotProps={{
                paper: {
                    sx: {
                        maxHeight: "80vh",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                    },
                },
            }
            }
        >
            <DialogContent

                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 2,
                    overflow: "visible",
                    minHeight: "unset",
                }}
            >


                <Typography
                    variant="h5"
                    sx={{
                        color: "primary.main"
                    }}>
                    Rate this
                </Typography>
                <Typography variant="h5">{titleName}</Typography>
                <Rating
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    name="hover-feedback"
                    value={rating}
                    max={10}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}


                />
                <DialogActions
                    sx={{
                        width: "25%",
                        display: "inline-block"
                    }}>
                    <Button
                        loading={adding || removing}
                        onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                    >
                        <Typography variant="h5">
                            {t("button.rate")}
                        </Typography>
                    </Button>
                    <Button
                        loading={adding || removing}
                        variant="text"
                        onClick={handleRemoveRating}
                    >
                        {t("button.removeRate")}
                    </Button>
                </DialogActions>
            </DialogContent>

        </Dialog >
    );
}
export default AddRatingDialog