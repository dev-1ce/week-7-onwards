import { useState,useEffect } from "react"
import { useSetRecoilState,useRecoilValue } from "recoil";
import { gitcard, userenter } from "./atoms/atom";

function Card() {
  const data = useRecoilValue(gitcard);
  useEffect(()=>{
    
    console.log(data)
  },[])
  
  
  return <>
    <input type="text" /><br />
    <button >Submit</button>
  </>
  
}

export default Card
