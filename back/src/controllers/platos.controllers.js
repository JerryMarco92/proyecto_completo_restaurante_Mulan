import { pool } from "../data/db.js";

// GET http://localhost:3000/platos
export async function obtenerPlatos(req, res, next) {

    const condiciones = [] //fragmentos de SQL
    const filtros = [] //valores recibidos


    //localhost:3000/platos/?destacados=1
    if (req.query.destacados === "1") {
      condiciones.push("platos.destacados = 1");
    }

    // /platos?categoria=3
    if (req.query.categoria) {
      condiciones.push("platos.categoria_id = ?");
      filtros.push(Number(req.query.categoria));
    }

    // http://localhost:3000/platos/?buscar=entran
    if (req.query.buscar) {
        condiciones.push(
        "(platos.nombre LIKE ? OR platos.ingredientes LIKE ? OR categorias.categoria_nombre LIKE ?)"
        );

        const busqueda = `%${req.query.buscar.trim()}%`;
        filtros.push(busqueda, busqueda, busqueda);
    }

    const where = condiciones.length > 0 ? "where " + condiciones.join(" AND ") : "";

    //http://localhost:3000/platos/?pagina=3
    const paginaActual = Number(req.query.pagina)
    const limitePedido = Number(req.query.limite)

    const pagina = paginaActual > 0 ? paginaActual : 1;
    const limite = limitePedido > 0
    ? Math.min(limitePedido, 13)
    : 9;

    const offset = (pagina - 1) * limite;

    try {
        const [rows] = await pool.execute(
            `SELECT platos.*
            FROM platos
            LEFT JOIN categorias ON platos.categoria_id = categorias.id
            ${where} limit ? offset ?`,
            [...filtros, limite, offset]
        );
    
    
        if (rows.length === 0) {
            return res.json({
                platos: [],
                total: 0
            });
        }

        const [[{ total}]] = await pool.execute(
        `SELECT COUNT(*) AS total
        FROM platos
        LEFT JOIN categorias ON platos.categoria_id = categorias.id
        ${where}`,
        filtros
        //cuenta todos los platos y llama a ese resultado AS total.
        );

        res.json({
            platos: rows,
            total: total
            });

    } catch (err) {
    console.error("Error en obtenerPlatos:", {
        code: err.code,
        message: err.message,
        sqlMessage: err.sqlMessage
    });

    next(err);
  }
    
}


// GET http://localhost:3000/platos/28
export async function obtenerPlatoPorId(req, res, next) {

  const id = Number(req.params.id);

  try {

    const [rows] = await pool.execute(
      `SELECT platos.*, categorias.categoria_nombre,
              GROUP_CONCAT(alergenos.nombre) AS alergenos
      FROM platos
      LEFT JOIN categorias
          ON platos.categoria_id = categorias.id
      LEFT JOIN platos_alergenos
          ON platos.id = platos_alergenos.plato_id
      LEFT JOIN alergenos
          ON platos_alergenos.alergeno_id = alergenos.id
      WHERE platos.id = ?
      GROUP BY platos.id`,
      [id]
    );


    if (rows.length === 0) {
      return res.status(404).json({
        error: "Plato no encontrado"
      });
    }

    res.json(rows[0]);

  } catch (err) {

    next(err);

  }
}


// POST http://localhost:3000/platos
export async function crearPlato(req, res, next) {
  const { nombre, ingredientes, precio, categoria_id, destacados } = req.body;

  try {
    const [resultado] = await pool.execute(
      `INSERT INTO platos 
      (nombre, ingredientes, precio, categoria_id, destacados)
      VALUES (?, ?, ?, ?, ?)`,
      [nombre, ingredientes, precio, categoria_id, destacados]
    );

    res.status(201).json({
      mensaje: "Plato creado correctamente.",
    });

  }catch (err) {
    next(err);
  }
}

// PUT http://localhost:3000/platos/5
export async function actualizarPlato(req, res, next) {

  const id = req.params.id;

  const {
    nombre,
    ingredientes,
    precio,
    categoria_id,
    destacados,
    imagen
  } = req.body;

  try {

    const [resultado] = await pool.execute(
      `UPDATE platos
       SET nombre = ?, ingredientes = ?, precio = ?, categoria_id = ?, destacados = ?, imagen = ?
       WHERE id = ?`,
      [nombre, ingredientes, precio, categoria_id, destacados, imagen ?? null, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        error: "Plato no encontrado"
      });
    }

    res.json({
      mensaje: "Plato actualizado correctamente."
    });

    } catch (err) {

      next(err);

    }
}


// DELETE http://localhost:3000/platos/5
export async function eliminarPlato(req, res, next) {

  const id = req.params.id;

  try {

    const [resultado] = await pool.execute(
      `DELETE FROM platos
       WHERE id = ?`,
      [id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        error: "Plato no encontrado"
      });
    }

    res.json({
      mensaje: "Plato eliminado correctamente."
    });

  } catch (err) {

    next(err)
  }
}


