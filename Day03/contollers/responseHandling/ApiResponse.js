class ApiResponse {
    constructor( code, message) {
        //this.name = name;
        this.code = code;
        this.message = message;
        //this.isSucceed = isSucceed;
    }

    static posted(msg){
        return new ApiResponse(201,msg);
    }

        static gotten(msg){
        return new ApiResponse(200,msg);
    }

            static updated(msg){
        return new ApiResponse(200,msg);
    }

        static forbidden(msg){
        return new ApiResponse(403,msg);
    }

             static unAuthorized(msg){
        return new ApiResponse(401,msg);
    }




}

// you can invoke static method by: ApiError.badRequest() ... 
// it means you donot need to have a new object

module.exports = ApiResponse;