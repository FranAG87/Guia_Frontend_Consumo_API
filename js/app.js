// Elementos de la página
const formulario = document.getElementById("formulario-busqueda");
const input = document.getElementById("pokemon-input");
const botonBuscar = document.getElementById("boton-buscar");
const botonAleatorio = document.getElementById("boton-aleatorio");
const mensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");

// Traducciones para mostrar las estadísticas en español
const nombresEstadisticas = {
  hp: "Puntos de vida",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque especial",
  "special-defense": "Defensa especial",
  speed: "Velocidad"
};

const nombresTipos = {
  normal: "Normal",
  fire: "Fuego",
  water: "Agua",
  electric: "Eléctrico",
  grass: "Planta",
  ice: "Hielo",
  fighting: "Lucha",
  poison: "Veneno",
  ground: "Tierra",
  flying: "Volador",
  psychic: "Psíquico",
  bug: "Bicho",
  rock: "Roca",
  ghost: "Fantasma",
  dragon: "Dragón",
  dark: "Siniestro",
  steel: "Acero",
  fairy: "Hada"
};

// Consultar la API utilizando async/await
async function buscarPokemon(consulta) {
  const busqueda = String(consulta).trim().toLowerCase();

  mensaje.classList.remove("error");

  if (!busqueda) {
    mensaje.textContent = "Escribí el nombre o número de un Pokémon.";
    mensaje.classList.add("error");
    return;
  }

  mensaje.textContent = "Buscando Pokémon...";
  resultado.replaceChildren();
  resultado.setAttribute("aria-busy", "true");

  botonBuscar.disabled = true;
  botonAleatorio.disabled = true;

  try {
    const url =
      `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(busqueda)}`;

    // 1. Realizar la petición HTTP
    const respuesta = await fetch(url);

    // 2. Comprobar si la petición fue exitosa
    if (!respuesta.ok) {
      if (respuesta.status === 404) {
        throw new Error(
          "No se encontró ese Pokémon. Revisá el nombre o número."
        );
      }

      throw new Error(`Error del servidor: ${respuesta.status}`);
    }

    // 3. Convertir la respuesta a JSON
    const pokemon = await respuesta.json();

    // 4. Mostrar los datos en la página
    mostrarPokemon(pokemon);
    mensaje.textContent = "¡Pokémon encontrado!";
  } catch (error) {
    mensaje.textContent = error instanceof TypeError
      ? "No se pudo conectar con la API. Revisá tu conexión e intentá de nuevo."
      : error.message;

    mensaje.classList.add("error");
  } finally {
    // Se ejecuta tanto si hubo éxito como si hubo un error
    botonBuscar.disabled = false;
    botonAleatorio.disabled = false;
    resultado.setAttribute("aria-busy", "false");
  }
}

// Crear elementos usando textContent para insertar los textos
function crearElemento(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);

  if (clase) {
    elemento.className = clase;
  }

  if (texto !== undefined) {
    elemento.textContent = texto;
  }

  return elemento;
}

// Mostrar la información recibida de la API
function mostrarPokemon(pokemon) {
  const tarjeta = crearElemento("article", "tarjeta-pokemon");

  const numero = crearElemento(
    "span",
    "numero-pokemon",
    `#${String(pokemon.id).padStart(3, "0")}`
  );

  const nombre = crearElemento("h2", "nombre-pokemon", pokemon.name);

  tarjeta.append(numero, nombre);

  const imagenUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  if (imagenUrl) {
    const imagen = crearElemento("img", "imagen-pokemon");
    imagen.src = imagenUrl;
    imagen.alt = `Imagen de ${pokemon.name}`;
    tarjeta.append(imagen);
  }

  const tipos = crearElemento("div", "tipos");

  pokemon.types.forEach((elemento) => {
    const tipo = elemento.type.name;

    tipos.append(
      crearElemento("span", "tipo", nombresTipos[tipo] || tipo)
    );
  });

  tarjeta.append(tipos);

  const datos = crearElemento("div", "datos-pokemon");

  agregarDato(datos, "Altura", `${pokemon.height / 10} m`);
  agregarDato(datos, "Peso", `${pokemon.weight / 10} kg`);

  agregarDato(
    datos,
    "Habilidades",
    pokemon.abilities
      .map((elemento) => elemento.ability.name.replaceAll("-", " "))
      .join(", ")
  );

  agregarDato(
    datos,
    "Experiencia base",
    pokemon.base_experience ?? "No disponible"
  );

  tarjeta.append(datos);

  const estadisticas = crearElemento("div", "estadisticas");
  estadisticas.append(crearElemento("h3", "", "Estadísticas base"));

  pokemon.stats.forEach((elemento) => {
    const fila = crearElemento("div", "estadistica");
    const informacion = crearElemento("div", "estadistica-info");

    const etiqueta =
      nombresEstadisticas[elemento.stat.name] || elemento.stat.name;

    informacion.append(
      crearElemento("span", "", etiqueta),
      crearElemento("strong", "", elemento.base_stat)
    );

    const barra = crearElemento("div", "barra");
    barra.setAttribute("aria-hidden", "true");

    const relleno = crearElemento("div", "barra-relleno");

    // Escala visual de 0 a 255
    const porcentaje = Math.min(100, (elemento.base_stat / 255) * 100);
    relleno.style.width = `${porcentaje}%`;

    barra.append(relleno);
    fila.append(informacion, barra);
    estadisticas.append(fila);
  });

  tarjeta.append(estadisticas);
  resultado.replaceChildren(tarjeta);
}

// Crear cada bloque de información
function agregarDato(contenedor, titulo, valor) {
  const bloque = crearElemento("div", "dato");

  bloque.append(
    crearElemento("h3", "", titulo),
    crearElemento("p", "", valor)
  );

  contenedor.append(bloque);
}

// Buscar al presionar el botón o la tecla Enter
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  if (!botonBuscar.disabled) {
    buscarPokemon(input.value);
  }
});

// Elegir al azar entre los primeros 151 Pokémon
botonAleatorio.addEventListener("click", () => {
  const numero = Math.floor(Math.random() * 151) + 1;
  input.value = numero;
  buscarPokemon(numero);
});

// Mostrar un Pokémon al abrir la página
buscarPokemon("pikachu");