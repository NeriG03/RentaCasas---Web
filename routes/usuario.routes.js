import express from 'express';
import UsuarioController from '../controllers/usuario.controller.js';
import {verifyToken} from '../middlewares/jwt.middleware.js';

const router = express.Router();

router
    .get('/usuario', UsuarioController.get)
    .get('/usuario/:id', UsuarioController.getById)
    .post('/usuario', UsuarioController.post)
    .put('/usuario/:id', UsuarioController.put)
    .delete('/usuario/:id', UsuarioController.deleteUser)
    .post('/usuario/login', UsuarioController.login)
    .get('/usuarioP/profile', verifyToken, UsuarioController.profile);

export default router;