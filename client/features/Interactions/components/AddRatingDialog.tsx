"use client"

import { Button, Dialog, DialogActions, DialogContent, Rating, Typography, Box, IconButton } from "@mui/material"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
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


    const { mutate: DeleteRating, isPending: removing } = useMutation({
        mutationFn: () => removeRating({ titleId }),
        mutationKey: ["delete rating", titleId],
        onSuccess: () => {
            queryClient.setQueryData(["title-stat", titleId], (old: any) => {
                if (!old) return old;
                return { ...old, rating: 0 };
            });
            onClose();
        }
    })
    const { mutate, isPending: adding } = useMutation({
        mutationFn: addRating,
        mutationKey: ["add rating", titleId],
        onSuccess: (_, variables) => {
            queryClient.setQueryData(["title-stat", titleId], (old: any) => {
                if (!old) return old;
                return { ...old, rating: variables.value };
            });
            onClose();
        }
    })
    const t = useTranslations("")
    const [rating, setRating] = useState<number | null>(stat?.rating || 0)

    const handleSubmit = () => {
        if (rating) {
            mutate({ titleId, value: rating });
        }
    }

    const handleRemoveRating = () => {
        DeleteRating();
    }
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            sx={{
                '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(8px)',
                }
            }}
            scroll="paper"
            slotProps={{
                paper: {
                    sx: {
                        backgroundColor: '#111827',
                        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0))',
                        borderRadius: 4,
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                        overflow: "hidden",
                    },
                },
            }}
        >
            <Box sx={{ position: 'relative', pt: 4, px: 3, pb: 1, textAlign: 'center' }}>
                <IconButton 
                    onClick={onClose} 
                    sx={{ position: 'absolute', top: 12, right: 12, color: 'text.secondary', '&:hover': { background: 'rgba(255,255,255,0.1)', color: 'white' } }}
                >
                    <CloseRoundedIcon />
                </IconButton>
                <Box sx={{ 
                    width: 64, height: 64, borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 
                }}>
                    <StarRoundedIcon sx={{ fontSize: 36, color: '#eab308' }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                    Rate this title
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {titleName}
                </Typography>
            </Box>

            <DialogContent sx={{ px: 4, py: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Rating
                    onClick={(e) => e.stopPropagation()}
                    name="hover-feedback"
                    value={rating}
                    max={10}
                    onChange={(_, newValue) => setRating(newValue)}
                    sx={{
                        fontSize: '2.5rem',
                        '& .MuiRating-iconFilled': { color: '#eab308' },
                        '& .MuiRating-iconHover': { color: '#facc15' },
                        '& .MuiRating-iconEmpty': { color: 'rgba(255, 255, 255, 0.2)' }
                    }}
                />
            </DialogContent>

            <DialogActions sx={{ px: 4, pb: 4, pt: 0, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Button
                    loading={adding || removing}
                    onClick={handleSubmit}
                    variant="contained"
                    fullWidth
                    disabled={!rating}
                    sx={{
                        borderRadius: 2, py: 1.5, fontSize: '1rem', fontWeight: 600,
                        background: 'linear-gradient(to right, #3b82f6, #2563eb)',
                        boxShadow: '0 4px 14px 0 rgba(59, 130, 246, 0.39)',
                        textTransform: 'none',
                        '&:hover': { background: 'linear-gradient(to right, #2563eb, #1d4ed8)' }
                    }}
                >
                    {t("button.rate")}
                </Button>
                
                {stat?.rating ? (
                    <Button
                        loading={adding || removing}
                        variant="text"
                        onClick={handleRemoveRating}
                        fullWidth
                        sx={{
                            borderRadius: 2, py: 1.5, fontSize: '0.9rem', fontWeight: 500,
                            color: 'text.secondary', textTransform: 'none',
                            '&:hover': { background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }
                        }}
                    >
                        {t("button.removeRate")}
                    </Button>
                ) : null}
            </DialogActions>
        </Dialog>
    );
}

export default AddRatingDialog;