import { IsOptional, IsString } from "class-validator";


export class EditeProfileDTO {
    @IsOptional()
    @IsString()
    user_name?: string

    @IsOptional()
    @IsString()
    bio?: string
}
