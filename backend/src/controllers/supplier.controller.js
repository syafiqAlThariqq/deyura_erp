const prisma = require('../config/db');

exports.getSuppliers = async (req, res) => {

  try {

    const suppliers = await prisma.supplier.findMany({

      orderBy: {
        id: 'desc'
      }

    });

    return res.json({
      status: true,
      data: suppliers
    });

  } catch (err) {

    return res.status(500).json({
      status: false,
      message: err.message
    });

  }

};

exports.createSupplier = async (req, res) => {

  try {

    const {
      supplier_name,
      phone,
      address
    } = req.body;

    const supplier = await prisma.supplier.create({

      data: {
        supplier_name,
        phone,
        address
      }

    });

    return res.json({
      status: true,
      data: supplier,
      message: 'Supplier created'
    });

  } catch (err) {

    return res.status(500).json({
      status: false,
      message: err.message
    });

  }

};