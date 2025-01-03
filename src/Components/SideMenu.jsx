import Search from "./Search"
import { Link, useSearchParams } from "react-router-dom"
const SideMenu = () => {
  const [searchParams,setSearchParams] = useSearchParams()
  const handleFilter = (e) => {
    if(searchParams.get("sort")!== e.target.value){
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        sort:e.target.value
      })
    }
  }
  const handleCategory = (cat) => {
    if(searchParams.get("cat")!== cat){
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        cat:cat
      })
    }
  }
  return (
    <div className="px-4 h-max sticky top-8">
        <h1 className="mb-4 text-sm font-medium">Search</h1>
        <Search/>
        <h1 className="mb-4 mt-8 text-sm font-medium">Filter</h1>
        <div className="flex flex-col gap-2 text-sm">
          <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
            <input 
            onChange={handleFilter}
            type="radio" name="sort" value="newest" className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />
            <span>Newest</span>
          </label>
          <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
            <input 
            onChange={handleFilter}
            type="radio" name="sort" value="most-popular" className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />
            <span>Most Popular</span>
          </label>
          <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
            <input 
            onChange={handleFilter}
            type="radio" name="sort" value="trending" className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />
            <span>Trending</span>
          </label>
          <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
            <input 
            onChange={handleFilter}
            type="radio" name="sort" value="oldest" className="appearance-none w-4 h-4 border-[1.5px] bg-white border-blue-800 cursor-pointer rounded-sm checked:bg-blue-800" />
            <span>Oldest</span>
          </label>
        </div>
        <h1 className="mb-4 mt-8 text-sm font-medium">Categories</h1>
        <div className="flex flex-col gap-2 text-sm">
          <span className="underline cursor-pointer" to="/posts">All</span>
          <span className="underline cursor-pointer" onClick={()=>handleCategory("web-design")}>Web Design</span>
          <span className="underline cursor-pointer" onClick={()=>handleCategory("development")}>Development</span>
          <span className="underline cursor-pointer" onClick={()=>handleCategory("seo")}>Search Engines</span>
          <span className="underline cursor-pointer" onClick={()=>handleCategory("marketing")}>Marketing</span>
          <span className="underline cursor-pointer" onClick={()=>handleCategory("games")}>Games</span>
        </div>
    </div>
  )
}

export default SideMenu