const Product = require('../models/product');
const slugify = require('slugify');

exports.createProduct = async (req, res) => {

    console.log("hello");
    try {
        const slug = slugify("Camiseta Estampada", { lower: true });
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
            ],
            "slug": slug
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
exports.getProductBySlug = async (req, res) => {
    try {
        const product = await Product.findOne({ slug: req.params.slug });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto" });
    }
};


exports.productAvailable = async (req, res) => {
    try {
        let slug = "camiseta-estampada";
        let color = "redd";
        let size = "XS";
        let amount = 2;

        const product = await Product.findOne({ slug });
        if (product) {
            let stock = product.stock;
            for (const element of stock) {
                if (element.color == color && element.size == size && element.quantity - amount >= 0) {
                    res.json({ success: true });
                    return;
                }
            }
            res.json({ success: false });
        } else {

            res.status(404).json({ message: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al obtener producto", error });
    }
}
/*
exports.productsAvailable = async (req,res) => {
    try{
        
    }catch (error){

    }
}*/