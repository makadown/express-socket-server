import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregar(usuario);
};

/**
 * Aqui se crea la configuración y las opciones de cada una de las acciones que serán disparadas 
 * desde server.ts 
 * @param cliente 
 */
export const desconectar = (cliente: Socket) => {

    cliente.on( 'disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id);
        console.log('Cliente desconectado');
    });   
};

/**
 * Para escuchar mensajes
 * @param cliente 
 */
export const mensaje = (cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('mensaje', 
        (payload: { de: string, cuerpo: string}) => {
            console.log('Mensaje recibido', payload);
            io.emit('mensaje-nuevo', payload );
        });
}


/***
 * Para configurar el usuario que se loguea
 */
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server ) => {
    cliente.on('configurar-usuario', 
        (payload: { nombre: string }, callback: Function ) => {
            usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
            callback({
                ok: true,
                mensaje: `Usuario ${ payload.nombre }, configurado`
            });
        });
}