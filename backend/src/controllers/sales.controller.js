const prisma = require('../config/db');
const {
    generateInvoicePdf
} = require('../services/pdf.service');

exports.getSales = async (req, res) => {

    try {

        const sales = await prisma.sale.findMany({
            include: {
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
            data: sales
        });

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: err.message
        });

    }

};

exports.createSale = async (req, res) => {

    try {

        const {
            customer_name,
            payment_status,
            items
        } = req.body;

        let totalAmount = 0;

        for (const item of items) {

            totalAmount += item.qty * item.price;

        }

        const sale = await prisma.sale.create({
            data: {
                invoice_no: `INV-${Date.now()}`,
                customer_name,
                total_amount: totalAmount,
                payment_status,

                details: {
                    create: items.map(item => ({
                        product_id: item.product_id,
                        qty: item.qty,
                        price: item.price,
                        subtotal: item.qty * item.price
                    }))
                }
            },
            include: {
                details: true
            }
        });

        // REDUCE STOCK

        for (const item of items) {

            await prisma.product.update({
                where: {
                    id: item.product_id
                },
                data: {
                    stock: {
                        decrement: item.qty
                    }
                }
            });
            await prisma.stockMovement.create({
                data: {
                    product_id: item.product_id,
                    type: 'SALE',
                    qty: item.qty,
                    notes: `Invoice ${invoice_no}`
                }
            });

        }

        return res.json({
            status: true,
            data: sale,
            message: 'Sales transaction created'
        });

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: err.message
        });

    }

};

exports.getInvoicePdf = async (req, res) => {

    try {

        const id = parseInt(req.params.id);

        const sale = await prisma.sale.findUnique({
            where: {
                id
            },
            include: {
                details: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!sale) {

            return res.status(404).json({
                status: false,
                message: 'Invoice not found'
            });

        }

        generateInvoicePdf(sale, res);

    } catch (err) {

        return res.status(500).json({
            status: false,
            message: err.message
        });

    }

};