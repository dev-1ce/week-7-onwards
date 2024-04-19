import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const Fullblog = ({blog}:{blog:Blog})=>{

    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center ">
            <div className="grid grid-cols-12 px-20 w-full pt-24 max-w-screen-xl ">
                <div className="col-span-8">
                    <div className="text-5xl font-extrabold">
                    {blog.title}
                    </div>
                    <div className="text-slate-500 pt-4 ">
                        Posted on 2nd Feb 2024
                    </div>
                    <div className="pt-4">
                        {blog.content}
                    </div>
                </div>
                    <div className="col-span-4">
                    <div className="text-slate-600 text-lg">Author</div>
                    <div className="flex">
                        <div className="flex justify-center items-center">
                        <Avatar name={blog.author.name || "harkirat"} size="small"/>
                        </div>
                        <div className="px-4">
                        <div className="text-xl font-bold">{blog.author.name}</div>
                        <div className="pt-2 text-slate-500">
                            Random gibberish about the author that we ll show on this part
                        </div>
                        </div>
                        </div>
                    </div>

                </div>
        </div>
    </div>
}