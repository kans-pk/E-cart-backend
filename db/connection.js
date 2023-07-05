//import Mongoose
const mongoose=require('mongoose');

//use access connection string from .env file
const db=process.env.DATABASE

mongoose.connect(db,{
    useUnifiedTopology:true,
    useNewUrlParser:true,
}).then(()=>{
    console.log('database established');
}).catch((error)=>{
    console.log(error);
})
