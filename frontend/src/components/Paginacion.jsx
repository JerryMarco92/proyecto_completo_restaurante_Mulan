import "../styles/menuNav.css";

function Paginacion({
paginaActual,
totalPaginas,
tieneAnterior,
tieneSiguiente,
numerosDePagina,
setOffset,
offset,
limite
}) {

return (
    <>
        <p className="resumen">
            Pagina {paginaActual} de {totalPaginas || 1}
        </p>

        <nav className="paginador">
            <button
                className="boton-estilo"
                onClick={() => setOffset(offset - limite)}
                disabled={!tieneAnterior}
            >
                Prev
            </button>

            {numerosDePagina.map(function(numero){
                return (
                    <button
                        className="botonNumeroPagina boton-estilo"
                        key={numero}
                        onClick={() => {setOffset((numero - 1) * limite)}}
                        disabled={numero === paginaActual}
                    >
                        {numero}
                    </button>
                )
            })}

            <button
                className="boton-estilo"
                onClick={() => setOffset(offset + limite)}
                disabled={!tieneSiguiente}
            >
                Next
            </button>
        </nav>
    </>
)


}

export default Paginacion;