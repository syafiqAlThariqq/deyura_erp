const PDFDocument = require('pdfkit');

exports.generateInvoicePdf = (sale, res) => {

  const doc = new PDFDocument({
    margin: 50
  });

  // RESPONSE HEADER

  res.setHeader(
    'Content-Type',
    'application/pdf'
  );

  res.setHeader(
    'Content-Disposition',
    `inline; filename=invoice-${sale.invoice_no}.pdf`
  );

  doc.pipe(res);

  // HEADER

  doc
    .fontSize(24)
    .text('INVOICE', {
      align: 'center'
    });

  doc.moveDown();

  doc
    .fontSize(14)
    .text(`Invoice : ${sale.invoice_no}`);

  doc.text(`Customer : ${sale.customer_name}`);

  doc.text(`Status : ${sale.payment_status}`);

  doc.text(
    `Date : ${new Date(sale.created_at).toLocaleString()}`
  );

  doc.moveDown();

  // TABLE HEADER

  doc
    .fontSize(14)
    .text('Product', 50);

  doc.text('Qty', 300);

  doc.text('Price', 350);

  doc.text('Subtotal', 450);

  doc.moveDown();

  // ITEMS

  sale.details.forEach((item) => {

    doc
      .fontSize(12)
      .text(item.product.product_name, 50);

    doc.text(item.qty.toString(), 300);

    doc.text(`Rp ${item.price}`, 350);

    doc.text(`Rp ${item.subtotal}`, 450);

    doc.moveDown();

  });

  // TOTAL

  doc.moveDown();

  doc
    .fontSize(18)
    .text(
      `Grand Total : Rp ${sale.total_amount}`,
      {
        align: 'right'
      }
    );

  doc.end();

};