import { useAuth, useUser } from "@clerk/clerk-react"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "react-toastify"
import { format } from "timeago.js"

const Comment = ({comment}) => {
  const {user} = useUser()
  const {getToken} = useAuth()
  const postId = comment?.post
  const querClient = useQueryClient()
  const {mutate} = useMutation({
    mutationFn:async(id)=>{
      const token = await getToken()
      return axios.delete(`${import.meta.env.VITE_API_URL}/comment/${id}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      }) 
    },
    onSuccess:()=>{
      querClient.invalidateQueries({queryKey:["comments",postId]})
      toast.success("Comment deleted")
    },
    onError:(error)=>{
      toast.error(error.response?.data?.message || "Error deleting comment");
    }
  })
  const handleDelete = () => {
    mutate(comment?._id)
  }
 
  const role = user?.publicMetadata?.role
  return (
    <div className="relative bg-slate-50 dark:bg-neutral-900/60 dark:text-slate-100 text-black mb-8 p-4 rounded-xl">
        {<div className="flex items-center justify-between">
          <div className="flex items-center gap-4 mb-4">
            <img
            src={`${comment?.user?.img}?w=48&h=48&q=70`}
            className="rounded-full w-10 h-10 object-cover"
            />
            <h1 className="font-medium">{comment?.user?.username}</h1>
            <span className="text-sm">{format(comment?.createdAt)}</span>
        </div>
       {user && (comment?.user?.username === user?.username || role === 'admin') && <FontAwesomeIcon onClick={handleDelete} className="active:scale-120 transition-all text-sky-600 cursor-pointer hover:text-sky-900" icon={faX} size="xl"  />}
        </div>}
        <p className="text-base mb-2">{comment.desc}</p>
        {comment?.img && comment.img.map((gif)=>(
          <div key={gif} className="max-w-64">
          <img src={gif} 
          className="rounded-sm object-contain"
          />
          </div>
        ))}
    </div>
  )
}

export default Comment