import { Link } from "react-router-dom"

interface BlogCard{
    authorname : string,
    title:string,
    content:string,
    published :string,
    id:string
}
export const BlogCard = ({authorname,title,content,published,id}:BlogCard)=>{
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                
                <Avatar size="small"name={authorname}/>
                
                <div className="font-extralight pl-2 text-sm flex justify-center items-center">{authorname}</div> 
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center items-center">
                {published}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0,100)} ....
            </div>
            <div className="text-sm text-slate-400 font-thin pt-4">
                {`${Math.ceil(content.length/100)} minute read `}
            </div>
        </div>
    </Link>
}


export function Avatar({name,size="small"}:{name:string,size:"small"|"big"}){
    return <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`${size==="small"?"text-xs":"text-md"} text-gray-600 dark:text-gray-300`}>{name[0]}</span>
</div>
}