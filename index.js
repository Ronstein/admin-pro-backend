
//console.log('Hola Mundo');
const express = require('express');
require('dotenv').config();
const cors = require('cors');


const { dbConnection } = require('./database/config');

const app = express();

app.use(cors())
app.use(express.json());

dbConnection();

//console.log(process.env);

// mean_user 1O1bMsVwn9TvtBUm
//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});