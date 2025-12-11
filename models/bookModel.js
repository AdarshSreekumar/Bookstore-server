const mongoose=require('mongoose')
const { schema } = require('./userModel')

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    pages:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountPrice:{
        type:Number,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    abstract:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    publisher:{
        type:String,
        required:true
    },
    isbn:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    uploadImages:{
        type:Array,
        required:true
    },
    sellerMail:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:'pending'
    },
    buyerMail:{
        type:String,
        default:''
    }
    
})

const books=mongoose.model("books",bookSchema)

module.exports=books