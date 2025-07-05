"use server"

import { signIn, signOut } from "./auth"

export const SignInGithub = async () => {
    await signIn("github", {
        redirectTo: "/",
    })
}

export const SignOut = async () => {
    await signOut({
        redirectTo: "/",
    })
}