import { Generico } from './generico';

export class Ticket {
	private tickets: Generico[] = [];

	constructor() {}

	getTickets() {
		return this.tickets;
	}

	agregarTicket(ticket: Generico) {
		this.tickets.push(ticket);
	}

	/**
	 * Metodo creado. Mas no implementeado. Veremos a futuro =)
	 * @param numero 
	 */
	borrarTicket(numero: number) {
		this.tickets = this.tickets.filter((t) => t.numero !== numero);
		return this.getTickets();
	}
}
