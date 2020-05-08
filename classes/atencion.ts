import { Generico } from './generico';

export class Atencion { 

    constructor(
        public id: string,
        public escritorio: Generico,
        public ticket: Generico) {
    }

}