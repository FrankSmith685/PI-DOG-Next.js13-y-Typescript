const {Sequelize} = require('sequelize');
const pg = require('pg');
require('dotenv').config();

import fs from 'fs';
import path from 'path';

// const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/dogs');
const {
  DB_USER, DB_PASSWORD, DB_HOST,API_KEY, DB_NAME
} = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 7667,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error:string) => {
    console.error('Error al conectar a la base de datos:', error);
  });

  const basename: string = path.basename(__filename);
  const modelDefiners: any[] = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file:string) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.ts'))
  .forEach((file:string) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  // Injectamos la conexión (sequelize) a todos los modelos
  modelDefiners.forEach((model:any) => model(sequelize));

  // Capitalizamos los nombres de los modelos, por ejemplo: product => Product
  const entries: [string, any][] = Object.entries(sequelize.models);
  const capsEntries: [string, any][] = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
  sequelize.models = Object.fromEntries(capsEntries);

  // En sequelize.models están todos los modelos importados como propiedades
  // Para relacionarlos hacemos un destructuring
  const { Dog, Temperament } = sequelize.models;

  Dog.belongsToMany(Temperament,{through:"dog_temperament",timestamps:"false"});
  Temperament.belongsToMany(Dog,{through:"dog_temperament",timestamps:"false"});
  
  export {};

module.exports={
    conn: sequelize,
    ...sequelize.models
}