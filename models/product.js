const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    color: String,
    size: String,
    quantity: Number
});

const productSchema = new mongoose.Schema({
    name: String,
    colors: [String], // Lista de colores disponibles
    sizes: [String],  // Lista de tallas disponibles
    price: Number,
    description: String,
    imageUrls: [String],
    stock: [stockSchema], // Stock para cada combinación de color y talla
    slug: {
        type: String,
        unique: true
    }
});

module.exports = mongoose.model('Product', productSchema);
