class ApiError extends Error {
    statusCode: any;
    isOperational: any;
    constructor(
        statusCode: any,
        message: string,
        isOperational: Boolean = true,
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
