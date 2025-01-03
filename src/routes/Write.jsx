import { useAuth, useUser } from "@clerk/clerk-react"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ReactQuill,{ Quill } from "react-quill-new"
import "react-quill-new/dist/quill.snow.css";
import useTheme from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IKContext, IKImage, IKUpload } from 'imagekitio-react';
import Upload from "../Components/Upload";
import Image from "../Components/Image";

const Write = () => {

  const {isSignedIn,isLoaded} = useUser()
  const [value, setValue] = useState('')
  const [cover,setCover] = useState('')
  const [img,setImg] = useState('')
  const [video,setVideo] = useState('')
  const [progress,setProgress] = useState(0)
  const [localUrl,setLocalUrl] = useState('')
  const{theme} = useTheme()
  
  
  useEffect(()=>{
    img && setValue(prev=>prev+`<p><image src="${img.url}" /></p>`)
  },[img])
  useEffect(()=>{
    video && setValue(prev=>prev+`<p><iframe class="ql-video" src="${img.url}" /></p>`)
  },[video])

  const navigate = useNavigate()
  const {getToken} = useAuth()
  
  const {mutate,isPending,isError,error} = useMutation({
    mutationFn:async(newPost)=>{
      const token = await getToken()
      return axios.post(`${import.meta.env.VITE_API_URL}/post`,newPost,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    },
    onSuccess:(res)=>{
      toast.success("Post has been created",{
        theme:theme
      })
      navigate(`/${res.data.slug}`)
    },
    onError:(err)=>{
      console.log("error",err)
    }
  })
  
  if(isLoaded && !isSignedIn){
    return <div className="">You should login!</div>
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e.target)
    const formData = new FormData(e.target)
    const data = {
        img:cover.filePath || "",
      ...Object.fromEntries(formData.entries()),
      content:value
    }
    console.log(data)
    mutate(data)
  }
  
  
  const modules = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ list: 'ordered'}, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['link','image'], // The image button will be available here
      ['clean']
    ],
    // Define a custom image handler

  };
  
  
  return (
    <div className={`${isLoaded?'':'animate-pulse'} relative md:h-[calc(100vh-80px) h-[calc(100vh-64px)]
    flex flex-col gap-6 `}>
      <h1 className="text-xl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6 ">
        <div className="flex items-center gap-4 mb-6">
        <Upload type="image" setLocalUrl={setLocalUrl} setProgress={setProgress} setData={setCover}>
        <button type="button" className="w-max text-gray-500 text-sm dark:bg-neutral-950/60 dark:text-gray-300 bg-slate-100 p-2 rounded-xl shadow-md">
        Add a cover image</button>
        </Upload>
        {
           localUrl && !cover?.url && <div className="aspect-video absolute left-40
            rounded-xl ml-10 shadow flex items-center justify-center ">
              <div className="relative">
              <img 
                src={localUrl}
                alt="preview"
                className={` blur-sm w-[220px] h-[120px] object-cover
                rounded-xl transition-opacity duration-500
                 ${progress<100?'opacity-100':'opacity-0'}`}
                />
                </div>
                <div className={`absolute inset-0 flex items-center justify-center
                  transition-opacity duration-500
                 ${progress<100?'opacity-100':'opacity-0'}`}>
                <div className=" w-8 h-8 border-4 border-t-4 border-b-neutral-300 border-solid rounded-full animate-spin border-t-transparent"></div>
              </div>
             </div>
        }
        {cover?.url&& <>
                <IKImage key={cover.url || 'default-key'}
                urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT} 
                src={cover.url}
                w="220"
                h="120"
                loading="lazy"
                lqip={{ active: true, quality: 20 }}
                transformation={[
                  { width:220,
                    height:120,
                   }
                ]}
                className={`aspect-video absolute left-40
                rounded-xl ml-10 shadow transition-opacity duration-500
                 ${progress<100?'opacity-0':'opacity-100'}`}
                />
              </>}
        </div>
        <input className="bg-transparent dark:text-gray-400 text-4xl font-semibold outline-hidden" 
        type="text" name="title" placeholder="My Awesome Story"/>
        <div className="flex gap-4 items-center">
          <label className="text-sm"  htmlFor="">Choose a Category:</label>
          <select name="category" className="rounded-xl p-2 dark:bg-neutral-950/60 bg-white shadow-md dark:text-gray-300"  id="">
            <option value="general">General</option>
            <option value="games">Games</option>
            <option value="web-design">Web Design</option>
            <option value="development">Development</option>
            <option value="databases">Databases</option>
            <option value="seo">Search Engines</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
        <textarea name="desc" className="rounded-xl dark:bg-neutral-950/60 p-2 bg-white shadow-md dark:text-gray-300"  placeholder="A Short Description"/>
        <div className="flex flex-1">
        <div className="flex flex-col gap-2 mr-2">
          <Upload type="image" setProgress={setProgress} setData={setImg}>
            🌆</Upload>
          <Upload type="video" setProgress={setProgress} setData={setVideo}>
            ▶️</Upload>
        </div>
        <ReactQuill   value={value} 
        onChange={setValue}
        readOnly={(0< progress && progress <100)}
        modules={modules} className="flex-1 rounded-xl dark:bg-neutral-950/60 bg-white shadow-md dark:text-gray-300" theme="snow"/>
        </div>
        <button disabled={isPending || (0< progress && progress <100)}
        className="bg-blue-800 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium rounded-xl mt-4 p-2 w-32"
        type="submit">
          {isPending?"Loading...":"Send"}</button>
          {isError && <span>{error.message}</span>}
      </form>
    </div>
  )
}


export default Write