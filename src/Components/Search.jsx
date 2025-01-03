import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"

const Search = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams,setSearchParams] = useSearchParams()

  const handleKeyPress = (e) => {
    if(e.key === "Enter"){
      const query = e.target.value
      if(location.pathname === '/posts'){
        setSearchParams({...Object.fromEntries(searchParams),search:query})
      }else{
        navigate(`/posts?search=${query}`)
      }
    } 
  }
  return (
    <div className="flex gap-2 items-center rounded-full p-2 bg-gray-100 dark:">
        <FontAwesomeIcon icon={faSearch} style={{color:"black"}}/>
        <input className="bg-transparent focus:outline-hidden dark:text-black" type="text" placeholder="search a post" onKeyDown={handleKeyPress}/>
    </div>
  )
}

export default Search