import { Token } from "src/auth/schemas/tokens.model";

export interface ITokens {
  accessToken: string;
  refreshToken: Token;
}
