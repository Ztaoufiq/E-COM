const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto')

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar : { publicId : 'avatars/publicID', url: 'URL'}
    });
    
    sendToken(user, 201, res);
})

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorHandler('Plz enter email and password', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if(!user) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 201, res);
})

// get currently logged in user details : /api/v1/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

// Update Password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isMatched = await user.comparePassword(req.body.oldPassword);
    if(!isMatched){
        return next(new ErrorHandler('Old Password is inccorect', 400));
    }

    user.password = req.body.password;
    
    await user.save();
    

    sendToken(user, 200, res)
})

// Update Profile
exports.updateProfil = catchAsyncErrors(async (req, res, next) => {
    const userData = {
        name: req.body.name,
        email: req.body.email
    }
    
    await User.findByIdAndUpdate(req.user.id, userData, {
        new: true,
        runValidators : true

    });

    res.status(200).json({
        success: true
    })
})

// reset password  => /api/v1/reset/:token
exports.resetPasswordToken = catchAsyncErrors(async (req, res, next) => {
    // hash url token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if(!user) {
        return next(new ErrorHandler('Password reset token is invalid or has been expired', 400));
    }

    if(req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not matched', 400));
    }

    // Setup new password
    user.password = req.body.password

    user.resetPasswordExpire = undefined
    user.resetPasswordToken = undefined

    await user.save();

    sendToken(user, 200, res)
})

exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

// Get all users for Admin => api/v1/admin/users
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

// Get user details for Admin => api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User does not found with id : ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        user
    })
})

// Update User by Admin => api/v1/admin/user/:id
exports.updateUserDetails = catchAsyncErrors(async (req, res, next) => {
    const userData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    
    const user = await User.findByIdAndUpdate(req.user.id, userData, {
        new: true,
        runValidators : true

    });

    res.status(200).json({
        success: true,
        user
    })
})

// Delete User by Admin => api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user) {
        return next(new ErrorHandler(`User does not found with id : ${req.params.id}`, 400));
    }

    await user.deleteOne()
    res.status(200).json({
        success: true,
        message: 'The user is deleted.'
    })

    
})