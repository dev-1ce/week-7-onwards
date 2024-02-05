import Tab from "./Tab"
import { useRecoilValue } from "recoil"
import { colors } from "./atoms/atom"


export default function Navbar(){
    const colours = useRecoilValue(colors)
    const disp = colours.map((i)=>{
        return <Tab heading={i} options ={i} />
    })
    return <>
    <div className="nav">
        {disp}
    </div>
    </>
}