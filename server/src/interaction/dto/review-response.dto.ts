import { Expose } from "class-transformer"
import { IsNotEmpty } from "class-validator"



export class ReviewBodyDTO {
    @IsNotEmpty()
    content: string
}

export class ReviewResponseDTO {
    @Expose()
    id: string

    @Expose()
    title_id: string

    @Expose()
    content: string

    @Expose()
    name: string
    
    @Expose()
    source: string

    @Expose()
    user_id: string

    @Expose()
    avatar_path: string

    @Expose()
    create_at: string
}