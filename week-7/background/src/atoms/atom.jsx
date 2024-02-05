import {atom} from "recoil"

export const color = atom({
    key:"color",
    default:""
})

export const colors = atom({
    key:"colors",
    default:["red","yellow","blue","green"]
})