const express = require('express');
require("dotenv").config();
const mongoose = require('mongoose');
const rutas = require('./src/routes');

const app = express();
app.use(express.json());

app.use(rutas);

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