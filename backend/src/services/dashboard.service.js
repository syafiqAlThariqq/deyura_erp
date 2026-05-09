const prisma = require('../config/prisma');

class DashboardService {

    async getDashboardSummary(year, month) {

        const summary = await prisma.dashboard_summary_monthly.findFirst({
            where: {
                year: parseInt(year),
                month: parseInt(month)
            }
        });

        return summary;
    }

    async refreshDashboard() {

        // sementara dummy dulu
        // nanti isi full rebuild summary

        return {
            success: true,
            message: 'Dashboard refreshed successfully'
        };
    }
}

module.exports = new DashboardService();