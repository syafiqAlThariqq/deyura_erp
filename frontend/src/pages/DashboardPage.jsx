import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import api from '../api/axios';
import MainLayout from '../layouts/MainLayout';

import RevenueChart from '../components/RevenueChart';
import TopProducts from '../components/TopProducts';
import RecentTransactions from '../components/RecentTransactions';

function DashboardPage() {

    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);

    const chartData = [
        { month: 'Jan', omset: 4000000 },
        { month: 'Feb', omset: 3000000 },
        { month: 'Mar', omset: 5000000 },
        { month: 'Apr', omset: 4500000 },
        { month: 'May', omset: 7000000 }
    ];

    const getDashboard = async () => {
        try {

            const response = await api.get('/dashboard');

            setSummary(response.data.data);

        } catch (err) {
            toast.error('Failed load dashboard');
        }
    };

    const refreshDashboard = async () => {

        try {

            setLoading(true);

            const response = await api.post('/dashboard/refresh');

            toast.success(response.data.message);

            await getDashboard();

        } catch (err) {

            toast.error('Refresh failed');

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        getDashboard();
    }, []);

    return (
        <MainLayout>

            <Toaster position="top-right" />

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">
                    Dashboard
                </h1>

                <button
                    onClick={refreshDashboard}
                    disabled={loading}
                    className="bg-blue-500 text-white px-6 py-3 rounded-2xl"
                >
                    {loading ? 'Processing...' : 'Refresh Dashboard'}
                </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                <Card
                    title="Total Omset"
                    value={`Rp ${summary?.total_omset || 0}`}
                />

                <Card
                    title="Gross Profit"
                    value={`Rp ${summary?.gross_profit || 0}`}
                />

                <Card
                    title="Paid Total"
                    value={`Rp ${summary?.paid_total || 0}`}
                />

                <Card
                    title="Remaining Stock"
                    value={summary?.remaining_stock || 0}
                />

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

                <div className="xl:col-span-2">

                    <RevenueChart data={chartData} />

                </div>

                <div>

                    <TopProducts />

                </div>

            </div>

            <div className="mt-8">

                <RecentTransactions />

            </div>

        </MainLayout>
    );
}

function Card({ title, value }) {
    return (
        <div className="bg-white rounded-3xl shadow p-6">

            <h3 className="text-gray-500 mb-4">
                {title}
            </h3>

            <p className="text-4xl font-bold">
                {value}
            </p>

        </div>
    );
}

export default DashboardPage;