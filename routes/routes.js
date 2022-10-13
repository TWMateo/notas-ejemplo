//Importaciones
const {Router}= require("express");
const { getEstudiantes, postEstudiantes, getEstudiantesByCedula, putEstudiantes, deleteEstudiantes } = require("../controllers/estudiantes.controller");
const { getNotas, getNotasNombres, getNotasById, putNotas, postNotas, deleteNotas } = require("../controllers/notas.controllers");
const router=Router();
//Version de la ruta
const URLV1="/v1";
//Rutas - Notas V1
router.get(URLV1+"/notas",getNotas);
router.get(URLV1+"/notas/nombres",getNotasNombres);
router.get(URLV1+"/notas/:id",getNotasById);
router.post(URLV1+"/notas",postNotas);
router.put(URLV1+"/notas",putNotas);
router.delete(URLV1+"/notas/:cedula",deleteNotas)
//Rutas - Estudiantes V1
router.get(URLV1+"/estudiantes",getEstudiantes);
router.get(URLV1+"/estudiantes/:cedula",getEstudiantesByCedula);
router.post(URLV1+"/estudiantes",postEstudiantes);
router.put(URLV1+"/estudiantes",putEstudiantes);
router.delete(URLV1+"/estudiantes/:cedula",deleteEstudiantes);
//Exportacion - Se debe exportar la constante de router
module.exports = router;

