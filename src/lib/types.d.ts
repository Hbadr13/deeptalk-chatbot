import { User } from "@prisma/client";

interface UserInfo extends User {
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    user: UserInfo;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserInfo;
  }
}

declare module NodeJS {
  interface ProcessEnv {
    SMPT_EMAIL: string;
    SMTP_GMAIL_PASS: string;
  }
}
