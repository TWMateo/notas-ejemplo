/* Paquetes*/
const express = require('express')
const app = express()
const cors = require('cors')

/*Puerto - Crear una variable en express _ primero el nombre
y luego el valor*/
app.set("port", process.env.PORT || 3000)

//Middleware - Son las funciones de las cuales se hara uso
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//Cors permite el intercambio de recursos en la web
//Primero instalamos npm i cors luego creamos la constante
//cors y usamos la app.use(cors())
app.use(cors());

/*USO de las rutas*/
app.use(require("./routes/routes"));

/*Ejecucion del servidor web*/
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(app.get("port"))

console.log("La direccion de acceso es: \n http://localhost: "+app.get("port"));

//PRODUCCION
module.exports = app;
