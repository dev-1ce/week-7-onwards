import { Fullblog } from "../components/Fullblog";
import { useBlog } from "../hooks"
import { useParams } from "react-router-dom";
export const Blog =()=>{
    const {id} =useParams();
    const{loading,blog} = useBlog({
        id:id||""
    });
    if(loading){
        return <div>Loading...</div>
    }

    return <div><Fullblog blog={blog}/></div>
}