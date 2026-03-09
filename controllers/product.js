const Product = require('../models/product');

exports.getApiHealth = (req, res) => {
    res.status(200).json({ message: "API is healthy" });
}

exports.getAllProducts = async (req, res) => {
    try {
        const { featured, company, name, sort } = req.query;
        const queryObject = {};

        if (featured) {
            queryObject.featured = featured === 'true' ? true : false;
        }

        if (company) {
            queryObject.company = company;
        }

        if (name) {
            queryObject.name = { $regex: name, $options: 'i' };
        }

        let result = Product.find(queryObject);

        if (sort) {
            const sortList = sort.split(",").join(" ");
            result = result.sort(sortList);
        } else {
            result = result.sort("createdAt");  
        }
        
        const products = await result;

        if (!products) {
            return res.status(404).json({
                success: false,
                nbHits: 0,
                error: 'No products found' 
            });
        }

        res.status(200).json({ 
            success: true, 
            nbHits: products.length, 
            data: products 
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}