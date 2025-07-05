import React from 'react'
import { Button } from './ui/button'
import { SignInGithub } from '@/lib/auth/action'
import { usePathname } from 'next/navigation'

const OauthLogin = () => {
  const pathname = usePathname()
  const isSignUpPage = pathname === '/signup'

  return (
   <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Button
                variant="outline"
                className="w-full border-[#6E00FF]/30 hover:bg-[#6E00FF]/10 text-white bg-transparent"
                onClick={() => console.log("Google login")}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {/* show signin text if the pathname is signin else show signout */}
                {isSignUpPage ? 'Sign Up with Google' : 'Sign In from Google'}
              </Button>
              <Button
                variant="outline"
                className="w-full border-[#6E00FF]/30 hover:bg-[#6E00FF]/10 text-white bg-transparent"
                onClick={SignInGithub}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 
           3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
           0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61 
           -.546-1.385-1.333-1.754-1.333-1.754-1.09-.744.084-.729.084-.729 
           1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 
           3.492.998.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.93 
           0-1.31.468-2.38 1.236-3.22-.135-.303-.54-1.523.105-3.176 
           0 0 1.005-.322 3.3 1.23a11.52 11.52 0 0 1 3-.405c1.02.005 
           2.045.138 3 .405 2.28-1.552 3.285-1.23 
           3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 
           1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 
           5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 
           3.286 0 .315.21.694.825.576C20.565 22.092 24 
           17.592 24 12.297c0-6.627-5.373-12-12-12"
                  />
                </svg> 
                {/* show signin text if the pathname is signin else show signout */}
                {isSignUpPage ? 'Sign Up with GitHub' : 'Sign In from GitHub'}
              </Button>
            </div>
  )
}

export default OauthLogin