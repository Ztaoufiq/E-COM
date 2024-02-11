const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500

    if(process.env.NODE_ENV === 'DEVELOPEMENT'){
        res.status(err.statusCode).json({
            success: false,
            error: err,
            message: err.message,
            stack: err.stack
        })
    }
    if(process.env.NODE_ENV === 'PRODUCTION'){
        let error = {... err}
        error.message = err.message

        // Wrong Mongoose Object ID Error
        if(err.name === 'CastError'){
            const msg = `Resource not found, Invalid : ${err.path}`
            error = new ErrorHandler(msg, 400)
        }

        // Handling Mongoose validation Error
        if(err.name === 'ValidationError'){
            const msg = Object.values(err.errors).map(value => value.message)
            error = new ErrorHandler(msg, 400)
        }

        // Handling wrong JWT errors
        if(err.code === 'JsonWebTokenError'){
            /*console.log(Object.getOwnPropertySymbols(err))
            const msg = `Duplicate ${Object.keys(err.keyValue)} entered`
            error = new ErrorHandler(msg, 400)*/
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}