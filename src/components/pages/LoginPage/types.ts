interface ErrorDetail {
    code: string;
    message: string;
}

interface ErrorResponse extends Error {
    errors: ErrorDetail[];
}