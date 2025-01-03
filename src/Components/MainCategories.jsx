import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Search from "./Search";

const MainCategories = () => {
  return (
    <div className="hidden  md:flex dark:bg-neutral-950/50 bg-white rounded-3xl transition-colors duration-250 ease-in-out xl:rounded-full p-4 shadow-lg  items-center justify-center gap-8">
      <div className=" flex-1 rounded-full justify-between flex items-center flex-wrap">
        <Link to='/posts' className="bg-blue-800 rounded-full px-4 py-2">
        All Posts
        </Link>
        <Link to="/posts?cat=web-design" className="hover:bg-blue-50 rounded-full px-4 py-2">
        Web Design
        </Link>
        <Link to="/posts?cat=development" className="hover:bg-blue-50 rounded-full px-4 py-2">
        Development
        </Link>
        <Link to="/posts?cat=seo" className="hover:bg-blue-50 rounded-full px-4 py-2">
        Search Engine
        </Link>
        <Link to="/posts?cat=marketing" className="hover:bg-blue-50 rounded-full px-4 py-2">
        Marketing
        </Link>
        <Link to="/posts?cat=games" className="hover:bg-blue-50 rounded-full px-4 py-2">
        Games
        </Link>
        </div>
        <span className="text-xl font-medium">|</span>
        <Search/>
    </div>
  )
}

export default MainCategories