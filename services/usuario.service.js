import { Usuario } from "../src/models/index.models.js"

class UsuarioService{
    constructor(){}

    async create(data){
        return await Usuario.create(data);
    }

    async getAll(){
        return await Usuario.findAll();
    }

    async getById(id){
        return await Usuario.findByPk(id);
    }

    async update(id, data){
        return await Usuario.update(data, {
            where: {
                id
            }
        });
    }

    async delete(id){
        return await Usuario.destroy({
            where: {
                id
            }
        });
    }

}

export default UsuarioService;