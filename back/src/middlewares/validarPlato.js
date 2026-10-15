export function validarPlato(req, res, next) {
    const {
        nombre,
        ingredientes,
        precio,
        categoria_id
    } = req.body;

    if (!nombre || !ingredientes || precio == null || categoria_id == null) {
        return res.status(400).json({
        error: "Faltan datos obligatorios."
        });
    }

    next();
    }