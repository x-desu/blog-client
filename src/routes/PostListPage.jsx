import { useState } from "react"
import PostList from "../Components/PostList"
import SideMenu from "../Components/SideMenu"
import { useSearchParams } from "react-router-dom"

const PostListPage = () => {
  const [open, setOpen] = useState(false)
  const [searchParams] = useSearchParams()
  const search = searchParams.get('search')
  const cat = searchParams.get('cat')
  return (
    <div  >
      <h1 className="mb-8 text-2xl">{cat||search||null}</h1>
      <button onClick={()=>setOpen(prev=>!prev)} className="mb-4 bg-blue-800 md:hidden rounded-xl text-sm text-white px-4 py-2">{open?"Close":"Filter or Search"}</button>
      <div className="flex flex-col-reverse md:flex-row gap-8 ">
        <div className="md:flex-1">
          <PostList/>
        </div>
        <div className={`${open?"block":"hidden"} md:block`}>
          <SideMenu/>
        </div>
      </div>
    </div>
  )
}

export default PostListPage