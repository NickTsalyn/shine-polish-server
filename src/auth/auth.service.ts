import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { SignInDto, SignUpDto } from "./dto";
import { AppError } from "src/common/constants";
import { PasswordService } from "./password.service";
import { User } from "src/users/users.model";
import { TokensService } from "./tokens.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly tokensService: TokensService
  ) {}

  private async validateUser(dto: SignInDto) {
    const user: User = await this.userService.findOneByEmail(dto.email);
    if (!user) throw new UnauthorizedException({ message: AppError.WRONG_DATA });

    const passwordEquals = await this.passwordService.comparePassword(
      dto.password,
      user.password
    );
    if (user && passwordEquals) return user;

    throw new UnauthorizedException({ message: AppError.WRONG_DATA });
  }

  async signup(dto: SignUpDto, agent: string) {
    const isExistUser: User = await this.userService.findOneByEmail(dto.email);
    if (isExistUser) throw new ConflictException(AppError.USER_EXIST);

    const hashPassword = await this.passwordService.hashPassword(dto.password);
    const newUser: User = await this.userService.save({
      ...dto,
      password: hashPassword,
    });
    const { accessToken } = await this.tokensService.generateTokens(newUser, agent);

    return {
      accessToken,
      user: {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        roles: newUser.roles,
      },
    };
  }

  async signin(dto: SignInDto, agent: string) {
    const user: User = await this.validateUser(dto);
    const { accessToken, refreshToken } = await this.tokensService.generateTokens(user, agent);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        roles: user.roles,
      },
    };
  }
}
