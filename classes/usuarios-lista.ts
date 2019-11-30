import { Usuario } from './usuario';

/**
 * Clase que representa una lista de usuarios
 */
export class UsuariosLista {
  private lista: Usuario[] = [];

  constructor() {}

  /**
   * Método para agregar un usuario a la lista
   * @param usuario
   */
  public agregar(usuario: Usuario) {
    this.lista.push(usuario);
    return usuario;
  }

  public actualizarNombre(id: string, nombre: string) {
    for (let usuario of this.lista) {
      if (usuario.id === id) {
        usuario.nombre = nombre;
        break;
      }
    }
  }

  /**
   * Obtener lista de usuarios.
   */
  public getLista() {
    return this.lista;
  }

  public getUsuario(id: string) {
    return this.lista.find(usuario => usuario.id === id);
  }

  /**
   * Obtiene la lista de usuarios de una sala en particular
   * @param sala
   */
  public getUsuariosEnSala(sala: string) {
    return this.lista.filter(usuario => usuario.sala === sala);
  }

  /**
   * Este método es para borrar usuario por Id.
   * Se regresa el usuario que se eliminó para tener disponible su nombre y mostrarlo en front.
   * @param id
   */
  public borrarUsuario(id: string) {
    const tempUsuario = this.getUsuario(id);
    this.lista = this.lista.filter(usuario => usuario.id !== id);
    return tempUsuario;
  }
}
