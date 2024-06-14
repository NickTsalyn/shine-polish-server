import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Observable } from "rxjs";
import { AppError } from "src/helpers";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() as Request;

    try {
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];

      if (bearer !== "Bearer" || !token) throw new UnauthorizedException({ message: AppError.UNAUTHORIZED });

      const session = this.jwtService.verify(token);
      req["session"] = session;

      return true;
    } catch (error) {
      throw new UnauthorizedException({ message: AppError.UNAUTHORIZED });
    }
  }
}
