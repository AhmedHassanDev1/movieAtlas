import { createParamDecorator, ExecutionContext, UnauthorizedException } from "@nestjs/common";

export const User = createParamDecorator(
  (key: string | undefined, ctx: ExecutionContext) => {

    const req = ctx.switchToHttp().getRequest();

    if (!req.user) {
      throw new UnauthorizedException(
        "User not found in request"
      );
    }

    return key
      ? req.user[key]
      : req.user;
  },
);