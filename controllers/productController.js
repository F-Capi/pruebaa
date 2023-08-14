const Product = require('../models/product');

exports.createProduct = async (req, res) => {

    console.log("hello");
    try {
        let body = {
            "name": "Camiseta Estampada",
            "colors": ["Rojo", "Azul"],
            "sizes": ["S", "M", "L"],
            "price": 25.99,
            "description": "Una camiseta estampada cómoda y elegante.",
            "imageUrls": ["https://i.ibb.co/bRkSy4j/product2.jpg", "https://example.com/image2.jpg"],
            "stock": [
                { "color": "Rojo", "size": "S", "quantity": 10 },
                { "color": "Rojo", "size": "M", "quantity": 5 },
                { "color": "Rojo", "size": "L", "quantity": 0 },
                { "color": "Azul", "size": "S", "quantity": 8 },
                { "color": "Azul", "size": "M", "quantity": 6 },
                { "color": "Azul", "size": "L", "quantity": 7 }
            ]
        };

        const newProduct = new Product(body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error });
    }
};

exports.getAllProducts = async (req, res) => {
    try {

        const products = await Product.find();
        console.log(products);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos" });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto" });
    }
};
