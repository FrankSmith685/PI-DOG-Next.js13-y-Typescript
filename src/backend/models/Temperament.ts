import { Sequelize } from "sequelize";
const {DataTypes} = require('sequelize');

module.exports=(sequelize:Sequelize)=>{
    sequelize.define('temperament',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{timestamps:false});
}