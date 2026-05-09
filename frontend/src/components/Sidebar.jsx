import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

function Sidebar() {

    const { user } = useAuth();

    return (

        <aside className="w-64 bg-gray-900 text-white min-h-screen p-6">

            <h1 className="text-3xl font-bold mb-10">
                ERP System
            </h1>

            <nav className="space-y-4">

                <Link
                    to="/"
                    className="block py-3 px-4 rounded-xl hover:bg-gray-700 transition"
                >
                    Dashboard
                </Link>

                {
                    ['ADMIN', 'WAREHOUSE'].includes(user?.role) && (

                        <Link
                            to="/products"
                            className="block py-3 px-4 rounded-xl hover:bg-gray-700 transition"
                        >
                            Products
                        </Link>

                    )
                }

                {
                    ['ADMIN', 'WAREHOUSE'].includes(user?.role) && (

                        <Link
                            to="/inventory"
                            className="block py-3 px-4 rounded-xl hover:bg-gray-700 transition"
                        >
                            Inventory
                        </Link>

                    )
                }

                {
                    ['ADMIN', 'WAREHOUSE'].includes(user?.role) && (

                        <Link
                            to="/suppliers"
                            className="block py-3 px-4 rounded-xl hover:bg-gray-700 transition"
                        >
                            Suppliers
                        </Link>

                    )
                }

                {
                    ['ADMIN', 'WAREHOUSE'].includes(user?.role) && (

                        <Link
                            to="/purchases"
                            className="block py-3 px-4 rounded-xl hover:bg-gray-700 transition"
                        >
                            Purchases
                        </Link>

                    )
                }

                {
                    ['ADMIN', 'FINANCE'].includes(user?.role) && (

                        <Link
                            to="/sales"
                            className="block py-3 px-4 rounded-xl hover:bg-gray-700 transition"
                        >
                            Sales
                        </Link>

                    )
                }

                {
                    user?.role === 'ADMIN' && (

                        <Link
                            to="/customers"
                            className="block py-3 px-4 rounded-xl hover:bg-gray-700 transition"
                        >
                            Customers
                        </Link>

                    )
                }

            </nav>

        </aside>

    );
}

export default Sidebar;