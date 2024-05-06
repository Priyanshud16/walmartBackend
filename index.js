const  express=require("express")
const ConnectDB = require("./config/db")
const userRouter = require("./Routes/UserRouter")


const dotenv=require("dotenv").config()
const app=express()

app.use(express.json())
app.use("/user",userRouter)

app.get("/",(req,res)=>{
res.send("This is our Home Route")
})

app.listen(process.env.PORT,async()=>{
    try {
    await ConnectDB
        console.log("server is running and DB is Connected");
    } catch (error) {
        
    }
   
})