import "../styles/contacto.css";


function Contacto() {
return (
<section className="contacto">

        <h1 className="contacto__titulo">Contacto</h1>

        <form
            className="contacto__formulario"
            action="https://formspree.io/f/mwlpwrzz"
            method="POST"
        >
            <div className="contacto__campo">
                <label
                    className="contacto__label"
                    htmlFor="nombre"
                >
                    Nombre
                </label>

                <input
                    className="contacto__input"
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="¿Cómo te llamas?"
                    autoComplete="name"
                    minLength="2"
                    maxLength="60"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜüÇçÀ-ÿ' -]{2,60}"
                    title="Introduce un nombre válido de entre 2 y 60 caracteres."
                    aria-required="true"
                    required
                />
            </div>

            <div className="contacto__campo">
                <label
                    className="contacto__label"
                    htmlFor="email"
                >
                    Correo electrónico
                </label>

                <input
                    className="contacto__input"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tu@email.com"
                    autoComplete="email"
                    maxLength="120"
                    title="Introduce una dirección de correo electrónico válida."
                    aria-required="true"
                    required
                />
            </div>

            <div className="contacto__campo">
                <label
                    className="contacto__label"
                    htmlFor="asunto"
                >
                    Asunto
                </label>

                <input
                    className="contacto__input"
                    type="text"
                    id="asunto"
                    name="asunto"
                    placeholder="¿En qué podemos ayudarte?"
                    autoComplete="off"
                    minLength="5"
                    maxLength="100"
                    pattern="[A-Za-zÁÉÍÓÚáéíóúÑñÜüÇçÀ-ÿ0-9.,!?¿¡'()&%+:/ -]{5,100}"
                    title="El asunto debe tener entre 5 y 100 caracteres."
                    aria-required="true"
                    required
                />
            </div>

            <div className="contacto__campo">
                <label
                    className="contacto__label"
                    htmlFor="telefono"
                >
                    Teléfono
                </label>

                <input
                    className="contacto__input"
                    type="tel"
                    id="telefono"
                    name="telefono"
                    placeholder="+34 600 000 000"
                    autoComplete="tel"
                    inputMode="tel"
                    pattern="[+]?[0-9 ()-]{9,20}"
                    title="Introduce un número de teléfono válido. Puedes utilizar +, espacios, paréntesis y guiones."
                />
            </div>

            <div className="contacto__campo">
                <label
                    className="contacto__label"
                    htmlFor="mensaje"
                >
                    Mensaje
                </label>

                <textarea
                    className="contacto__textarea"
                    id="mensaje"
                    name="mensaje"
                    rows="6"
                    placeholder="¿Tienes alguna duda, quieres trabajar con nosotros o necesitas más información? Cuéntanos qué necesitas y estaremos encantados de ayudarte."
                    minLength="20"
                    maxLength="2000"
                    title="El mensaje debe tener entre 20 y 2000 caracteres."
                    aria-required="true"
                    required
                ></textarea>
            </div>

            <button
                className="contacto__boton boton-estilo"
                type="submit"
            >
                Enviar mensaje
            </button>
        </form>

    </section>
);

}

export default Contacto;