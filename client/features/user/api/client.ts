import { protectedApi, publicApi } from "@/api"
import { updateUserType, UserType } from "../types/user"



export const GetMe = async () => {
    try {
        return (await protectedApi.get("/user/me")).data;
    } catch (error: any) {
        if (error.response?.status === 401) {
            return null;
        }

        throw error;
    }
};

export const GetProfileInfo = async (userId: string): Promise<UserType> => {
    return (await protectedApi.get(`user/${userId}`)).data
}


export const UpdateAvatar = async (blob: Blob) => {


    const formData = new FormData()

    formData.append("avatar", blob, "avatar.jpg")

    try {
        const res = await protectedApi.patch(
            "user/me/avatar",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        )

        return res.data
    } catch (err) {
        console.error("Avatar upload failed", err)
        throw err
    }

}



export const UpdateProfileInfo = async (data: updateUserType) => {


    try {

        const res = await protectedApi.patch("/user/me", data)

        return res.data
    } catch (err) {
        console.error("Avatar upload failed", err)
        throw err
    }

}

export type getUserTitleInteractionParametersType = {
    userId: string | undefined
    type: "rating" | "watchlist" | "watched",
    limit?: number,
    page?: number
}



export const getUserTitleInteraction = async ({
    userId,
    type,
    limit = 10,
    page = 1
}: getUserTitleInteractionParametersType) => {
    return (await publicApi.get(`${process.env.NEXT_PUBLIC_BASE_API}/user/${userId}/${type}`, {
        params: {
            limit,
            page
        }
    })).data
}


