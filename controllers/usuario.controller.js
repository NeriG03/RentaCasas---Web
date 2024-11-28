import UsuarioService from "../services/usuario.service.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

        const salt = await bcryptjs.genSalt(15);
        const hash = await bcryptjs.hash(password, salt);


        const usuario = await usuarioService.create({ nombre, email, telefono, password: hash });

        const token = jwt.sign({ email: usuario.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });


        
        res.status(201).json({ok: true, token: token}); 
    
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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error("email y password son campos obligatorios");
        }

        const usuario = await usuarioService.getByEmail(email);
        if (!usuario) {
            throw new Error("El email no está registrado");
        }

        const validPassword = await bcryptjs.compare(password, usuario.password);
        if (!validPassword) {
            throw new Error("La contraseña no es válida");
        }

        const token = jwt.sign({ email: usuario.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.status(200).json({ok: true,  token: token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const profile = async (req, res) => {
    try {
        const usuario = await usuarioService.getByEmail(req.email);
        const { nombre, email, telefono } = usuario;
        res.status(200).json({ nombre, email, telefono });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default { post, get, getById, put, deleteUser, login, profile };
