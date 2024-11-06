
//console.log('Hola Mundo');
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const path = require('path');

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors())

//carpeta publica
app.use(express.static('public'));

app.use(express.json());

dbConnection();

//console.log(process.env);

// mean_user 1O1bMsVwn9TvtBUm
//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

//lo ultimo
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Usa el puerto asignado por Render o el puerto 3000 para desarrollo local
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto: ${PORT}`);
});