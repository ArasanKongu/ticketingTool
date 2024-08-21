import "dotenv/config";

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length == 0) {
    throw Error("JWT Secret Not Setupped");
}

if (!process.env.ACCESS_KEY || process.env.ACCESS_KEY.length == 0) {
    throw Error("JWT Secret Not Setupped");
}

export const AuthenticationConfig: { secret: string } = {
    secret: process.env.JWT_SECRET ?? "",
};

export interface AuthenticationParams {
    id: number;
}