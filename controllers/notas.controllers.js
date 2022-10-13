/*Controllers - Son las consultas a la base de datos*/
const e = require("express");
const { response } = require("express");
const { db } = require("../cnn");

//Se usa async en funciones y await en las consultas
//Debido a que JS es un lenguaje asincrono
//Consultas
const getNotas = async (req, res) => {
  const consulta = "SELECT * FROM notas;";
  const response = await db.query(consulta);
  res.status(200).json(response);
  console.log(response);
};

const getNotasNombres = async (req, res) => {
  const consulta = "Select * from notas_nombres_apellidos ORDER BY concat";
  const response = await db.query(consulta);
  res.status(200).json(response);
  console.log(response);
};

const getNotasById = async (req, res) => {
  const consulta = "SELECT * FROM notas where not_id = $1;";
  try {
    const ID = req.params.id;
    const response = await db.one(consulta, [ID]);
    res.status(200).json(response);
    console.log(response);
  } catch (e) {
    res.status(400).json({
      code: e.code,
      message:
        "No se ha encontrado un estudiante con este ID (" +
        req.params.id +
        ").",
    });
  }
};

const postNotas = async (req, res) => {
  const consulta = "INSERT INTO notas values($1,$2,$3,$4,$5);";
  try {
    const notas = req.body;
    const response = await db.one(consulta, [
      notas.not_id,
      notas.not_est_cedula,
      notas.not_proyectos,
      notas.not_deberes,
      notas.not_examen,
    ]);
    res.status(201).json({
      message: "La nota a sido ingresada correctamente",
      body: response,
    });
    console.log(response);
  } catch (e) {
    res.status(400).json({
      code: e.code,
      message: "ERROR: " + e.message,
    });
  }
};

const putNotas = async (req, res) => {
  const consulta =
    "UPDATE notas SET not_proyectos=$2,not_deberes=$3," +
    "not_examen=$4 WHERE not_est_cedula=$1";
  try {
    const notas = req.body;
    const response = await db.one(consulta,[
      notas.not_est_cedula,
      notas.not_proyectos,
      notas.not_deberes,
      notas.not_examen,
    ]);
    res.status(201).json({
      message: "Notas actualizadas correctamente.",
      body: response,
    });
  } catch (e) {
    res.status(400).json({
      code: e.code,
      message: e.message,
    });
  }
};

const deleteNotas = async (req,res) => {
  const consulta = "DELETE FROM notas WHERE not_est_cedula = $1;";
  try {
    const cedula = req.params.cedula;
    const response = await db.query(consulta,[cedula]);
    res.status(200).json({
      message: "Notas del ID "+req.params.cedula
      +" borradas correctamente."
    })
    console.log(req.params.cedula);
  } catch (e) {
    res.status(400).json({
      code: e.code,
      message:
        "No se ha encontrado la nota con el ID de estudiante" 
        +"(" +req.params.cedula +")",
    })
  }
}

module.exports = {
  getNotas,
  getNotasNombres,
  getNotasById,
  postNotas,
  putNotas,
  deleteNotas,
};
