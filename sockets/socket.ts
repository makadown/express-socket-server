import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { Mapa } from '../classes/mapa';
import { Marcador } from '../classes/marcador';

export const usuariosConectados = new UsuariosLista();
export const mapa = new Mapa();

/*********************************************/
/******* Eventos de mapa (inicio) ************/
/*********************************************/
export const mapaSockets = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('marcador-nuevo', (marcador: Marcador) => {
        /*console.log('recibiendo en server marcador nuevo');
        console.log(marcador);*/
        mapa.agregarMarcador(marcador);
        /* Emitir a todos excepto el cliente que creó el marcador 
           para actualizar lista de marcadores mostrados en frontend, 
         */
        // console.log('haciendo broadcast');
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });

};

/*********************************************/
/********** Eventos de mapa (fin)*************/
/*********************************************/


export const conectarCliente = (cliente: Socket, io: SocketIO.Server) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
    console.log('Cliente conectado:');
    console.log(usuario);
    /* Emitir a todos para actualizar lista de usuarios activos mostrada en frontend */
    io.emit('usuarios-activos', usuariosConectados.getLista());
};

/**
 * Aqui se crea la configuración y las opciones de cada una de las acciones que serán disparadas 
 * desde server.ts 
 * @param cliente 
 */
export const desconectar = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id);
        console.log('Cliente desconectado');
        /* Emitir a todos para actualizar lista de usuarios activos mostrada en frontend */
        io.emit('usuarios-activos', usuariosConectados.getLista());
    });
};

/**
 * Para escuchar mensajes de usuarios
 * @param cliente 
 */
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje',
        (payload: { de: string, cuerpo: string }) => {
            console.log('Mensaje recibido', payload);
            io.emit('mensaje-nuevo', payload);
        });
}


/***
 * Para configurar el usuario que se loguea
 */
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario',
        (payload: { nombre: string }, callback: Function) => {
            usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
            /* Emitir a todos para actualizar lista de usuarios activos mostrada en frontend */
            io.emit('usuarios-activos', usuariosConectados.getLista());
            callback({
                ok: true,
                mensaje: `Usuario ${payload.nombre}, configurado`
            });
        });
}

/***
 * Para obtener usuarios activos.
 * Usado para cuando el cliente emita una petición de obtener usuarios activos.
 */
export const obtenerUsuarios = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('obtener-usuarios', () => {
        // para emitir solo al cliente que se conecta y no a todos
        io.to(cliente.id).emit('usuarios-activos', usuariosConectados.getLista());
    });
}