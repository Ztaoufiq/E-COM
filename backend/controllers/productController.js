const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    
    req.body.user = req.user.id;
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

exports.getProducts = catchAsyncErrors(async (req,res,next) => {

    const resPerPage = 8;
    const productsCount = await Product.countDocuments();
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(resPerPage)
    const products = await apiFeatures.query

    res.status(200).json({
        success: true,
        count: products.length,
        productsCount,
        products
    });    
})

exports.getSingleProduct = catchAsyncErrors(async (req,res,next) => {

    try {
        const product = await Product.findById(req.params.id)
        if(!product) { 
            return next(new ErrorHandler('Product not found', 404));
        }
        res.status(200).json({
            success: true,
            product
        })        
    } catch (error) {        
        if(error.name === 'CastError'){
            const msg = `Resource not found, Invalid : ${error.path}`
            return next(new ErrorHandler(msg, 400));
        }
    }    
})

exports.updateProduct = catchAsyncErrors(async (req,res,next) => {

    try {
        let product = await Product.findById(req.params.id)
        
        if(!product) {        
            return next(new ErrorHandler('Product not found', 404));
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        });

        res.status(200).json({
            success: true,
            product
        })        
    } catch (error) {
        console.log(error);
    }    
})

exports.deleteProduct = catchAsyncErrors(async (req,res,next) => {

    try {
        const product = await Product.findById(req.params.id)
        
        if(!product) {        
            return next(new ErrorHandler('Product not found', 404));
        }
        await product.deleteOne()
        res.status(200).json({
            success: true,
            message: 'The product is deleted.'
        })        
    } catch (error) {
        console.log(error);
    }    
})