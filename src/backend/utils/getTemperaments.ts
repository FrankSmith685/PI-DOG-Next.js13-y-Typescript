import axios from "axios";
const { Temperament } = require("../db");

const API="https://api.thedogapi.com/v1/breeds";

interface TemperamentData {
    temperament: string;
    // otros campos si los hubiera
  }
  
const getTemperament=async()=>{
    const tempe=await Temperament.findAll();
    if(tempe.length<=0){
        try {
            const getData=await axios.get(API);
            const getDataInfo=await getData.data.map((data:TemperamentData) => data.temperament);
            
            const dataTemperament:string[]=[];
            const temperaments:string[]=[];

            getDataInfo.forEach((temp:string) => {
                if(temp!==undefined){
                    const dataTemp=temp.split(",");
                    if(dataTemp && dataTemp.length > 0){
                        dataTemp.forEach((t:string)=>{
                            if(!dataTemperament.includes(t)){
                                dataTemperament.push(t);
                            }
                        });
                    }
                }
            });
            dataTemperament.forEach((temp:string)=>{
                
                if(!temperaments.includes(temp.trim())){
                    temperaments.push(temp.trim());
                }
            })
            // Ordenar de A-Z
            const orderTemperament=temperaments.sort((a:string,b:string)=>{
                if(a.toLowerCase()>b.toLowerCase()){
                    return 1;
                }else if(a.toLowerCase()<b.toLowerCase()){
                    return -1;
                }else{
                    return 0;
                }
            })
            //Convertir los datos en un objeto
            const dataTemperaments=orderTemperament.map(el=>{
                return {
                    name:el
                }
            })
            
            // Ingresar los datos a la tabla temeperaments
            await Temperament.bulkCreate(dataTemperaments);
            console.log("Se ha guardado a la tabla")
        
        } catch (error:any) {
            console.log("Error :"+error.message);
        } 
    }else{
        console.log("Ya existe datos en la tabla");
    }
}

module.exports={
    getTemperament
}