import useAuth from "@/hooks/useAuth"
import { useForm, Controller } from "react-hook-form"
import { updateUserType } from "../types/user"
import { Box, Button, TextField } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { UpdateProfileInfo } from "../api/client"
import { useEffect } from "react"




function EditeProfileForm() {
    const { data, refetch } = useAuth()
    const { mutateAsync, isPending } = useMutation({
        mutationFn: UpdateProfileInfo,
        mutationKey: ["update profile info", data?.id]
    })
    const { handleSubmit, control, formState, reset } = useForm<updateUserType>({
        defaultValues: {
            user_name: data?.user_name,
            bio: data?.bio
        }
    })

    useEffect(() => {
        if (data) {
            reset({
                user_name: data.user_name,
                bio: data.bio ?? ""
            })
        }
    }, [data, reset])

    const { isDirty, isSubmitted } = formState
    const saveChange = async (payload: updateUserType) => {
        try {
            const body: updateUserType = {
                user_name: payload.user_name || data?.user_name || " ",
                bio: payload.bio || data?.bio || " "
            }
            await mutateAsync(body)
            refetch()
        } catch (error) {

        }
    }
    return (
        <form onSubmit={handleSubmit(saveChange)}>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                gap: 2,
                padding: 4
            }}>
                <Controller
                    name="user_name"
                    control={control}
                    rules={{
                        required: true
                    }}
                    render={({ field }) => {
                        return <TextField
                            {...field}
                            value={field.value ?? ""}

                            label="user name"
                            variant="outlined"
                            required />
                    }} />

                <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => {
                        return <TextField
                            {...field}
                            value={field.value ?? ""}
                            label="bio"
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                    }} />
                <Button
                    type="submit"
                    loading={isPending}
                    disabled={isPending || !isDirty}>
                    Save Changes
                </Button>
            </Box>
        </form>
    )
}

export default EditeProfileForm
