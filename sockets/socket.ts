import { Socket } from 'socket.io';

/* Aqui se crea la configuración y las opciones de cada una de las acciones que serán disparadas desde
server.ts */

export const desconectar = (cliente: Socket) => {

    cliente.on( 'disconnect', () => {
        console.log('Cliente desconectado');
    });   
};

/**
 * Para escuchar mensajes
 * @param cliente 
 */
export const mensaje = (cliente: Socket ) => {
    cliente.on('mensaje', 
        (payload: { de: string, cuerpo: string}) => {
            console.log('Mensaje recibido', payload);
        });
}