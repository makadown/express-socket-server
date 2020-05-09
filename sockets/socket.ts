import { Socket } from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';
import { Mapa } from '../classes/mapa';
import { Marcador } from '../classes/marcador';
import { MapaGoogle } from '../classes/mapa-google';
import { Escritorio } from '../classes/escritorio';
import { Ticket } from '../classes/ticket';
import { Cola } from '../classes/cola';
import { Generico } from '../classes/generico';
import { Atencion } from '../classes/atencion';

export const usuariosConectados = new UsuariosLista();
export const mapa = new Mapa();
export const mapaGoogle = new MapaGoogle();
// para proyecto de colas
export const escritorios = new Escritorio();
export const tickets = new Ticket();
export const colas = new Cola();

/**************** Eventos de colas *************************/
export const colaSockets = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('crear-escritorio', (escritorio: Generico) => {
        escritorios.agregarEscritorio(escritorio);
        cliente.broadcast.emit('crear-escritorio', escritorio);
    });

    cliente.on('crear-ticket', (ticket: Generico) => {
        tickets.agregarTicket(ticket);
        cliente.broadcast.emit('crear-ticket', ticket);
    });

    cliente.on('agregar-a-cola', (atencion: Atencion) => {
        colas.agregarACola(atencion);
        cliente.broadcast.emit('agregar-a-cola', atencion);
        /* al agregar el ticket a cola de atenciones, libero el ticket y 
          emito su liberación para quitarlo de la lista de espera a los escritorios 
          activos */
        tickets.borrarTicket(atencion.ticket.numero);
        cliente.broadcast.emit('ticket-liberado', atencion.ticket);
    });

};

/*********************************************/
/******* Eventos de mapa google (inicio) ************/
/*********************************************/
export const mapaGoogleSockets = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('marcador-google-nuevo', (marcador: Marcador) => {
        mapaGoogle.agregarMarcador(marcador);
        cliente.broadcast.emit('marcador-google-nuevo', marcador);
    });

    cliente.on('marcador-google-mover', (marcador: Marcador) => {
        mapaGoogle.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-google-mover', marcador);
    });

    cliente.on('marcador-google-borrar', (id: string) => {
        mapaGoogle.borrarMarcador(id);
        cliente.broadcast.emit('marcador-google-borrar', id);
    });

};

/*********************************************/
/********** Eventos de mapa google (fin)*************/
/*********************************************/

/*********************************************/
/******* Eventos de mapa mapbox (inicio) ************/
/*********************************************/
export const mapaSockets = (cliente: Socket, io: SocketIO.Server) => {

    cliente.on('marcador-nuevo', (marcador: Marcador) => {
        mapa.agregarMarcador(marcador);
        /* Emitir a todos excepto el cliente que creó el marcador 
           para actualizar lista de marcadores mostrados en frontend, 
         */
        cliente.broadcast.emit('marcador-nuevo', marcador);
    });

    cliente.on('marcador-mover', (marcador: Marcador) => {
        mapa.moverMarcador(marcador);
        cliente.broadcast.emit('marcador-mover', marcador);
    });

    cliente.on('marcador-borrar', (id: string) => {
        mapa.borrarMarcador(id);
        cliente.broadcast.emit('marcador-borrar', id);
    });

};

/*********************************************/
/********** Eventos de mapa mapbox (fin)*************/
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