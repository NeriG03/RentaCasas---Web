import UsuarioService from "../services/usuario.service.js";

const usuarioService = new UsuarioService();

const post = async (req, res) => {
    try {
        const usuario = await usuarioService.create(req.body);
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
