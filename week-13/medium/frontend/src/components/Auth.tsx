import { ChangeEvent,useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "100xadarsh-common"
import axios from "axios"
import { Backend_URL } from "../config"

export const Auth = ({type}:{type:"signup"| "signin"})=>{
    const navigate = useNavigate()
    const [postInputs,setPostInputs] = useState<SignupInput>({
        name:"",
        email:"",
        password:"",
    })
    async function sendRequest(){
        try{
            const response = await axios.post(`${Backend_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs) 
            const jwt = response.data.jwt;
            localStorage.setItem("token",jwt);
            navigate("/blogs")
        }
        catch(e){

        }
        
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="w-1/2">
                    <div className="text-3xl text-center font-extrabold">
                    Create an account
                    </div>
                    <div className="text-slate-400 text-center pt-2 pb-4">
                       { type=="signin"?"Dont have an account":"Already have a account ?"} <Link className="pl-2 underline" to={type=="signin"?"/Signup":"/Signin"}>{type=="signup"?"Login":"Sign Up"}</Link>
                    </div>
                    {type=="signup"?<LabelledInput label ="Name" placeholder="Adarsh" onChange={(e)=>{
                        setPostInputs((prev)=>{
                            return {...prev,name:e.target.value}
                        })
                    }}/>:""}
                    <LabelledInput label ="Email" placeholder="abc@gmail.com" onChange={(e)=>{
                        setPostInputs((prev)=>{
                            return {...prev,email:e.target.value}
                        })
                    }}/>
                    <LabelledInput label ="Password" type="password" placeholder="password" onChange={(e)=>{
                        setPostInputs((prev)=>{
                            return {...prev,password:e.target.value}
                        })
                    }}/>
                    <div className="pt-4">
                    <button type="button" onClick={sendRequest} className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup"?"Sign up" : "Login"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
interface LabelledInputType{
    label:string;
    placeholder:string;
    onChange: (e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string;
}
function LabelledInput({label,placeholder,onChange,type}:LabelledInputType){
    return (
        <div className="pt-3">
        <label  className="block mb-2 text-sm font-medium text-gray-900 ">{label}</label>
        <input type={type || "text"} onChange ={onChange}id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
    </div>
    )
}