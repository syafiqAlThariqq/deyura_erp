const prisma = require('../config/db');

exports.getMovements = async (req, res) => {

  try {

    const movements = await prisma.stockMovement.findMany({

      include: {
        product: true
      },

      orderBy: {
        created_at: 'desc'
      }

    });

    return res.json({
      status: true,
      data: movements
    });

  } catch (err) {

    return res.status(500).json({
      status: false,
      message: err.message
    });

  }

};

exports.stockAdjustment = async (req, res) => {

  try {

    const {
      product_id,
      qty,
      type,
      notes
    } = req.body;

    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(product_id)
      }
    });

    if (!product) {

      return res.status(404).json({
        status: false,
        message: 'Product not found'
      });

    }

    let newStock = product.stock;

    if (type === 'IN') {

      newStock += parseInt(qty);

    } else if (
      type === 'OUT' ||
      type === 'ADJUSTMENT'
    ) {

      newStock -= parseInt(qty);

    }

    await prisma.product.update({

      where: {
        id: product.id
      },

      data: {
        stock: newStock
      }

    });

    await prisma.stockMovement.create({

      data: {
        product_id: product.id,
        qty: parseInt(qty),
        type,
        notes
      }

    });

    return res.json({
      status: true,
      message: 'Stock updated'
    });

  } catch (err) {

    return res.status(500).json({
      status: false,
      message: err.message
    });

  }

};