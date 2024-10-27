class ResponseHelper {
    static success(res, message, data = null, statusCode = 200, totalCount = null) {
        const response = {success:true, message, data};

        if(totalCount !== null) {
            response.total_count = totalCount;
        }

        return res.status(statusCode).json(response);
    }

    static error(res, message, errors = [], statusCode = 422, data = null) {
        return res.status(statusCode).json({success: false, message, errors, data});
    }

}

export default ResponseHelper;