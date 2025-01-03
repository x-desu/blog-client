import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import Post from "./Post"
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSearchParams } from "react-router-dom";

const PostList = () => {

  const [searchParams,setSearchParams] = useSearchParams()
  console.log(searchParams.toString())
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

  if(status === "loading") return "Loading...";
  if(status === "error") return "Something went wrong!";  

  const allPosts = data?.pages?.flatMap(page=>page.posts) || []
  
  return (
    <InfiniteScroll
    className="flex flex-col gap-12 mb-8"
    dataLength={allPosts.length} //This is important field to render the next data
    next={fetchNextPage}
    hasMore={!!hasNextPage}
    loader={<h4>Loading more posts...</h4>}
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