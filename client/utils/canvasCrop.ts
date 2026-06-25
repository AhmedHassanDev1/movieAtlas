
import { Area } from "react-easy-crop"

export const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area
): Promise<Blob> => {
  const image = await createImage(imageSrc)

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  if (!ctx) throw new Error("Canvas not supported")

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) throw new Error("Crop failed")
      resolve(blob)
    }, "image/jpeg")
  })
}

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve(img)
    img.onerror = reject
  })