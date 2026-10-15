import "../styles/estilosPlatoCard.css";

function PlatoCard({plato}){
    return (
    <article className="card">
      <h3>{plato.nombre}</h3>

      <img
        src={plato.imagen}
        alt={plato.nombre}
        className="card__image"
        loading="lazy"
        decoding="async"
        width="400"
        height="300"
      />

      <p className="card__price">
        <strong>{Number(plato.precio).toFixed(2)} €</strong>
      </p>
      <a className="plato-detalle__volver" href={`/platos/${plato.id}`}>

        Ver detalles
      </a>
    </article>
  );
}

export default PlatoCard;
