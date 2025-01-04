import { Link } from "react-router-dom"
import Image from "./Image"
import {format} from 'timeago.js'
import Skeleton from 'react-loading-skeleton'

const Post = ({post}) => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
        {/* image */}
         <Link to={`/${post.slug}`}  className="md:hidden xl:block xl:w-1/3 cursor-pointer">
            {post.img && <Image
            src={post.img}
            className="rounded-2xl object-cover"
            w="765"
            h="465"
            />}
         </Link>
         {/* details */}
         <div className="flex flex-col gap-4 xl:w-2/3">
            <Link to={`/${post.slug}`} className="text-4xl font-semibold">{post.title}</Link>
            <div className="flex items-center gap-2  text-gray-400 text-sm">
                <span>Written by</span>
                <Link to={`/posts?author=${post?.user?.username}`} className="dark:text-sky-600 text-blue-800">{post.user?.username}</Link>
                <span>on</span>
                <Link className="dark:text-sky-600 text-blue-800">{post.category}</Link>
                <span>{format(post.createdAt)}</span>
            </div>
            <p className="text-justify">{post.desc.length > 350 ? `${post.desc.slice(0, 350)}...` : post.desc}</p>
                <Link to={`/${post.slug}`} className="text-sm underline dark:text-sky-600 text-blue-800 ">Read More</Link>
         </div> 
    </div>
  )
}

export default Post