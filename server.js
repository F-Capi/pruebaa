const express = require('express');
const mongoose = require('mongoose');
const productRoutes = require('./routes/poductRoutes');

const app = express();

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conectado a MongoDB');
});
// Conexión a MongoDB
mongoose.connect('mongodb+srv://Rafcon:Argentina12@cluster0.bnmbp.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Servir archivos estáticos desde el directorio /public
app.use(express.static('public'));
app.use(express.json());

app.get('/product/:id', (req, res) => {
    res.sendFile(__dirname + '/public/product.html');
});
// Ruta para servir index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.use('/api', productRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
