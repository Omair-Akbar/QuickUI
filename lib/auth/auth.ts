import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

export const { signIn, signOut, auth, handlers } = NextAuth({
  providers: [
    Github
  ]
})