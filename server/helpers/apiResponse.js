class ApplicationError extends Error {

    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}

const ApiResponse = {

    /**
     * Return error formatted response to the caller
     * @param {*} res Response
     * @param {*} statusCode HttpStatusCode
     * @param {*} errMessage String
     */
    handleError(res, statusCode, errMessage) {
        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message: errMessage
        })
    },

    /**
     * Return 500-internal server error response to the caller
     * @param {*} res Response
     * @param {*} errMessage  String
     */
    handleError500(res, errMessage) {
        var statusCode = 500;
        res.status(statusCode).json({
            status: 'error',
            statusCode,
            message: errMessage
        })
    },

    /**
     * Return paginated api response to the user    
     * @param data Response data
     * @param message additional message
     */
    successPaginate(res, page, limit, totalDocuments, data, ) {
        let paging = {
            page,
            pageSize: limit,
            totalPages: Math.ceil(totalDocuments / limit),
            total: totalDocuments,
            data
        }
        this.successWithStatus(res, 200, paging, null);
    },

    /**
     * Return success api response to the user    
     * @param data Response data
     * @param message additional message
     */
    success(res, data, message) {
        this.successWithStatus(res, 200, data, message);
    },

    /**
     * Return success api response to the user
     * @param res Response
     * @param statusCode HttpStatus Code
     * @param data Response data
     * @param message Additional message
     */
    successWithStatus(res, statusCode, data, message) {
        res.status(statusCode).json({
            status: 'success',
            statusCode,
            data,
            message
        })
    }
}

module.exports = { ApplicationError, ApiResponse };