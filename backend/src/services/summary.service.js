const prisma = require('../config/db');

exports.refreshMonthly = async (year, month) => {

  await prisma.dashboardSummaryMonthly.deleteMany({
    where: {
      year,
      month
    }
  });

  const sales = await prisma.sales.findMany({
    where: {
      sales_date: {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1)
      }
    },
    include: {
      details: true
    }
  });

  let totalOmset = 0;
  let totalCogs = 0;
  let totalQtySold = 0;
  let paidTotal = 0;
  let unpaidTotal = 0;
  for (const sale of sales) {

    totalOmset += sale.sales_tot - sale.sales_discount + sale.postage_cost;

    if (sale.sales_stat === 'lunas') {
      paidTotal += sale.bill_total;
    }

    if (sale.sales_stat === 'belum tf') {
      unpaidTotal += sale.bill_total;
    }

    for (const detail of sale.details) {

      const convection = await prisma.convection.findFirst({
        where: {
          product_id: detail.stock_id
        }
      });

      if (convection) {
        totalCogs += convection.cogs * detail.nss;
      }

      totalQtySold += detail.nss;
    }
  }
  const grossProfit = totalOmset - totalCogs;

  const openingStock = await prisma.convection.aggregate({
    _sum: {
      depo_amount: true
    }
  });

  const remainingStock = await prisma.convection.aggregate({
    _sum: {
      remaining_stock: true
    }
  });

  const onProgressStock = await prisma.convection.aggregate({
    where: {
      product_status: 'On Progress'
    },
    _sum: {
      depo_amount: true
    }
  });

  const receivable = await prisma.receivable.aggregate({
    where: {
      rcv_notes: 'Belum Lunas'
    },
    _sum: {
      rcv_total: true
    }
  });
  await prisma.dashboardSummaryMonthly.create({
    data: {
      year,
      month,
      total_omset: totalOmset,
      total_cogs: totalCogs,
      gross_profit: grossProfit,
      total_qty_sold: totalQtySold,
      paid_total: paidTotal,
      unpaid_total: unpaidTotal,
      receivable_total: receivable._sum.rcv_total || 0,
      opening_stock: openingStock._sum.depo_amount || 0,
      remaining_stock: remainingStock._sum.remaining_stock || 0,
      on_progress_stock: onProgressStock._sum.depo_amount || 0,
      last_updated: new Date()
    }
  });
};

exports.rebuildAll = async () => {

  await prisma.dashboardSummaryMonthly.deleteMany();

  const currentYear = new Date().getFullYear();

  for (let year = 2024; year <= currentYear; year++) {

    for (let month = 1; month <= 12; month++) {

      await exports.refreshMonthly(year, month);

    }
  }
};