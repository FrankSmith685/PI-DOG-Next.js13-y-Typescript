import { Sequelize } from "sequelize";
const { DataTypes } = require('sequelize');

module.exports = (sequelize:Sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    weight:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false
    },
    life_span:{
      type:DataTypes.STRING
    },
    image:{
      type:DataTypes.STRING
    }
  },{timestamps:false});
};
