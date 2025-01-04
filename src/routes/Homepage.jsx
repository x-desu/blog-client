import { Link } from "react-router-dom"
import MainCategories from "../Components/MainCategories"
import FeaturedPosts from "../Components/FeaturedPosts"
import PostList from "../Components/PostList"

const Homepage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4 ">
      <div className="flex gap-4">
        <Link to='/'>Home</Link>
        <span>.</span>
        <span className="text-blue-800 dark:text-blue-400">Blogs and Articles</span>
      </div>
      <div className="flex items-center justify-between">
        <div>
        <h1 className="dark:text-stone-300 text-black text-2xl md:text-5xl lg:text-6xl font-bold">Write and publish blogs/articles.</h1>
        <div className="flex gap-4 items-center content-center ">
        <p className="mt-8 text-md md:text-lg">
        Share your thoughts, ideas, and knowledge with the world. Create impactful articles that engage and inspire readers.</p>
        <div className="bg-blue-800 text-white p-2.5  rounded-2xl md:hidden active:scale-110 transition-all">
        <Link className="text-base  " to='/write'>Write</Link>
        </div>
        </div>
        </div>
        <Link className="relative hidden md:block" to='/write'>
        <svg
            viewBox="0 0 200 200"
            width="240"
            height="200"
            // className="text-lg tracking-widest animate-spin animatedButton"
            className="text-lg tracking-widest"
            style={{ animation: 'spin 10s linear infinite' }}
          >
            <path
              id="circlePath"
              fill="none"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
            <text>
              <textPath href="#circlePath" className="dark:fill-neutral-200" startOffset="0%">
                Write your story •
              </textPath>
              <textPath href="#circlePath" className="dark:fill-neutral-200" startOffset="50%">
                Share your idea •
              </textPath>
            </text>
          </svg>
          <button className="bg-blue-800 absolute top-14 left-0 right-0 bottom-0 w-20 h-20 mx-auto rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 fill-white rotate-[320deg]"
             viewBox="0 0 48 48"
          >
           <path d="M4 24h34l-8-8 2.82-2.82L46 24 32.82 37.82 30 35l8-8H4z" />
        </svg>
          </button>
          </Link>
      </div>
      {/* categories */}
      <MainCategories/>
      <FeaturedPosts/>
      <div>
        <h1 className="my-8 text-2xl dark:text-blue-400 text-gray-600">Recent Posts</h1>
        <PostList/>
      </div>
    </div>
  )
}

export default Homepage