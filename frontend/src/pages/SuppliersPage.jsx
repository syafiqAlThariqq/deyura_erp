import { useEffect, useState } from 'react';

import MainLayout from '../layouts/MainLayout';

import api from '../api/axios';

function SuppliersPage() {

    const [suppliers, setSuppliers] = useState([]);

    const [form, setForm] = useState({
        supplier_name: '',
        phone: '',
        address: ''
    });

    const getSuppliers = async () => {

        try {

            const response = await api.get('/suppliers');

            setSuppliers(response.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    const createSupplier = async (e) => {

        e.preventDefault();

        try {

            await api.post('/suppliers', form);

            setForm({
                supplier_name: '',
                phone: '',
                address: ''
            });

            await getSuppliers();

            alert('Supplier created');

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        getSuppliers();

    }, []);

    return (

        <MainLayout>

            <div className="flex justify-between items-center mb-10">

                <div>

                    <h1 className="text-4xl font-bold">
                        Suppliers
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Supplier management system
                    </p>

                </div>

            </div>

            {/* FORM */}

            <div className="bg-white rounded-3xl shadow p-6 mb-10">

                <h2 className="text-2xl font-bold mb-6">
                    Create Supplier
                </h2>

                <form
                    onSubmit={createSupplier}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >

                    <input
                        type="text"
                        placeholder="Supplier Name"
                        value={form.supplier_name}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                supplier_name: e.target.value
                            })
                        }
                        className="border p-3 rounded-xl"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Phone"
                        value={form.phone}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                phone: e.target.value
                            })
                        }
                        className="border p-3 rounded-xl"
                    />

                    <input
                        type="text"
                        placeholder="Address"
                        value={form.address}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                address: e.target.value
                            })
                        }
                        className="border p-3 rounded-xl"
                    />

                    <button
                        className="bg-blue-500 text-white p-3 rounded-xl"
                    >
                        Save Supplier
                    </button>

                </form>

            </div>

            {/* TABLE */}

            <div className="bg-white rounded-3xl shadow overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b bg-gray-100">

                            <th className="p-4 text-left">
                                Supplier
                            </th>

                            <th className="p-4 text-left">
                                Phone
                            </th>

                            <th className="p-4 text-left">
                                Address
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {suppliers.map(item => (

                            <tr
                                key={item.id}
                                className="border-b"
                            >

                                <td className="p-4">
                                    {item.supplier_name}
                                </td>

                                <td className="p-4">
                                    {item.phone}
                                </td>

                                <td className="p-4">
                                    {item.address}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </MainLayout>

    );
}

export default SuppliersPage;