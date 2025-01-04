import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import Post from "./Post"
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import useTheme from "../context/ThemeContext";
const PostList = () => {

  const [searchParams,setSearchParams] = useSearchParams()
  const{theme,toggleTheme} = useTheme()
  const fetchPost = async(pageParam,searchParams) => {
    const searchParamsObj = Object.fromEntries([...searchParams])
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/post`,{
        params:{page:pageParam,limit:10,...searchParamsObj}
      })
      return res.data
    } catch (error) {
      console.log("error fetching data: ",error)
    }
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['posts',searchParams.toString()],
    queryFn: ({pageParam = 1})=>fetchPost(pageParam,searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => lastPage.hasMore ? pages.length + 1 : undefined,
  })

  
  if(status === "error") return "Something went wrong!";  

  const allPosts = data?.pages?.flatMap(page=>page.posts) || []
  const loading = status === "loading" || isFetching;
  if(loading && !hasNextPage){
    return(
      <SkeletonTheme baseColor={theme==='dark'?"#202020":"#ebebeb"} highlightColor={theme==='dark'?'#444':"#fbfbfb"}>
      <div className="flex xl:flex-row flex-col  gap-4">
      {<Skeleton  className=" rounded-2xl md:hidden h-60 sm:h-96 md:h-40 xl-40 2xl:h-60" containerClassName="rounded-2xl xl:block xl:w-1/3 md:hidden" enableAnimation={true}/>||<h1>loading...</h1>}
      <div className="flex flex-col xl:w-2/3 gap-4">
      {<Skeleton count={2} className="animate-pulse " containerClassName="md:text-3xl text-3xl " enableAnimation={true}/>||<h1>loading...</h1>}
      {<Skeleton count={1} className="animate-pulse " containerClassName="w-1/3" enableAnimation={true}/>||<h1>loading...</h1>}
      {<Skeleton count={3} className="animate-pulse" enableAnimation={true}/>||<h1>loading...</h1>}
      {<Skeleton count={1} className="animate-pulse" containerClassName="w-1/5" enableAnimation={true}/>||<h1>loading...</h1>}
      </div>
      </div>
      </SkeletonTheme>
    )
  }
  return (
    <InfiniteScroll
    className="flex flex-col gap-12 mb-8"
    dataLength={allPosts.length} //This is important field to render the next data
    next={fetchNextPage}
    hasMore={!!hasNextPage}
    loader={
      isFetchingNextPage ? (
        <SkeletonTheme baseColor={theme==='dark'?"#202020":"#ebebeb"} highlightColor={theme==='dark'?'#444':"#fbfbfb"}>
        <div className="flex xl:flex-row flex-col  gap-4">
        {<Skeleton  className=" rounded-2xl md:hidden h-60 sm:h-96 md:h-40 xl-40 2xl:h-60" containerClassName="rounded-2xl xl:block xl:w-1/3 md:hidden" enableAnimation={true}/>||<h1>loading...</h1>}
        <div className="flex flex-col xl:w-2/3 gap-4">
        {<Skeleton count={2} className="animate-pulse " containerClassName="md:text-3xl text-3xl " enableAnimation={true}/>||<h1>loading...</h1>}
        {<Skeleton count={1} className="animate-pulse " containerClassName="w-1/3" enableAnimation={true}/>||<h1>loading...</h1>}
        {<Skeleton count={3} className="animate-pulse" enableAnimation={true}/>||<h1>loading...</h1>}
        {<Skeleton count={1} className="animate-pulse" containerClassName="w-1/5" enableAnimation={true}/>||<h1>loading...</h1>}
        </div>
        </div>
        </SkeletonTheme>
      ) : null
    }
    scrollThreshold={0.8}
    endMessage={
      <p>
        <b>All posts loaded</b>
      </p>
    }>
    {allPosts.map(post=>(
        <Post key={post._id}
          post={post}
         
        />
      ))}
  </InfiniteScroll>
  )
}

export default PostList