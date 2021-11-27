const baseResponseModel = {
    success: false,
    data: [],
    error: []
};


const baseErrorResponseModel = {
    code: [],
    message: '',
}




module.exports = {
    baseResponseModel,
    baseErrorResponseModel,

    logError(errorResponse, response, errorCode, errorMessage, res) {
        errorResponse.code = errorCode;
        errorResponse.message = errorMessage;
        response.error = errorResponse;
        return res.status(errorCode).json(response);
    }
}




