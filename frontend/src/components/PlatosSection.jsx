import { useEffect, useState } from "react";
import Paginacion from "./Paginacion.jsx";
import PlatoCard from "./PlatoCard.jsx";
import MenuNav from "./MenuNav.jsx";
import "../styles/estilosCards.css";



const API_URL = import.meta.env.DEV
    ? "http://localhost:3000"
    : "https://menu-digital-back-v2.onrender.com";


function PlatosPaginados() {

    const [platos, setPlatos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");
    //crud front:
    const [categoria, setCategoria] = useState(null);
    console.log("Categoría seleccionada:", categoria);

    const [busqueda, setBusqueda] = useState("");
    const [busquedaRealizada, setBusquedaRealizada] = useState("");


    function cambiarTextoBusqueda(nuevoTexto) {
        setBusqueda(nuevoTexto);
    }

    useEffect(function () {
        const temporizador = setTimeout(function () {
            setBusquedaRealizada(busqueda);
            cambiarBusqueda();
        }, 450);

        return function () {
            clearTimeout(temporizador);
        };
    }, [busqueda]);


    //Estados de paginacion: 
    const [limite, setLimite] = useState(9)
    const [offset, setOffset] = useState(0);
    const [total, setTotal] = useState(0);

    // Cambiar categoría y volver a la primera página
    function cambiarCategoria(nuevaCategoria) {
        setCategoria(nuevaCategoria);
        setBusqueda("");
        setOffset(0);
    }

    //manejamos el input buscador
    function cambiarBusqueda() {
        setOffset(0);
    }


    useEffect(function () {
        async function cargarPlatos() {
            try {
                //cuando vuelve a invocar la funcion reinicia los estados.
                setCargando(true);
                setError("");

                const respuesta = await fetch(
                    `${API_URL}/platos/?pagina=${paginaActual}&limite=${limite}${busqueda ? `&buscar=${busquedaRealizada}` 
                    : categoria ? `&categoria=${categoria}` : ""}`
                );


                if(!respuesta.ok)throw new Error("No se pudieron cargar los platos");
                
                const resultado = await respuesta.json();
                
                console.log(resultado.platos);

                setPlatos(resultado.platos);
                setTotal(resultado.total);

            } catch (error) {
                console.error("Error al cargar los platos:", error);
                setError("No pudimos cargar los platos. Por favor, inténtalo de nuevo.");
            } finally {
                setCargando(false)
            }
        }

        cargarPlatos();
    }, [offset, limite, categoria, busquedaRealizada]);

    //Calculo de la paginacion: 
    const paginaActual = Math.floor(offset / limite) + 1;
    const totalPaginas = Math.ceil(total / limite); //34platos / 5limite =6.8paginasceil(7)-> redondea hacia arriba
    //si queremos pagina anterior o siguiente:
    const tieneAnterior = offset > 0; //si offset = 0 no hay antes nada.
    const tieneSiguiente = offset + limite < total;

    const numerosDePagina = []; //array para numeraciones de la pagina.
    for (let numero = 1; numero <= totalPaginas; numero++) {
        numerosDePagina.push(numero);
        // 3 < 6 ? numerosDePagina[1,2,3]...
    }

    if (error) return <p className="estado error">{error}</p>

    return (
        <>
            <section className="menu" id="carta">

               <MenuNav
                    onCategoriaChange={cambiarCategoria}
                    busqueda={busqueda}
                    onCambioBusqueda={cambiarTextoBusqueda}
                />

                {cargando && (
                    <div className="estado-carga" role="status">
                        <div className="spinner"></div>
                    </div>
                )}

                {platos.length === 0 ?
                    <p className="estado">No se han encontrado platos que coincidan con tu búsqueda.</p>
                    : (
                        <div className="cards">
                            {platos.map(function (plato) {
                                return (
                                    <PlatoCard
                                        key={plato.id}
                                        plato={plato}
                                    />
                                );
                            })}
                        </div>
                    )}

                {totalPaginas > 1 && (
                    <Paginacion
                        paginaActual={paginaActual}
                        totalPaginas={totalPaginas}
                        tieneAnterior={tieneAnterior}
                        tieneSiguiente={tieneSiguiente}
                        numerosDePagina={numerosDePagina}
                        setOffset={setOffset}
                        offset={offset}
                        limite={limite}
                    />
                )}

            </section>


        </>
    )
}

export default PlatosPaginados;