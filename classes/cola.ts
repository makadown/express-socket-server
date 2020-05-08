import { Atencion } from './atencion';

export class cola {
    private atenciones: Atencion[] = [];

	constructor() {}

	getCola() {
		return this.atenciones;
	}

	agregarACola(atenciones: Atencion) {
		this.atenciones.push(atenciones);
	}

	borrarDeCola(id: string) {
		this.atenciones = this.atenciones.filter((mark) => mark.id !== id);
		return this.getCola();
	}
}