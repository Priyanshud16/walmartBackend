const {connect}=require("mongoose")
const dotenv=require("dotenv").config()
const ConnectDB=connect(process.env.MONGO_URL)

module.exports=ConnectDB