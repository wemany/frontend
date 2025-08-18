declare module "jwt-decode" {
  export interface JwtPayload {
    userId?: string;
    iat?: number;
    exp?: number;
  }
}
