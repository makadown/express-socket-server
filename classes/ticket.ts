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

	borrarTicket(id: string) {
		this.tickets = this.tickets.filter((mark) => mark.id !== id);
		return this.getTickets();
	}
}
