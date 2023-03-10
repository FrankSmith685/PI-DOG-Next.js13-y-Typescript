const {conn} = require("./backend/db");
const express = require('express');
import { Request, Response } from 'express';
const server = require('./backend/app');

const next = require('next');
const app = next({ dev: true });
const handle = app.getRequestHandler();

// Importamos lo que se ejecutara
const {getTemperament} = require("./backend/utils/getTemperaments");


app.prepare().then(() => {
  server.get('*', (req:Request, res:Response) => {
    return handle(req, res);
  });
  conn.sync({force:true}).then(()=>{
    server.listen(3000, async() => {
      await getTemperament();
      console.log('Servidor iniciado en http://localhost:3000');
    });
  })
});