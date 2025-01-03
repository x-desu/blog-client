import { SignIn } from "@clerk/clerk-react"
import { dark, neobrutalism } from '@clerk/themes'
import useTheme from "../context/ThemeContext"
export const LoginPage = () => {
  const{theme} = useTheme()
  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
      <SignIn
       appearance={{baseTheme: theme==="dark"?dark:neobrutalism}}
        signUpUrl="/register"
      />
    </div>
  )
}

export default LoginPage
