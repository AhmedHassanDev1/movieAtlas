
export type userUpdate = {
    userId: string;
    user_name?: string;
    bio?: string
}

export type UpdateAvatarType={
    userId:string
    fileBuffer:Buffer
}