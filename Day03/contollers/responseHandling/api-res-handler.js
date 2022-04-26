const ApiResponse = require("./ApiResponse");

function apiResponseHandler( req, res, next) {
    // in prod, Do not use console,error
    // because it is not async
    //console.log(res);

    if (res instanceof ApiResponse){
        res.status(res.code).json(res.message);
        // *** IMPORTANT ***
        // you should not forget return!
        return;
    }
    //res.status(500).json("something went wrong");
    else{
        next();
    }
}

module.exports = apiResponseHandler;