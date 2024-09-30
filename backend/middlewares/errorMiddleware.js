import ApiError from "../utils/ApiError.js"

const errorMiddleware = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "Internal Serval Error"

    // Wrong Mongodb Id Error
    if(err.name === "CastError"){
        const message = `Resource not found. Invalid: ${err.path}`
        err = new ApiError(400, message)
    }

    // Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ApiError(400, message)
    }

    // Wrong JWT  Error
    if(err.name === "JsonWebTokenError"){
        const message = `Json web Token is invalid, try Again`
        err = new ApiError(400, message)
    }

    // Wrong JWT  Error
    if(err.name === "TokenExpiredError"){
        const message = `Json web Token is Expired, try Again`
        err = new ApiError(400, message)
    }

    res.status(err.statusCode).json({
        success : false,
        message: err.message,
    })
}

export default errorMiddleware;