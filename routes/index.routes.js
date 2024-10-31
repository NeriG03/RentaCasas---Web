import express from 'express';
import usuarioRoutes from './usuario.routes.js';
import casaRoutes from './casa.routes.js';



export default function routes(app){
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('', usuarioRoutes);
    router.use('', casaRoutes);

}


