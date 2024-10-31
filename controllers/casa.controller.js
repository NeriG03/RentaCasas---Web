import CasaService from "../services/casa.service.js";

const casaService = new CasaService();

const post = async (req, res) => {
    try {
        const casa = await casaService.create(req.body);
        res.status(201).json(casa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const get = async (req, res) => {
    try {
        const casas = await casaService.getAll();
        res.status(200).json(casas);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getById = async (req, res) => {
    try {
        const casa = await casaService.getById(req.params.id);
        res.status(200).json(casa);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const put = async (req, res) => {
    try {
        await casaService.update(req.params.id, req.body);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCasa = async (req, res) => {
    try {
        await casaService.delete(req.params.id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default { post, get, getById, put, deleteCasa };
