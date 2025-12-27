import { anonymousClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { admin, superadmin, ac } from "./access";

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        superadmin,
      },
    }),
    anonymousClient(),
  ],
});

export type Session = typeof authClient.$Infer.Session;
