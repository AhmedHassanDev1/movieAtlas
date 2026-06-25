import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";



export class RatingRequestDTO {
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(10)
    value: number
}
