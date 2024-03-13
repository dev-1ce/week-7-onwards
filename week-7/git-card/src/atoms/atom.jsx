import {atom,selector} from "recoil"
import axios from "axios"

export let userenter = atom({
    key:"userenter",
    default:"adarsh"
})

export const gitcard =  selector({
    key:"gitcard",
    get: async ({get})=>{
            const username = get(userenter)
            const res = username===""?"":await axios.get(`https://api.github.com/users/${username}`)
            return res.data
        }
})
