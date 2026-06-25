"use client"

import { UpdateAvatar } from '@/features/user/api/client'
import { AvatarCropperDialog } from '@/features/user/components/AvatarCropper/AvatarCropperDialog'
import EditeProfileForm from '@/features/user/components/EditeProfileForm'
import UserAvatar from '@/features/user/components/UserAvatar'
import useAuth from '@/hooks/useAuth'
import { getCroppedImg } from '@/utils/canvasCrop'
import { Button, Divider, Grid, Paper, Typography } from '@mui/material'
import { queryClient } from '@/design-system/components/providers'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useRef, useState } from 'react'
import { Area } from 'react-easy-crop'



function Page() {
  const t = useTranslations("user")
  const { data, refetch } = useAuth()
  const [open, setOpen] = useState(false)
  const prevUrl = useRef<string | null>(null)

  const [image, setImage] = useState<string | null>(null)
  const { mutateAsync, isPending } = useMutation({
    mutationFn: UpdateAvatar,
    mutationKey: ["update avatar", data?.id],
    onSuccess: () => {
      refetch()
    }
  })
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return
    const maxSize = 2 * 1024 * 1024

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp"
    ]

    if (file.size > maxSize) return

    if (!allowedTypes.includes(file.type)) return

    if (prevUrl.current) {
      URL.revokeObjectURL(prevUrl.current)
    }

    const url = URL.createObjectURL(file)

    prevUrl.current = url

    setImage(url)
    setOpen(true)
  }

  return (
    <>
      <Paper
        sx={{
          width: "90%",
          maxWidth: "md",
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)"
        }}>
        <Typography variant='h3' sx={{ padding: 2, }}>{t("editeProfile")}</Typography>
        <Divider />
        <Grid container columnSpacing={2} rowSpacing={2} sx={{ padding: 3 }}>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center"
            }}>
            <UserAvatar avatar={data?.avatar?.url} user_name={data?.user_name} />
            <Typography variant='h5'>Upload Image</Typography>
            <Typography variant='h6'>max file size is 2MB</Typography>
            <label htmlFor="avatar-upload">
              <Button variant='outlined' component="span">
                Upload
              </Button>
            </label>
            <input
              id='avatar-upload'
              type='file'
              multiple={false}
              accept="image/png, image/jpeg, image/webp"
              className='hidden'
              onChange={onSelectFile}
            />
          </Grid>

          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{
              borderInlineStart: {
                md: "3px dashed #333333"
              },
              borderBlockStart: {
                xs: "3px dashed #333333",
                md: "none"
              },

            }}
          >
            <EditeProfileForm />
          </Grid>
        </Grid>

      </Paper>
      <AvatarCropperDialog
        open={open}
        image={image as string}
        onClose={() => setOpen(false)}
        isPending={isPending}
        onSave={async (croppedAreaPixels:Area) => {
          if (!image) return

          const blob = await getCroppedImg(image, croppedAreaPixels)

          await mutateAsync(blob)
          await queryClient.invalidateQueries({
            queryKey: ["me"],
          });
          setOpen(false)

        }}
      />
    </>
  )
}

export default Page
