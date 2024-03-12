const express = require('express');
const cookieParser = require('cookie-parser');
const authenticate = require('./src/middleware/auth'); // Importa el middleware
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const {engine} = require('express-handlebars');
const routes = require('./src/routes');

const app = express();

app.use(cookieParser());
app.use(express.static('public')); // Servir archivos estáticos

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(cors());

// Middleware para analizar cuerpos de solicitud tipo application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/assets', express.static(path.join(__dirname, 'public')));
app.use(routes);

let port = process.env.PORT || 3001; // el primero seria falsey si es undefined, en ese caso se usa el puerto 3000 y no el default,  

// Connect to database
const db_url = process.env.DB_MONGO;
async function start() {
    try {
        await mongoose.connect(db_url);
        app.listen(port, () => {
            console.log('DB connected. App is running in port ' + port);
        })  
    } catch (error) {
        console.log('Failed to connect to DB.' + error)
    }
}
start();