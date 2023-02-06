export const ErrorHandler = (err, req, res, next) => {
    /**
     * Return error message to the user if some exceptions occurs in the program or api call.
     */
    const errStatus = err.statusCode || 500;
    const errMsg = err.errors || 'Something went wrong';
    res.status(errStatus).json({
        success: false,
        status: errStatus,
        message: errMsg[0].message
})}