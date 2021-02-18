require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//crea el servidor de express
const app = express();
//Configura Cors
app.use(cors());

//base de datos
dbConnection();

app.get("/", (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto 3000');
});