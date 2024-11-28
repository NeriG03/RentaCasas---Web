import express from 'express';
import CasaController from '../controllers/casa.controller.js';
import { verifyToken } from '../middlewares/jwt.middleware.js';

const router = express.Router();

router
    .get('/casa', CasaController.get)
    .get('/casa/:id', CasaController.getById)
    .get('/casa/user/:id', verifyToken, CasaController.getByUserEmail)
    .post('/casa', verifyToken ,CasaController.post)
    .put('/casa/:id', verifyToken ,CasaController.put)
    .delete('/casa/:id', verifyToken ,CasaController.deleteCasa);

export default router;