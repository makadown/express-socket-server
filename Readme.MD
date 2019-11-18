# Sockets Express Server

Proyecto de servidor express de sockers.

Bajo la guía del maestro Fernando Herrera como parte del curso https://www.udemy.com/course/angular-aplicaciones-en-tiempo-real


Este es su proyecto cliente:
https://github.com/makadown/cliente-socket-basico



Para reconstruir módulos de Node:

```
npm install
```

Primero generar el DIST
```
tsc -w
```

Luego levantar server (cualquiera de éstos dos comandos)
```
nodemon /dist
node /dist
```
Ahora, a partir de cada cambio que se haga en index.ts, se reinicia el server actualizando
el folder dist y su contenido.


## Instalaciones previas

Instalar:

```
npm install express
npm install cors
npm install body-parser
npm install socket.io
npm install @types/socket.io --save-dev
```

inicializar el ts-config

```
tsc --init
```

Modificar 

```
- el tsconfig.json cambiando el "target": "es6"
- Descomentar y editar el "outDir": "dist/"
- decomentar "types": [], 
``` 
