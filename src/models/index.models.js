import { Sequelize } from "sequelize";
import config from "../config/config.js";
import { Usuario, UsuarioSchema } from "./Usuario.model.js";
import { Casa, CasaSchema } from "./Casa.model.js";


function setUpModels(sequelize){
    Usuario.init(UsuarioSchema, Usuario.config(sequelize));
    Casa.init(CasaSchema, Casa.config(sequelize));

    //Relaciones
    Usuario.hasMany(Casa, {foreignKey: 'usuarioId'});
    Casa.belongsTo(Usuario, {foreignKey: 'usuarioId'});
}


const sequelize = new Sequelize(
    config.dbName, 
    config.dbUser, 
    config.dbPassword, {
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'postgres'
})


sequelize.sync()
setUpModels(sequelize);


export {
    setUpModels,
    Usuario,
    Casa
}