const BadRequestError = (statusCode, message) => {
    return ({ statusCode, message: message});
}

module.exports = {
    BadRequestError
}