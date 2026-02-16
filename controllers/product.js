const Product = require('../models/product');

exports.getApiHealth = (req, res) => {
    res.status(200).json({ message: "API is healthy" });
}

exports.getAllProducts = async (req, res) => {
    try {
        const { featured } = req.query;
        const queryObject = {};

        if (featured) {
            queryObject.featured = featured === 'true' ? true : false;
        }

        const products = await Product.find(queryObject);
        res.status(200).json({ success: true, nbHits: products.length, data: products });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
}