const {Router}=require('express');
import { Request,Response } from "express";
const dogs=Router();

dogs.get("/",(req:Request,res:Response)=>{
    res.status(200).send("HOLA");
});

export default dogs;