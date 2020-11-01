function validate() {
    return false
}

function validationHandler(schema, check = "body") {
    return function(req, res, next) {
        const err = validate(req[check], schema)
        err ? next(new Error(err)) : next()
    }
}