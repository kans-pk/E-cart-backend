//import cart collection
const carts=require('../models/cartschema')
//add to cart
exports.addToCart=async(req,res)=>{
    //get product details from the request
    const {id,title,price,image,quantity,grandTotal}=req.body
    //logic
    try{
        //check if the product is in cart collection
        const product=await carts.findOne({id})
        if(product){
            //if the product already exists ,increment qty
            product.quantity+=1;
            //also update pricing
            product.grandTotal=product.price*product.quantity;
            //then save 
            product.save()
            //to send response to client
            res.status(200).json("Item Added Successfully")
        }
        else{
            //product not in cart 
            const newProduct=new carts({id,title,price,image,quantity,grandTotal:price})
            //save new product in cart
            await newProduct.save()
            //to send response to client
            res.status(200).json("Item Added Successfully")
        }
    }
    catch(error){
        res.status(404).json(error)
    }
}

//get  cart
exports.getCart=async(req,res)=>{
    //get all products from the cart
    try{
        //logic
        const allcarts= await carts.find()
        res.status(200).json(allcarts)

    }
    catch(error){
        res.status(404).json(error)
    }
}

//cart deletion
exports.removeCartItem=async(req,res)=>{
    const{id}=req.params

    //product removal from cart
    try{
        const removeCarts=await carts.deleteOne({id})
        if(removeCarts.deleteCount!=0){
            const allcarts=await carts.find()
            res.status(200).json(allcarts)
        }
        else{
            res.status(404).json("Item not found")
        }
    }
    catch(error){
        res.status(401).json(error)
        
    }

}

//cart increment
exports.incrementCart=async(req,res)=>{
    //get product id from the request
    const{id}=req.params
    try{
        //logic
        //check product in cart collection
        const product=await carts.findOne({id})
        //if it exists increment quantity
        if(product){
            //update product quatity and granf total(price)
            product.quantity+=1;
            product.grandTotal=product.price*product.quantity;
            //save changes in mongodb
            await product.save();
            //increment the qty ,get all cart collection item and updating in particular item count
            const allcarts= await carts.find()
            res.status(200).json(allcarts)
            
        }
        else{
            res.status(404).json("Item not found")
        }

    }
    catch(error){
        res.status(404).json(error)
    }
}
//cart decremnt
exports.decrementCart=async(req,res)=>{
    //get product id from the request
    const{id}=req.params
    try{
        //logic
        //check product in cart collection
        const product=await carts.findOne({id})
        if(product.quantity==1){
            const removecart=await carts.deleteOne({id})
            const allcarts=await carts.find()
            res.status(200).json(allcarts)
        }
        else{
        //if it exists increment quantity
        if(product){
            //update product quatity and granf total(price)
            product.quantity-=1;
            product.grandTotal=product.price*product.quantity;
            //save changes in mongodb
            await product.save();
            //increment the qty ,get all cart collection item and updating in particular item count
            const allcarts= await carts.find()
            res.status(200).json(allcarts)
            
        }
        else{
            res.status(404).json("Item not found")
        }

    }
}
    catch(error){
        res.status(404).json(error)
    }
}