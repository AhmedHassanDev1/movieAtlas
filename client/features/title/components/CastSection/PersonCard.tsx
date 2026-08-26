"use client"

import { genImageUrl } from '@/utils/url'
import { CastType } from '../../types/person'
import Image from 'next/image'
import { Button, Typography } from '@mui/material'
import { useState } from 'react'
import { useTranslations } from "next-intl";
function PersonCard({ person }: { person: CastType }) {
  const profileUrl = genImageUrl(person.person.profile_path, "poster") || "/default-profile-img.jfif"
  const [url,setUrl]=useState(profileUrl)
  const info = person.person
  const t = useTranslations("button");
  return (
    <div className='w-full aspect-[10/14] relative rounded-2xl cursor-pointer overflow-hidden group'>
      <Image
        src={url}
        onError={()=>setUrl("/default-profile-img.jfif")}
        fill
        alt={`profile image for${info.name}`}
        className="object-cover  group-hover:scale-120 duration-300 "
        objectFit='cover'
        objectPosition='center'
      />

      <div className="absolute h-1/3 bottom-0 inset-x-0 backdrop-blur-xl p-3 ">
        <Typography
          variant="h6"
          sx={{ textAlign: "center", fontWeight: 600 }}>
          {info.name}
        </Typography>
        <Button sx={{backgroundColor:"black"}}>{t("addFavorite")}</Button>
      </div>
    </div>
  )
}

export default PersonCard
