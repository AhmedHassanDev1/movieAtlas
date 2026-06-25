


export type AvatarType = {
    public_id: string
    url: string
}
export type UserType = {
    id: string
    user_name: string
    email: string
    bio?:string
    avatar: AvatarType | null
    created_at:string
}

export type updateUserType={
     user_name:string
     bio:string
}