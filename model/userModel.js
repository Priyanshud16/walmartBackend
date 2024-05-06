const {model,Schema}=require("mongoose")

let userSchema=new Schema({
    firstname:{type:String,required:true,trim:true},
    lastname:{type:String,required:true,trim:true},
    username:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true,unique:true},
    password:{type:String,required:true},
    phone:{type:String,required:true,trim:true}
},{versionKey:false})

const userModel=model("user",userSchema)

module.exports=userModel