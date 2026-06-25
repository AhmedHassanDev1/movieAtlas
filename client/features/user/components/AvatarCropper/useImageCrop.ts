import { useState } from "react"
import { Area, Point } from "react-easy-crop"

export function useImageCrop() {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState<number>(1)
    const [croppedAreaPixels, setCroppedAreaPixels] =
        useState<Area | null>(null)

    const onCropComplete = (
        _: Area,
        croppedAreaPixels: Area
    ) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    return {
        crop,
        zoom,
        setCrop,
        setZoom,
        croppedAreaPixels,
        onCropComplete,
    }
}