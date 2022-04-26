const ApiError = require("./ApiError");

function apiErrorHandler(err, req, res, next) {
    // in prod, Do not use console,error
    // because it is not async
    console.log(err);

    if (err instanceof ApiError){
        res.status(err.code).json(err.message);
        // *** IMPORTANT ***
        // you should not forget return!
        return;
    }
    //res.status(500).json("something went wrong");
    next(res);
}

module.exports = apiErrorHandler;