const BadRequestError = (statusCode, message) => {
    return ({ statusCode, error: message});
}

module.exports = {
    BadRequestError
}