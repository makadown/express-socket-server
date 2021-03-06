import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados, mapa, mapaGoogle, escritorios, tickets, colas } from '../sockets/socket';
import { graficaData } from '../classes/grafica';

const router = Router();

/*************** Rutas de colas ***********************/

router.get('/escritorios', (req: Request, res: Response) => {
  res.json( escritorios.getEscritorios() );
});

router.get('/tickets', (req: Request, res: Response) => {
  res.json( tickets.getTickets() );
});

router.get('/cola', (req: Request, res: Response) => {
  res.json( colas.getCola() );
});

/****************************************************/
/************* RUTAS DE MAPA (inicio) ***************/
/****************************************************/
router.get('/mapa-google', (req: Request, res: Response) => {
  res.json( mapaGoogle.getMarcadores() );
});

router.get('/mapa', (req: Request, res: Response) => {
  res.json( mapa.getMarcadores() );
});

/****************************************************/
/**************** RUTAS DE MAPA (fin) ***************/
/****************************************************/

// Esto es de clases pasadas.

const grafica = new graficaData();

router.get('/grafica', (req: Request, res: Response) => {
  res.json( grafica.getDataGrafica() );
});

router.post('/grafica', (req: Request, res: Response) => {
  const mes = req.body.mes;
  const unidades = Number ( req.body.unidades ) ;
 
  grafica.incrementarValor(  mes, unidades );

  const server = Server.instance;
  server.io.emit('cambio-grafica', grafica.getDataGrafica() );

  res.json( grafica.getDataGrafica() );
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
  const cuerpo = req.body.cuerpo;
  const de = req.body.de;
  const id = req.params.id;

  const payload = {
    de,
    cuerpo
  };
  const server = Server.instance;

  server.io.in(id).emit('mensaje-privado', payload);

  res.json({
    ok: true,
    cuerpo,
    de,
    id
  });
});

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (req: Request, res: Response) => {
  const server = Server.instance;

  server.io.clients((err: any, clientes: string[]) => {
    if (err) {
      return res.json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      clientes
    });
  });
});

// Obtener usuarios y sus nombres
router.get('/usuarios/detalle', (req: Request, res: Response) => {

  res.json({
    ok: true,
    clientes: usuariosConectados.getLista()
  });

});

export default router;
