import { Generico } from './generico';

export class Escritorio {
	private escritorios: Generico[] = [];

	constructor() {}

	getEscritorios() {
		return this.escritorios;
	}

	agregarEscritorio(escritorio: Generico) {
		this.escritorios.push(escritorio);
	}

	/**
	 * Metodo creado. Mas no implementeado. Veremos a futuro =)
	 * @param id 
	 */
	borrarEscritorio(id: string) {
		this.escritorios = this.escritorios.filter((mark) => mark.id !== id);
		return this.getEscritorios();
	}
}
