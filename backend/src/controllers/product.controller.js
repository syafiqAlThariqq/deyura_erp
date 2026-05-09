const prisma = require('../config/db');

exports.getProducts = async (req, res) => {

  try {

    const products = await prisma.product.findMany({
      orderBy: {
        id: 'desc'
      }
    });

    return res.json({
      status: true,
      data: products
    });

  } catch (err) {

    return res.status(500).json({
      status: false,
      message: err.message
    });

  }

};

exports.createProduct = async (req, res) => {

  try {

    const {
      product_name,
      sku,
      selling_price,
      cogs,
      stock
    } = req.body;

    const product = await prisma.product.create({
      data: {
        product_name,
        sku,
        selling_price: parseFloat(selling_price),
        cogs: parseFloat(cogs),
        stock: parseInt(stock)
      }
    });

    return res.json({
      status: true,
      data: product,
      message: 'Product created successfully'
    });

  } catch (err) {

    return res.status(500).json({
      status: false,
      message: err.message
    });

  }

};

exports.deleteProduct = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    await prisma.product.delete({
      where: {
        id
      }
    });

    return res.json({
      status: true,
      message: 'Product deleted successfully'
    });

  } catch (err) {

    return res.status(500).json({
      status: false,
      message: err.message
    });

  }

};