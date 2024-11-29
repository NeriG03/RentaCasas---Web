import express from 'express';
import CasaController from '../controllers/casa.controller.js';
//import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

router
    .get('/casa', CasaController.get)
    .get('/casa/:id', CasaController.getById)
    .get('/casa/user/:id', CasaController.getByUserEmail)
    .post('/casa' ,CasaController.post)
    .put('/casa/:id' ,CasaController.put)
    .delete('/casa/:id' ,CasaController.deleteCasa);

export default router;