const express = require("express");
const router = express.Router();
const ProductModel = require("../models/product.model");

router.get("/allproduct", (req, res) => {
    ProductModel.find()
        .then((product) => {
            res.status(200).json({ product });
        })
        .catch((error) => {
            console.log(error);
        });
});

router.get("/product/:id", async (req, res) => {
    const _id = req.params.id;
    ProductModel.findById(_id)
      .then((product) => {
        if(!product){
            res.send("No product found")
        }
        res.status(200).json({ product: product});
      })
      .catch((error) => {
        console.log(error);
      });
  });

  router.get('/products/:category', async (req, res) => {
    try {
        const { category } = req.params;
        const products = await ProductModel.find({ category: category });
        res.json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router