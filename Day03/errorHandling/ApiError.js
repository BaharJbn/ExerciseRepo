class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(msg){
        return new ApiError(400, msg);
    }

    static internal(msg){
    return new ApiError(500, msg); 
    }
}

// you can invoke static method by: ApiError.badRequest() ... 
// it means you donot need to have a new object

module.exports = ApiError;