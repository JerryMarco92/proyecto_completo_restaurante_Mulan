export function errorHandler(err, req, res, next) {

    console.error(err);

    const status = err.status || 500;

    res.status(status).json({
        status,
        code: err.code || "INTERNAL_SERVER_ERROR",
        message: err.message || "Ha ocurrido un error interno."
    });
}
