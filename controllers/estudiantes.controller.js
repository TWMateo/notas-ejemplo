const {response}= require("express");
const {db}= require("../cnn");
//Consultas
const getEstudiantes =async (req,res)=>{
    const consulta="SELECT * FROM estudiantes";
    const response= await db.query(consulta);
    res.status(200).json(response)
    console.log(response); 
}

const getEstudiantesByCedula= async(req,res)=>{
    const consulta = "SELECT * FROM estudiantes where est_cedula LIKE $1;";
    try{
        const cedula = req.params.cedula;
        const response= await db.one(consulta,[cedula,]);
        res.status(200).json(response);
        console.log(response);
    }catch(e){
        res.status(400).json({
            code:e.code,
            message:"No se ha encontrado un estudiante con esta cedula"+
            " ("+req.params.cedula+")."
        })
    }
}

const postEstudiantes = async (req,res)=>{    
    const ingreso="INSERT INTO estudiantes "+
    "values ($1,$2,$3,$4) RETURNING*;";
    try{
        //Dentro de [] van los valores de $
        const estudiantes=req.body;
        const response=await db.one(ingreso,[
            estudiantes.cedula,
            estudiantes.nombres,
            estudiantes.apellidos
        ,estudiantes.nacimiento
        ]);
        res.status(201).json({
            message: "Estudiante ingresado correctamente",
            body:response
        });
        console.log(response);
    }catch (e){
       res.status(400).json({
           code: e.code,
           message:e.message
        });
    }
}

const putEstudiantes = async (req,res)=>{    
    const ingreso="UPDATE estudiantes SET "+
    "est_nombres=$2,est_apellidos=$3,"+
    "est_nacimiento=$4 where est_cedula=$1 "+
    "RETURNING*;";
    try{
        //Dentro de [] van los valores de $
        const estudiantes=req.body;
        const response=await db.one(ingreso,[
            estudiantes.cedula,
            estudiantes.nombres,
            estudiantes.apellidos,
            estudiantes.nacimiento
        ]);
        res.status(201).json({
            message: "Estudiante actualizado correctamente",
            body:response
        });
    }catch (e){
       res.status(400).json({
           code: e.code,
           message:e.message
        });
    }
}

const deleteEstudiantes= async(req,res)=>{
    const consulta = "DELETE FROM estudiantes where est_cedula LIKE $1;";
    try{
        const cedula = req.params.cedula;
        const response= await db.query(consulta,[cedula,]);
        res.status(200).json({
              message:"El estudiante con cedula "+
              cedula+" se ha eliminado correctatmente"
            });
        console.log(req.params.cedula);
    }catch(e){
        res.status(400).json({
            code:e.code,
            message:"No se ha encontrado un estudiante con esta cedula"+
            " ("+req.params.cedula+")."
        })
    }
}

//Exportar
module.exports={
    getEstudiantes,getEstudiantesByCedula,
    postEstudiantes,putEstudiantes,
    deleteEstudiantes
}