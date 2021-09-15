const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userSchema=new Schema({
    name:{
        type:String,
        required:[true,'Name is Required'],
        minlength:[6,'Name must be 6 letters']
    },
    email:{
        type:String,
        required:[true,'Email is Required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'Password is Required']
    }
},{timestamps:true})
const User=mongoose.model('User',userSchema)
module.exports=User;