import { BlogCard } from "../components/BlogCard"
import { Appbar } from "../components/Appbar"
import { useBlogs } from "../hooks"
export const Blogs =()=>{

    const {loading,blogs } = useBlogs();
    if(loading){
        return <div>
            Loading....
        </div>
    }

    return<div>
        <div>
            <Appbar></Appbar>
        </div>
    <div className="flex justify-center">
        <div className="">
            {blogs.map(i=>{
                return <BlogCard id={i.id}title={i.title} authorname={i.author.name || "Harkirat"} content={i.content} published="2nd Feb 2024"/>
            })}
            </div>
        </div>
    </div>
}