# Sockets Express Server

Proyecto de servidor express de sockers.

Bajo la guía del maestro Fernando Herrera como parte del curso https://www.udemy.com/course/angular-aplicaciones-en-tiempo-real

## Instalaciones previas

Instalar:

´´´

npm install express

npm install cors

npm install body-parser

´´´

inicializar el ts-config

´´´

tsc --init

´´´

Modificar 

´´´

- el tsconfig.json cambiando el "target": "es6" 

- Descomentar y editar el "outDir": "dist/"

- decomentar "types": [], 

´´´

Correr el proyecto en modo watch

´´´

tsc -w

´´´

Correr nodemon para executar el folder dist

´´´

nodemon /dist

´´´

Ahora, a partir de cada cambio que se haga en index.ts, se reinicia el server actualizando
el folder dist y su contenido.