# Guia Frontend Consumo de API — Mi Pokedex

## Datos academicos
- Estudiante: Francisco Javier Alvarez Gutierrez
- Asignatura: Diseño de Sistemas de Internet
- Docente: Ing. Cristopher Larios

## Descripcion
Portal web que permite consultar informacion de Pokemon mediante
una API publica. El usuario puede buscar por nombre o numero,
o seleccionar un Pokemon aleatorio entre los primeros 151.

## Tecnologias utilizadas
- HTML5: estructura de la pagina.
- CSS3: diseño visual y adaptacion a dispositivos moviles.
- JavaScript: interaccion y consulta a la API.
- Fetch API: peticiones HTTP.
- Async/await: manejo de operaciones asincronas.

## API utilizada
PokeAPI: https://pokeapi.co/

Ejemplo de consulta:
https://pokeapi.co/api/v2/pokemon/pikachu

## Funcionalidades
- Busqueda de Pokemon por nombre o numero.
- Seleccion aleatoria entre los primeros 151 Pokemon.
- Visualizacion de imagen, tipos, altura y peso.
- Presentacion de habilidades y experiencia base.
- Estadisticas base con barras visuales.
- Mensajes de carga y manejo de errores.
- Diseño adaptable a celulares.

## Funcionamiento
1. El usuario ingresa un nombre o numero.
2. JavaScript realiza una peticion HTTP GET mediante fetch().
3. Se verifica el estado de la respuesta con respuesta.ok.
4. La respuesta se convierte a JSON con respuesta.json().
5. Los datos se muestran mediante elementos creados en el DOM.
6. Si ocurre un error, se presenta un mensaje al usuario.

Se utilizan try, catch y finally para manejar la consulta,
los errores y la reactivacion de los botones.

## Estructura
- index.html: estructura principal.
- css/styles.css: estilos del portal.
- js/app.js: consumo de la API y presentacion de resultados.
- README.md: documentacion.

## Como ejecutar
1. Descargar o clonar este repositorio.
2. Abrir index.html en un navegador.
3. Mantener una conexion a internet para consultar la API.

## Repositorio del proyecto
https://github.com/FranAG87/Guia_Frontend_Consumo_API