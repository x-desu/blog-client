import { useAuth, useUser } from "@clerk/clerk-react"
import { faBookmark, faStar, faTrash } from "@fortawesome/free-solid-svg-icons"
import {faBookmark as faBookmarkRegular} from '@fortawesome/free-regular-svg-icons'; 
import {faStar as faStarRegular} from '@fortawesome/free-regular-svg-icons'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";

const fetchSavedPosts = async(getToken) => {4
  const token = await getToken()
  return axios.get(`${import.meta.env.VITE_API_URL}/user/saved`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
}

const PostActions = ({post}) => {
  const {user} = useUser()
  const {getToken} = useAuth()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  //query fn
  const {data,isPending,error} = useQuery({
    queryKey:["savedposts",user?.username],
    queryFn:async()=>{
    const token = await getToken()
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/saved`,{
    headers:{
      Authorization:`Bearer ${token}`
    }
  })
  return res.data
  },
  enabled:!!user
  })
 
//mutation fn
  const {mutate,isPending:pendingSave} = useMutation({
    mutationFn:async(postId)=>{
      const token = await getToken()
      
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/user/save`,{postId},{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return res.data
    },
    onSuccess:(res)=>{
      queryClient.invalidateQueries({queryKey:["savedposts",user?.username]})
      toast.success(res)
    },
    onError:(error)=>{
      console.log(error)
      toast.error(error)
    }
  })
  const {mutate:deleteMutate,isPending:pendingDelete} = useMutation({
    mutationFn:async(postId)=>{
      const token = await getToken()
      
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/post/${postId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return res.data
    },
    onSuccess:(res)=>{
      toast.success("Post successfully deleted")
      navigate('/')
    },
    onError:(error)=>{
      toast.error(error)
    }
  })
  //feature mutation
  const {mutate:feature,isPending:featurePending} = useMutation({
    mutationFn:async(postId)=>{
      const token = await getToken()
      
      const res = await axios.patch(`${import.meta.env.VITE_API_URL}/post/feature`,
        {postId:post?._id},
        {
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      return res.data
    },
    onSuccess:(res)=>{
      toast.success(res?.isFeatured?"post featured!":"post removed from featured")
      queryClient.invalidateQueries({queryKey:["post",post.slug]})
    },
    onError:(error)=>{
      toast.error(error)
    }
  })

  const isAdmin = user?.publicMetadata?.role === "admin" || false
  const isSaved = data?.some((p)=>p===post._id)||false
  
  if(error){
    return toast.error(error.message)  
  }

  const handleDelete = () => {
    if(!user){
      return navigate('/login')
    }
    const alert = window.alert("Are you sure")
    if(alert){
      deleteMutate(post?._id)
    }
  }
  const handleSave = () => {
    if(!user){
      return navigate('/login')
    }
    mutate(post?._id)
  }

  const handleFeature = () => {
    feature()
  }

  return (
    <div>
        <h1 className="mt-8 mb-4 font-medium">Actions</h1>
        <div className="flex flex-col  items-start justify-center ">
        <div className={`flex gap-2 items-center 
        text-sm py-2 cursor-pointer ${pendingSave?'animate-pulse opacity-80':""}`}
        onClick={handleSave}
        >
            {isSaved?(<FontAwesomeIcon icon={faBookmark} />)
            :(<FontAwesomeIcon icon={faBookmarkRegular}/>)}
            <span>Save This Post</span>
        </div>
        {isAdmin &&
          <div className="flex items-center py-2 gap-1 text-sm cursor-pointer" onClick={handleFeature}>
        { post?.isFeatured?<FontAwesomeIcon icon={faStar}/> :<FontAwesomeIcon icon={faStarRegular} />}
        <span>Feature this post</span>
        </div>
        }
        {user && (user.username === post?.user?.username || isAdmin) && <div 
        className={`flex gap-2 items-center text-sm py-2 cursor-pointer ${pendingDelete?'animate-pulse opacity-80':''}`}
        onClick={handleDelete}
        >
            <FontAwesomeIcon icon={faTrash} style={{color:'#d95454'}}/>
            <span className="text-red-400">Delete This Post</span>
        </div>}
          </div>
    </div>
  )
}

export default PostActions