import { Casa, Usuario } from "../src/models/index.models.js";

class CasaService{
    constructor(){}

    async create(data){
        return await Casa.create(data);
    }

    async getAll(){
        return await Casa.findAll(
            {
                include: Usuario
            }
        );
    }

    async getById(id){
        return await Casa.findByPk(id, {
            include: Usuario
        });
    }

    async update(id, data){
        return await Casa.update(data, {
            where: {
                id
            }
        });
    }

    async delete(id){
        return await Casa.destroy({
            where: {
                id
            }
        });
    }

    async getByUserEmail(email) {
        return await Casa.findAll({
            include: {
                model: Usuario,
                where: { email }
            }
        });
    }

}

export default CasaService;