//import express
const express=require('express');

//import product conreoller
const productController=require('../controllers/productController')
//import wishlistController
const wishlistController=require('../controllers/wishlistController')
//import cart
const cartController=require('../controllers/cartController')
//using express create an object for router class inorder to setup path
const router=new express.Router()
//resolve client request in various server routes
//all api call will be resolved

//get all products
router.get('/products/all-products',productController.getAllProducts)
//get particular product details
router.get('/products/viewproducts/:id',productController.viewProduct)
//to get products details in wishlist
router.post('/products/addtowishlist',wishlistController.addtowishlist)
//get wishlist product details
router.get('/products/getWishlist',wishlistController.getWishlist)

//delete wishlist
router.delete('/products/deleteWishlist/:id',wishlistController.deletewishlist)

//add to cart
router.post('/products/addtocart',cartController.addToCart)

//get cart
router.get('/products/getcart',cartController.getCart)

//delete from cart
router.delete('/products/deleteFromCart/:id',cartController.removeCartItem)

//cart increment
router.get('/products/increment/:id',cartController.incrementCart)
//cart decrement
router.get('/products/decrement/:id',cartController.decrementCart)
//export router
module.exports=router