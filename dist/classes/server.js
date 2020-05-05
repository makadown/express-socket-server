"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/socket"));
/**
 * Esta clase representa el servidor de chat. Es nuestro backend.
 */
class Server {
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        this.io = socket_io_1.default(this.httpServer);
        this.escucharSockets();
    }
    /**
     * Obtengo instancia singleton de clase Server.
     */
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    /**
     * Se encarga de escuchar sockets
     */
    escucharSockets() {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', cliente => {
            // Conectar Cliente
            socket.conectarCliente(cliente, this.io);
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
    start(callback) {
        // this.app.listen( this.port, callback() );
        this.httpServer.listen(this.port, callback());
    }
}
exports.default = Server;
