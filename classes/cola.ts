import { Atencion } from './atencion';

export class Cola {
	/**
	 * Auxiliar para dejar que el front muestre en publico los elementos en cola.
	 */
	private elementosAMostrarEnCola = 4;
	/**
	 * los 4 elementos dummy inicializados
	 */
	private atenciones: Atencion[] = [
		{ id: '', escritorio: { id: '', numero: 0 }, ticket: { id: '', numero: 0 } },
		{ id: '', escritorio: { id: '', numero: 0 }, ticket: { id: '', numero: 0 } },
		{ id: '', escritorio: { id: '', numero: 0 }, ticket: { id: '', numero: 0 } },
		{ id: '', escritorio: { id: '', numero: 0 }, ticket: { id: '', numero: 0 } }
	];

	constructor() { }

	getCola(): Atencion[] {
		return this.atenciones.slice(0, this.elementosAMostrarEnCola);
	}

	/**
	 * pongo en primera posicion de muestra, 
	 * aqui es distinto a como se crean escritorios o atenciones
	 * @param atencion 
	 */
	agregarACola(atencion: Atencion): void {
		this.borrarDeColaPorEscritorio(atencion.escritorio.numero);
		this.atenciones.unshift(atencion);
	}

	/**
	 * Si existe escritorio atendiendo, como va a atender un nuevo ticket
	 * elimino su registro actual.
	 * @param numeroEscritorio 
	 */
	borrarDeColaPorEscritorio(numeroEscritorio: number): void {
		this.atenciones = 
			this.atenciones.filter((a) => a.escritorio.numero !== numeroEscritorio);
	}

	/**
	 * Metodo creado. Mas no implementeado. Veremos a futuro =)
	 * @param id 
	 */
	borrarDeCola(id: string): Atencion[] {
		this.atenciones = this.atenciones.filter((mark) => mark.id !== id);
		return this.getCola();
	}
}