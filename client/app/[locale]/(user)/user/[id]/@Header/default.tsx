"use client"
import ProfileContainer from "@/features/user/components/ProfileContainer"

import { use } from "react"
import { ParamsType } from "../page"


function Default({ params }: ParamsType) {
  const { id } =use(params)
  return <ProfileContainer userId={id} />


}

export default Default
