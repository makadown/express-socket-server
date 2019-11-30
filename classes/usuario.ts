export class Usuario {
    public id: string;
    public nombre: string;
    public sala: string;

    constructor(id: string) {
        this.nombre = 'sin-nombre';
        this.id = id;
        this.sala = 'sin-sala';
    }
}