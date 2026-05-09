const prisma = require('../config/db');
const summaryService = require('../services/summary.service');

exports.getDashboard = async (req, res) => {
  try {

    const month = parseInt(req.query.month) || new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const summary = await prisma.dashboardSummaryMonthly.findFirst({
      where: {
        year,
        month
      }
    });

    return res.json({
      status: true,
      data: summary
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message
    });
  }
};

exports.refreshDashboard = async (req, res) => {
  try {

    await summaryService.rebuildAll();

    return res.json({
      status: true,
      message: 'Dashboard refreshed successfully'
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: err.message
    });
  }
};