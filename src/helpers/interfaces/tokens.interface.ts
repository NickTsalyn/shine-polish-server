import { Token } from "src/auth/schemas/tokens.model";

export interface Tokens {
  accessToken: string;
  refreshToken: Token;
}
