import { Marcador } from './marcador';

export class MapaGoogle {
	private marcadores: Marcador[] = [{
        id: '1',
        nombre: 'Udemy',
        lat: 37.784679,
        lng: -122.395936,
        color: ''
    },
    {
        id: '2',
        nombre: 'Bahía de San Francisco',
        lat: 37.798933,
        lng: -122.377732,
        color: ''
    },
    {
        id: '3',
        nombre: 'The Palace Hotel',
        lat: 37.788578,
        lng: -122.401745,
        color: ''
    }];

	constructor() {}

	getMarcadores() {
		return this.marcadores;
	}

	agregarMarcador(marcador: Marcador) {
		// creando nuevo objeto vanillaJs style
		this.marcadores.push(marcador);
		/* console.log('ahora es');
        console.log(this.marcadores);*/
	}

	borrarMarcador(id: string) {
		this.marcadores = this.marcadores.filter((mark) => mark.id !== id);
		return this.getMarcadores();
	}

	moverMarcador(marcador: Marcador) {
		for (const i in this.marcadores) {
			if (this.marcadores[i].id === marcador.id) {
				this.marcadores[i].lng = marcador.lng;
                this.marcadores[i].lat = marcador.lat;
                break;
			}
		}
	}
}
