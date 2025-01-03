import { Link, Navigate } from "react-router-dom"
import Image from "./Image"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { format } from "timeago.js"

const fetchPost = async() => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/post?featured=true&limit=4&sort=newest`)
    return res.data
  }

const FeaturedPosts = () => {
    const{data,isPending,error,status} = useQuery({
        queryKey:["featuredPosts"],
        queryFn:()=>fetchPost()
       })

    if (isPending) return "Loading..."
    if(error) return <Navigate to='/404' state={{ errorMessage: error.message }}/>
    const posts = data.posts
    if(!posts || posts.lenght === 0) return <Navigate to='/404' state={{ errorMessage: "Post not found" }}/>

  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
        {/* main */}
        {posts[0] && <div className="w-full lg:w-1/2 flex flex-col gap-4" key={posts[0]._id}>
        <Link to={`/${posts[0]?.slug}`}>
        <Image src={posts[0]?.img} 
        className="rounded-3xl object-cover"
        w='895'
        h="465"
        />
        </Link>
        <div className="flex gap-4 items-center">
            <h1 className="font-semibold lg:text-lg">01.</h1>
            <Link to={`/posts?${posts[0]?.category}`} className="text-blue-800 dark:text-blue-400 lg:text-lg">{posts[0]?.category}</Link>
            <span className="text-gray-500 dark:text-gray-400">{format(posts[0]?.createdAt)}</span>
        </div>
        <Link to={`/${posts[0]?.slug}`} className="text-xl font-semibold lg:text-3xl lg:font-bold">{posts[0]?.title}</Link>
        </div>}

        <div className="w-full lg:w-1/2 flex flex-col gap-4">

        {/* 1st side post */}
        {posts[1]&&<div className="lg:h-1/3 flex justify-between gap-4" key={posts[1]._id}>
        <Link to={`/${posts[1]?.slug}`}>
        <Image 
        src={posts[1]?.img}
        className='rounded-3xl object-cover object-center aspect-video'
        w='298'
        h="160"
        />
        </Link>
        <div className="w-2/3">
        {/* title */}
        <div className="flex gap-4 items-center mb-4 text-sm lg:text-lg">
            <h1 className="font-semibold">01.</h1>
            <Link to={`/posts?${posts[1]?.category}`} className="text-blue-800 dark:text-blue-400 ">{posts[1]?.category}</Link>
            <span className="text-gray-500 dark:text-gray-400">{format(posts[1]?.createdAt)}</span>
        </div>
        {/* details */}
        <Link to={`/${posts[1]?.slug}`} className="font-medium text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">
        {posts[1]?.title}
        </Link>
        </div>
        </div>}

        {/* 2nd side post */}
        {posts[2]&&<div className="lg:h-1/3 flex justify-between gap-4" key={posts[2]._id}>
        <Link to={`/${posts[2]?.slug}`}>
        <Image 
        src={posts[2]?.img}
        className='rounded-3xl object-cover aspect-video'
        w='298'
        h='160'
        />
        </Link>
        <div className="w-2/3">
        {/* title */}
        <div className="flex gap-4 items-center mb-4 text-sm lg:text-lg">
            <h1 className="font-semibold">02.</h1>
            <Link to={`/posts?${posts[2]?.category}`} className="text-blue-800 dark:text-blue-400 ">{posts[2]?.category}</Link>
            <span className="text-gray-500 dark:text-gray-400">{format(posts[2]?.createdAt)}</span>
        </div>
        {/* details */}
        <Link to={`/${posts[2]?.slug}`} className="font-medium text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">
        {posts[2]?.title}
        </Link>
        </div>
        </div>}

        {/* 3rd side post */}
       {posts[3]&& <div className="lg:h-1/3 flex justify-between gap-4" key={posts[3]._id}>
        <Link to={`/${posts[3]?.slug}`}>
        <Image 
        src={posts[3]?.img}
        className='rounded-3xl object-cover  aspect-video'
        w='298'
        h="160"
        />
        </Link>
        <div className="w-2/3">
        {/* title */}
        <div className="flex gap-4 items-center mb-4 text-sm lg:text-lg">
            <h1 className="font-semibold">03.</h1>
            <Link to={`/${posts[3]?.category}`} className="text-blue-800 dark:text-blue-400 ">{posts[3]?.category}</Link>
            <span className="text-gray-500 dark:text-gray-400">{format(posts[3]?.createdAt)}</span>
        </div>
        {/* details */}
        <Link to={`/${posts[3]?.slug}`} className="font-medium text-base sm:text-lg md:text-2xl lg:text-xl xl:text-2xl">
        {posts[3]?.title}
        </Link>
        </div>
        </div>}

        </div>
    </div>
  )
}

export default FeaturedPosts