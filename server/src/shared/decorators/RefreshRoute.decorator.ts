import { SetMetadata } from "@nestjs/common";


export const IS_REFRESH = "IS_REFRESH";

export const RefreshRoute = () =>
    SetMetadata(IS_REFRESH, true);