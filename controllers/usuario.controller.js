import UsuarioService from "../services/usuario.service.js";
import bcryptjs from "bcryptjs";

const usuarioService = new UsuarioService();

const post = async (req, res) => {
    try {
        const { nombre, email, telefono, password } = req.body;

        if (!nombre || !email || !telefono || !password) {
            throw new Error("nombre, email, telefono y password son campos obligatorios");
        }

        const userExists = await usuarioService.getByEmail(email);
        if (userExists) {
            throw new Error("El email ya está registrado");
        }

        const salt = bcryptjs.genSaltSync(15);
        const hash = bcryptjs.hashSync(password, salt);


        const usuario = await usuarioService.create({ nombre, email, telefono, password: hash });

        


        res.status(201).json(usuario); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const get = async (req, res) => {
    try {
        const usuarios = await usuarioService.getAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const usuario = await usuarioService.getById(req.params.id);
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const put = async (req, res) => {
    try {
        await usuarioService.update(req.params.id, req.body);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        await usuarioService.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default { post, get, getById, put, deleteUser };
