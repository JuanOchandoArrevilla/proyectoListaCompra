const express = require('express');
const app = express();
const db = require('./database/db');
const seed = require('./seed/seed.db');
const path = require('path');
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 8000;
// si esta a true va volver a crear tablas
db.sequelize.sync({force:false})

const insertarDatos = async () => {
    try {
        await seed.insertDatosDB();
    } catch (error) {
        throw new Error(`no se ha podido conectar a la base datos\n ${error.message}`);        
        
    }
}

insertarDatos();
app.use(express.json());
app.use(express.urlencoded({ extended:false }));

app.use(express.static(path.join(__dirname, 'images')));

app.use('/api/',require('./routes/router'));


app.listen(PORT, function() {
console.log("funciona");
  
})