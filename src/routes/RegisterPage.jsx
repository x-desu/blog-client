import { SignUp } from '@clerk/clerk-react'
import useTheme from '../context/ThemeContext'
import { dark, neobrutalism } from '@clerk/themes'

const RegisterPage = () => {
  const{theme} = useTheme()
  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
   <SignUp 
   appearance={{baseTheme: theme==="dark"?dark:neobrutalism}}
   signInUrl='/login'
   />
   </div>
  )
}

export default RegisterPage