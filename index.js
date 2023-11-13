const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()

const PORT = process.env.PORT;
const  CadenaConexion = process.env.CONEXION_DB;

//Middleware
app.use(express.json());

//Conexion BD
mongoose.connect(CadenaConexion)

//Schema
const tareaSchema = new mongoose.Schema({
    name: String,
    description: String,
    isCompleted: Boolean,
    expirationDate: Date
})

//Modelo
const Tarea = new mongoose.model('ListaTareas', tareaSchema);

//CRUD
//Create
app.post('/tareas', async(req, res) => {
    const { name, description, isCompleted, expirationDate } = req.body;
    const nuevaTarea = new Tarea({ name, description, isCompleted, expirationDate });
    await nuevaTarea.save();
    res.json({
        msg:'La tarea se ha guardado'
    })
})

//Read
app.get('/tareas', async(req, res) => {
    const tareasConsulta = await Tarea.find();
    res.json(tareasConsulta);
})

app.put('/tareas/:id', async(req, res) => {
    const idTarea = req.params.id;
    const { name, description, isCompleted, expirationDate } = req.body;
    const tareaModificar = await Tarea.findByIdAndUpdate(idTarea, { name, description, isCompleted, expirationDate }, {new: true})
    res.json(tareaModificar);
})

app.delete('/tareas/:id', async(req, res) => {
    const idTarea = req.params.id;
    await Tarea.findByIdAndDelete(idTarea);
    res.json({
        msg:'La tarea se ha borrado'
    })
})


//Endpoint test
app.get('/', (req, res) => {
    res.status(200).json({
        msg:'El servidor funciona'
    })
})

app.listen(PORT, () => {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`);
})