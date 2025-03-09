const mongoose = require('mongoose')

const userSchema= new  mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        enum:['male', 'female']

    },
    age:{
        type:Number,
    }

},{timestamps:true})

const userModel = mongoose.model('User',userSchema)
module.exports = userModel