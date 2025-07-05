"use server"

import { signIn } from "./auth"

export const SignInGithub = async () => {
    await signIn("github", {
        redirectTo: "/",
    })
}

export const SignOut = async () => {
    await signIn("github", {
        redirectTo: "/",
    })
}