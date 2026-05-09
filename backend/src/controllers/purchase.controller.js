const prisma = require('../config/db');

exports.getPurchases = async (req, res) => {

  try {

    const purchases = await prisma.purchase.findMany({

      include: {
        supplier: true,
        details: {
          include: {
            product: true
          }
        }
      },

      orderBy: {
        id: 'desc'
      }

    });

    return res.json({
      status: true,
      data: purchases
    });

  } catch (err) {

    return res.status(500).json({
      status: false,
      message: err.message
    });

  }

};

exports.createPurchase = async (req, res) => {

  try {

    const {
      supplier_id,
      payment_status,
      items
    } = req.body;

    let totalAmount = 0;

    items.forEach(item => {

      totalAmount += item.qty * item.cost_price;

    });

    const invoice_no =
      'PO-' + Date.now();

    const purchase = await prisma.purchase.create({

      data: {

        invoice_no,

        supplier_id,

        total_amount: totalAmount,

        payment_status,

        details: {

          create: items.map(item => ({

            product_id: item.product_id,

            qty: item.qty,

            cost_price: item.cost_price,

            subtotal:
              item.qty * item.cost_price

          }))

        }

      },

      include: {
        details: true
      }

    });

    for (const item of items) {

      const product =
        await prisma.product.findUnique({

          where: {
            id: item.product_id
          }

        });

      await prisma.product.update({

        where: {
          id: item.product_id
        },

        data: {
          stock: product.stock + item.qty
        }

      });

      await prisma.stockMovement.create({

        data: {

          product_id: item.product_id,

          type: 'PURCHASE',

          qty: item.qty,

          notes: `Purchase ${invoice_no}`

        }

      });

    }

    return res.json({
      status: true,
      data: purchase,
      message: 'Purchase created'
    });

  } catch (err) {

    return res.status(500).json({
      status: false,
      message: err.message
    });

  }

};