import { useEffect, useRef, useState } from "react"
import Image from "./Image";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, useAuth, UserButton } from "@clerk/clerk-react";
import useTheme from "../context/ThemeContext";
import SunMoonToggle from "../utils/SunMoonToggle";
import { dark, neobrutalism } from "@clerk/themes";

const Navbar = () => {
    const [open,setOpen] = useState(false)
    const{theme,toggleTheme} = useTheme()
    const {getToken} = useAuth()
 

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"; // Prevent scrolling
        } else {
            document.body.style.overflow = "auto"; // Enable scrolling
        }
        return () => {
            document.body.style.overflow = "auto"; // Clean up
        };
    }, [open]);


  return (
    <div className="flex relative items-center w-full h-16 md:h-20 justify-between">
        <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
            <Image src="logo.png" w={32} h={32} alt="dev logo"/>
            <span>devlog</span>
        </Link>
        {/* mobile menu */}
        <div className="flex md:hidden">
            <div className="cursor-pointer gap-[0.35rem]  flex flex-col justify-center items-center text-3xl active:scale-110 transition-all duration-300 ease-in-out" onClick={()=>setOpen(prev=>!prev)}>
            <span className={`bg-neutral-950 dark:bg-neutral-200 block transition-all duration-300 ease-out 
                    h-0.5 w-7 rounded-sm ${open ? 'rotate-45 translate-y-2.5' : ''}`} >
            </span>
            <span className={`bg-neutral-950 dark:bg-neutral-200 block transition-all duration-300 ease-out 
                            h-0.5 w-7 rounded-sm my-0.5 ${open ? 
                            'opacity-0' : 'opacity-100'
                            }`} >
            </span>
            <span className={`bg-neutral-950 dark:bg-neutral-200 block transition-all duration-300 ease-out 
                            h-0.5 w-7 rounded-sm ${open ? 
                            '-rotate-45 -translate-y-2.5' : ''
                            }`} >
            </span>
            </div>
            {
            <div className={`w-full bg-[#e6e6ff] dark:bg-[#1a202c]  h-screen flex flex-col 
            justify-start pt-16 items-center fixed top-16 gap-12
            text-2xl font-bold shadow-lg shadow-black
            transition-[right, opacity] duration-300 ease-in-out 
            ${open?"right-0 opacity-100":"-right-[100%] opacity-50"}`}>
            <Link className="" to="/">Home</Link>
            <Link to="/posts?sort=trending">Trending</Link>
            <Link to="/posts?sort=most-popular">Most Popular</Link>
            <Link to="/about">About</Link>
            <Link to="/">
            <button  className="py-2.5 px-6 rounded-3xl bg-blue-800 shadow-lg shadow-blue-800/50 text-white">Login <span className=" cursor-pointer" >👋</span></button>
            </Link>
            <SunMoonToggle/>
            </div>
            }
        </div>
        {/* desktop menu */}
        <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
            <Link  to="/">Home</Link>
            <Link to="/posts?sort=trending">Trending</Link>
            <Link to="/posts?sort=most-popular">Most Popular</Link>
            <Link to="/about">About</Link>
            {/* <button className={`text-sm rounded-full 
            ${theme==='light'?"bg-slate-800 text-neutral-200 shadow-slate-900 ":
                "bg-stone-200 text-neutral-900 shadow-stone-200 "}  p-1 shadow-md `}
             onClick={toggleTheme}>{theme==="light"?"light":"dark"}</button> */}
             <SunMoonToggle/>
            <SignedOut>
            <Link to="/login">
            <button  
            className="py-2 px-4 rounded-3xl bg-blue-800 shadow-lg
             shadow-blue-800/50 text-white">
                Login 
                <span className="cursor-pointer"
                 >👋</span>
                 </button>
            </Link>
            </SignedOut>
            <SignedIn>
                <div className="flex justify-center items-center w-11 h-11">
            <UserButton 
            appearance={{
                baseTheme:theme==="dark"?dark:neobrutalism,
                elements:{
                    avatarBox:"w-fit h-fit"
                }
            }}
            />
            </div>
            </SignedIn>
        </div>
    </div>
  )
}

export default Navbar