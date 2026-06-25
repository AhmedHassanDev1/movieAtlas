import { Expose } from "class-transformer";


export class AvatarDTO {
    @Expose()
    url: string

    @Expose()
    public_id: string
}
export class UserReponseDTO {
    @Expose()
    id: string

    @Expose()
    email: string

    @Expose()
    user_name: string

    @Expose()
    is_verify: boolean

    @Expose()
    bio: string
    
    @Expose()
    created_at:string

    @Expose()
    avatar: AvatarDTO | null
}