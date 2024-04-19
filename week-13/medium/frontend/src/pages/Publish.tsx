import axios from "axios"
import { Appbar } from "../components/Appbar"
import { Backend_URL } from "../config"
import { ChangeEvent, useState } from "react"
import {  useNavigate } from "react-router-dom"

export const Publish = ()=>{
    const [title,setTitle] = useState("")
    const [content,setContent]= useState("")
    const navigate = useNavigate()
    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-lg w-full">
                <input type="text" onChange={(e)=>{
                    setTitle(e.target.value)
                }} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  " placeholder="Title"/>
                <Textarea onChange={(e)=>{
                    setContent((e.target.value))
                }}></Textarea>
                <button onClick= {async()=>{
                    const response = await axios.post(`${Backend_URL}/api/v1/blog`,{
                        title:title,
                        content:content
                    },{
                        headers:{
                            Authorization:localStorage.getItem("token")
                        }
                    })
                    navigate(`/blog/${response.data.id}`)
                }}
                 type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
           Publish post
       </button>
            </div>
        </div>
    </div>
}

const Textarea = ({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void})=>{
    return <form>
       <div className="w-full mb-4 ">
           <div className="flex items-center justify-between  py-2 border">
           <div className=" py-2 bg-white rounded-b-lg w-full">
               <label  className="sr-only">Publish post</label>
               <textarea onChange={onChange} id="editor" rows={8} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article..." required />
           </div>
       </div>
       </div>
    </form>
    
    
}