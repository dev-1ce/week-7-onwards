import { useSetRecoilState } from "recoil"
import { color } from "./atoms/atom";

export default function Tab({heading,options}){
    const styles = {
        backgroundColor:`${options}`
    }
    const abc = useSetRecoilState(color);
    function handle(id){
        abc(id)
    }
    return <div className="sub" style={styles} onClick={()=>handle(heading)}>
        <h3 >{heading}</h3>
    </div>
}