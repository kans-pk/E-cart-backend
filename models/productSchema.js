//import mongoose
const mongoose=require('mongoose');

//define schema for product collection to store data

const productSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating:{
        rate:{
            type:Number,
            required:true
        },
        count:{
            type:Number,
            required:true
        }
    }
})

//Create a Model to store products
const products=new mongoose.model('products',productSchema)

//export the model
module.exports= products

