import React from "react";
import {followers,likes,comments} from "../store/atoms/atoms"
import { useRecoilValue } from "recoil";

export default function Footer(){
    const follower = useRecoilValue(followers)
    const likes = useRecoilValue(followers)
    const comments = useRecoilValue(followers)
    return <div className="footer">
        <h2>{follower}<span>followers</span></h2>
        <h2>{likes}<span>Likes</span></h2>
        <h2>{comments}<span>Comments</span></h2>
        </div>
}