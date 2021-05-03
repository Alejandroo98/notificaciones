require('dotenv').config(); //Esto es lo que ara que las variables de entorne se inicialicen antes de que la app empieze.
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

/* MIDDLEWARES */
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ROUTES */
app.use(require('./routes/index'));

/* CONTENIDO ESTATICO */
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);
console.log('Servidor en puerto 3000');
