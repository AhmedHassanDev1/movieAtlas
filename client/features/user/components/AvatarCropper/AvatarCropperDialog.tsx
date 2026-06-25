import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, CircularProgress } from "@mui/material"
import { CropperCanvas } from "./CropperCanvas"
import { useImageCrop } from "./useImageCrop"
import { Area } from "react-easy-crop"

type Props = {
    open: boolean
    image: string
    isPending: boolean
    onClose: () => void
    onSave: (croppedArea: Area) => void
}

export function AvatarCropperDialog({
    open,
    image,
    isPending,
    onClose,
    onSave,
}: Props) {
    const {
        crop,
        zoom,
        setCrop,
        setZoom,
        croppedAreaPixels,
        onCropComplete,
    } = useImageCrop()

    const handleSave = () => {
        if (!croppedAreaPixels) return
        onSave(croppedAreaPixels)
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Crop Image</DialogTitle>

            <DialogContent>
                <Box sx={{ position: "relative", height: 400 }}>

                    <CropperCanvas
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                    />
                    {isPending && (
                        <Box sx={{
                            position: "absolute",
                            inset: 0,
                            display:"flex",
                            alignItems:"center",
                            justifyContent:"center",
                            background: "#ffffff21"
                        }}>
                            <CircularProgress color="primary" aria-label="Loading…" />
                        </Box>
                    )}
                </Box>
            </DialogContent>

            <DialogActions sx={{display:"flex",gap:2,padding:1}}>
                <Button onClick={onClose} loading={isPending}>Cancel</Button>
                <Button onClick={handleSave} variant="contained" loading={isPending}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}