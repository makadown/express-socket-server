
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as socket from '../sockets/socket';

/**
 * Esta clase representa el servidor de chat. Es nuestro backend.
 */
export default class Server {

    /**
     * Propiedad estática
     */
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {

        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app)
        this.io = socketIO( this.httpServer );
        this.escucharSockets();
    }
    
    /**
     * Obtengo instancia singleton de clase Server.
     */
    public static get instance(): Server {
        return this._instance || ( this._instance = new this() );
    }

    /**
     * Se encarga de escuchar sockets
     */
    private escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            // Conectar Cliente
            socket.conectarCliente(cliente, this.io);
            // Configuracion para proyecto de colas
            socket.colaSockets(cliente, this.io);
            // Configuracion de mapas
            socket.mapaGoogleSockets(cliente, this.io);
            socket.mapaSockets(cliente, this.io);
            // Mensajes
            socket.mensaje(cliente, this.io);
            // Desconectar
            socket.desconectar(cliente, this.io);
            // Configurar usuario
            socket.configurarUsuario(cliente, this.io);
            // para obtener usuarios activos
            socket.obtenerUsuarios(cliente, this.io);
        });
    }

    start( callback: Function ) {

        // this.app.listen( this.port, callback() );
        this.httpServer.listen( this.port, callback() );

    }

}