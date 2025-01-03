import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"
import { ThemeProvider } from "../context/ThemeContext"
import { useEffect, useState } from "react"

const RootLayout = () => {
  
const[theme,setTheme] = useState(()=>sessionStorage.getItem('theme')||"light")
const toggleTheme = () => {
  setTheme((prev)=>{
    const newTheme = prev === "light"?"dark":'light'
    sessionStorage.setItem('theme',newTheme)
    return newTheme
  })
}

useEffect(()=>{
  document.querySelector('html').classList.remove('dark','Light')
  document.querySelector('html').classList.add(theme)
},[theme])

  return (
    <ThemeProvider value={{theme,toggleTheme}}>
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
    <Navbar toggleTheme={toggleTheme}/>
    <Outlet/>
    </div>
    </ThemeProvider>
  )
}

export default RootLayout