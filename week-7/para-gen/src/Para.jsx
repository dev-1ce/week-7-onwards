import {generate,count} from "random-words"
import "./styles.css"
import { useRecoilState } from "recoil"
import {len,para} from "./atoms/atom"

export default function(){

    const[length,setLength] = useRecoilState(len);
    const [paragraph,setParagraph] = useRecoilState(para); 

    return <><div id="p-gen">
        <div>
        <input type="text" name="" id="" onChange={(e)=>{
            setLength(Number(e.target.value))
        }}/>
        </div>
        <button onClick={()=>{
            if(length>=2 && length<=14){
                setParagraph(generate({
                    exactly:100,
                    join:" ",
                    minLength:length,
                    maxLength:length,
                }))
            }
        }}> Generate</button>
        <br />
        <div id="para">{paragraph}</div>
        </div>

    </>
}