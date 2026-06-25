import Cropper from "react-easy-crop"
import { Point, Area } from "react-easy-crop"

type Props = {
    image: string
    crop: Point
    zoom: number
    onCropChange: (crop: Point) => void
    onZoomChange: (zoom: number) => void
    onCropComplete: (croppedArea: Area, croppedAreaPixels: Area) => void
}

export function CropperCanvas({
    image,
    crop,
    zoom,
    onCropChange,
    onZoomChange,
    onCropComplete,
}: Props) {
    return (
        <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
        />
    )
}