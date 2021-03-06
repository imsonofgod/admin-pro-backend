require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

//crea el servidor de express
const app = express();
//Configura Cors
app.use(cors());
// Lectura y parceo del body
app.use(express.json());

//base de datos
dbConnection();

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto 3000');
});