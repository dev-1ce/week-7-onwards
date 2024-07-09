
import {userRouter} from "./routes/user";
const express = require("express");
const cors = require("cors");
const app = express();


app.use(express.json())
app.use("/*",cors());

app.get("/api",(req:any,res:any)=>{
    res.send("hello from api")
})

app.use("/api/v1/user",userRouter)

app.listen(5000)