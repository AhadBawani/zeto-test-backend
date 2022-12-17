const Product = require('../Schemas/ProductSchema');


module.exports.GET_ALL_PRODUCTS = (async (req, res) => {
    try {
        await Product.find()
            .select('_id productName productImage price category description mrp discount disabled')
            .exec()
            .then(response => {
                if (response) {
                    res.status(200).json(response);
                }
            })
            .catch(err => {
                console.log(err);
            });

    }
    catch (err) {
        res.send("error : ", err);
    }
})

module.exports.ADD_PRODUCT = ((req, res) => {
    try {
        const product = new Product({
            productName: req.body.productName,
            productImage: req.file.filename,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            mrp: req.body.mrp,
            discount: req.body.discount,
            disabled: req.body.disabled
        })

        product.save();
        res.status(201).json({
            message: "Product Created Successfully!",
            product: {
                _id: product._id,
                productName: product.productName,
                productImage: product.productImage,
                price: product.price,
                category: product.category,
                description: product.description,
                mrp: product.mrp,
                discount: product.discount,
                disabled: product.disabled
            }
        })
    }
    catch (err) {
        res.send(err)
    }
})

module.exports.EDIT_DISABLED_PRODUCT = (async (req, res) => {
    try {
        Product.findById(req.params.productId)
            .exec()
            .then(response => {
                if (response) {
                    Product.findByIdAndUpdate(req.params.productId,
                        { disabled: true },
                        { new: true },
                        (err, response) => {
                            if (response.acknowledged) {
                                res.status(200).send({
                                    message: "Edited successfully!"
                                })
                            }
                            else {
                                res.status(404).send({
                                    message: "Already disabled"
                                })
                            }
                        })
                }
                else {
                    res.status(404).send({
                        message: "Product Not Found!"
                    })
                }
            })
            .catch(err => {
                console.log(err)
            });
    }
    catch (err) {
        console.log("error : ", err);
    }
})


module.exports.DELETE_PRODUCT = (async (req, res) => {
    try {
        Product.remove({ _id: req.params.productId })
            .exec()
            .then(response => {
                if (response?.deletedCount > 0) {
                    res.status(200).send({
                        message: "Product deleted successfully"
                    })
                }
                else {
                    res.status(404).send({
                        message: "Product Not Found!"
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    catch (err) {
        res.send("Error : ", err);
    }
})
