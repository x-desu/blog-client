import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Comment from "./Comment"
import { faImage } from "@fortawesome/free-solid-svg-icons"
import GifPicker from "gif-picker-react"
import { useState } from "react"
import InputEmoji from 'react-input-emoji'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useAuth, useUser } from "@clerk/clerk-react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import useTheme from "../context/ThemeContext"
import TextEditor from "../utils/TextEditor"

const fetchComments = async(postId) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/comment/${postId}`)
  return res.data
}


const Comments = ({postId}) => {
const navigate = useNavigate()
  const {getToken} = useAuth()
  const{theme} = useTheme()
  const {user} = useUser()

  const querClient = useQueryClient()
    const {data,isPending,error} = useQuery({
      queryKey:["comments",postId],
      queryFn:() => fetchComments(postId)
    })
    const {mutate,isPending:mutatePending,variables} = useMutation({
      mutationFn:async(newComment)=>{
        const token = await getToken()
        return axios.post(`${import.meta.env.VITE_API_URL}/comment/${postId}`,newComment,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        
      },
      onSuccess:()=>{
        querClient.invalidateQueries({queryKey:["comments",postId]})
      },
      onError:(error)=>{
    toast.error(error.response?.data?.message || "Error adding comment");
      }
    })  
    

    if(isPending) return "loading..."
    if(error) return "Something went wrong!" + error.message
    if(!data) return "Comments not found"

    const handleSubmit = (textContent,imageUrls) => {
      const data = {
        desc:textContent,
        img:imageUrls
      }
      mutate(data)
    }

  return (
    <div className="relative flex flex-col gap-8 lg:w-3/5 mb-12">
        <div className="flex items-center justify-between">
        <h1 className="text-xl underline text-gray-500">Comments</h1>
        
        </div>
      {user && <TextEditor handleComment={handleSubmit} />}
        {isPending?"Loading..."
        :error
        ?"Error loading comments!"
        : <>
        {mutatePending && (
          <Comment
          comment={{
            desc:`${variables.desc} Sending...`,
            img:variables.img,
            createdAt: new Date(),
            user:{
              img:user.img,
              username:user.username
            }
          }}
          />
        )}

        {
          data.map((comment) => (
            <Comment key={comment._id} comment={comment} />
          ))
        }
        </>
        
        }
    </div>
  )
}
 
export default Comments