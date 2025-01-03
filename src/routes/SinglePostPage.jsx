import { Link, Navigate, useParams } from "react-router-dom"
import Image from "../Components/Image" 
import PostActions from "../Components/PostActions"
import Search from "../Components/Search"
import Comments from "../Components/Comments"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { format } from "timeago.js"
import ReactHtmlParser from 'react-html-parser';

const fetchPost = async(slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/${slug}`)
  return res.data
}

const SinglePostPage = () => {

const {slug} = useParams()

 const{data,isPending,error,status} = useQuery({

  queryKey:["post",slug],
  queryFn:()=>fetchPost(slug)
 })

 

 if (isPending) return "Loading..."
 if(error) return <Navigate to='/404' state={{ errorMessage: error.message }}/>
 if(!data) return console.log(status)
  return (
    <div className={`flex flex-col gap-8 ${isPending?"animate-pulse":""}`}>
      {/* details */}
      <div className="flex gap-8">
      <div className="lg:w-3/5 flex flex-col gap-8">
      <Link className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">{data.title}</Link>
            <div className="flex items-center gap-2  text-gray-500 text-sm">
                <span>Written by</span>
                <Link className="dark:text-sky-600 text-blue-800">{data?.user?.username}</Link>
                <span>on</span>
                <Link className="dark:text-sky-600 text-blue-800">{data.category}</Link>
                <span>{format(data?.createdAt)}</span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              {data.desc}</p>
      </div>
        <div className="hidden lg:block w-2/5">
        {isPending &&  <Image w="600"
          className="rounded-2xl animate-pulse"
          /> }
          {data?.img && <Image w="600"
          h="400"
          className="rounded-2xl"
          src={data?.img}
          />}
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-8 text-justify">
      {/* text */}
      <div className="flex flex-col gap-6 md:text-xl 	flex-auto">
      <div
      dangerouslySetInnerHTML={{ __html: data.content }}
      className=" leading-relaxed space-y-2 "
      style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
    />
      </div>
      {/* menu */}
      <div className="px-4 h-max sticky top-8">
        <h1 className=" mb-4 font-medium">Author</h1>
        <div className="flex flex-col gap-4">
          <div className="flex gap-8 items-center">
        {data.user?.img &&  <img
          src={`${data.user?.img}?w=48&h=48&q=70`}
          className="w-12 h-12 rounded-full object-cover"
          />}
          <Link className="text-blue-800 dark:text-sky-500">{data.user?.username}</Link>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">Lorem ipsum, dolor sit amet consectetur</p>
          {data &&
            <div className="flex gap-2">
            <Link>
            <Image 
            src="facebook.svg"
            />
            </Link>
            <Link>
            <Image 
            src="instagram.svg"
            />
            </Link>
          </div>}
        <PostActions post={data}/>
        <div>
          <h1 className="mt-8 mb-4 font-medium">Categories</h1>
          <div className="flex flex-col gap-2 py-2 text-sm">
            <Link to="/posts?cat=web-design" className="underline">Web design</Link>
            <Link to="/posts?cat=development" className="underline">Development</Link>
            <Link to="/posts?cat=seo" className="underline">Search Engines</Link>
            <Link to="/posts?cat=marketing" className="underline">Marketing</Link>
            <Link to="/posts?cat=games" className="underline">Games</Link>
          </div>
        </div>
        <h1 className="mt-8 mb-4 font-medium">Search</h1>
        <Search/>
        </div>
      </div>
      </div>
      <Comments postId={data?._id}/>
    </div>
  )
}

export default SinglePostPage