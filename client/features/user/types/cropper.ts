import { Area, Point } from "react-easy-crop"

export type CropState = {
  crop: Point
  zoom: number
}

export type CropResult = {
  croppedAreaPixels: Area
}