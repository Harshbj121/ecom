const express = require('express');
const router = express.Router();
const multer = require('multer');
const varifiedToken = require("../Middleware/protected");
const ProductModel = require('../models/product.model');

const Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: Storage,
    limits: {
        fileSize: 1024 * 1024 * 1
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg') {
            cb(null, true);
        } else {
            cb(null, false);
            res.status(400).json({ error: 'File types not allowed' })
        }
    }
})

router.post("/product", varifiedToken, upload.single('image'), (req, res) => {
    const { name, avgRating, price, description, category } = req.body;
    const image = req.file ? req.file.filename : null; // Check if image file was uploaded

    if (!description.trim() || !image || !name || !avgRating || !price || !description || !category) {
        return res.status(400).json({ error: "Some data missing" });
    }

    const postObj = new ProductModel({
        description: description,
        image: image,
        name:name,
        avgRating:avgRating,
        price:price,
        category:category,
        author: req.user // Assuming req.user contains user information from authentication middleware
    });

    postObj.save()
        .then(newPost => {
            res.status(201).json({ post: newPost });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to add product' });
        });
});


module.exports = router;