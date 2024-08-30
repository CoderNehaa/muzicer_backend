export function errorHandler(err, req, res, next){
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).send({
        success:false,
        message:message
    })
}
