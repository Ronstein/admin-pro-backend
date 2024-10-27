
//console.log('Hola Mundo');
const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors())
dbConnection();

//console.log(process.env);

// mean_user 1O1bMsVwn9TvtBUm
//Rutas
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    });
});


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${process.env.PORT}`);
});