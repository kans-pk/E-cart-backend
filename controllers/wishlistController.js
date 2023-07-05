//import wishlist
const wishlists = require('../models/wishlistSchema')
// const wishlist=require('../models/wishlistSchema')

//logic for wishlist
exports.addtowishlist=async(req,res)=>{
    //get product details from request
    // req.body={
    //     id:'3',
    //     title:'abc',
    //     price:123,
    //     image:'xyz'
    // }
    //derstructure req.body

    const {id,title,price,image}=req.body

    //logic
    try{
        const item=await wishlists.findOne({id})
        if(item){
            res.status(404).json("Product already exists")
        }
        else{
            //add item to wishlist collection
            const newItem=new wishlists({id,title,price,image})
            //to store in wishlist collection
            await newItem.save();
            //response send back to client
            res.status(200).json("product added to wishlist")

        }
    }
    catch(error){
        res.status(404).json(error)
    }
}

//logic to view wishlist products
exports.getWishlist=async(req,res)=>{
    //logic to view wishlist products
try{
    const allWishlists=await wishlists.find()
    res.status(200).json(allWishlists)
}
catch(error){
    res.status(404).json(error)
}
}

//logic to delete wishlist items
exports.deletewishlist=async(req,res)=>{
    //get id
    const{id}=req.params
    //logic to delete
    try{
        const removewishlists=await wishlists.deleteOne({id})
        if(removewishlists){
            const allitems=await wishlists.find()
            res.status(200).json(allitems)

        }
       
    }
    catch(error){
        res.status(404).json(error)
    }
}