import { OmitType } from "@nestjs/swagger";
import { Expose } from "class-transformer"
import { TitleEntity } from "src/title/dto/Title-response.dto";


export class SearchResultResponeDTO extends OmitType(TitleEntity, ['backdrop_path'] as const) {
    @Expose()
    score: number
}