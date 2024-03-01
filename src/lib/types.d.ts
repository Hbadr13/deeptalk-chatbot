import { User } from "@prisma/client";

interface User1 extends User {
  accessToken: string;
}

declare module "next-auth" {
  interface Session {
    user: User1;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User1;
  }
}

declare module NodeJS {
  interface ProcessEnv {
    SMPT_EMAIL: string;
    SMTP_GMAIL_PASS: string;
  }
}
