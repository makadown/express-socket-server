# Sockets Express Server

Proyecto de servidor express de sockers.

Bajo la guía del maestro Fernando Herrera como parte del curso https://www.udemy.com/course/angular-aplicaciones-en-tiempo-real

Para reconstruir módulos de Node

```
npm install
```

Generar el DIST
´´´
tsc -w
´´´

Levantar server (cualquiera de éstos dos comandos)
´´´
nodemon /dist
node /dist
´´´
Ahora, a partir de cada cambio que se haga en index.ts, se reinicia el server actualizando
el folder dist y su contenido.


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