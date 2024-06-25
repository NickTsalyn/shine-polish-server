import { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { IJwtPayload } from 'src/common/interfaces';

export const SessionInfo = createParamDecorator(
    (key: keyof IJwtPayload, ctx: ExecutionContext): IJwtPayload | Partial<IJwtPayload> => {
        const request = ctx.switchToHttp().getRequest();
        return key ? request.user[key] : request.user;
    },
);