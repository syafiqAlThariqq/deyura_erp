import { useEffect, useState } from 'react';

import MainLayout from '../layouts/MainLayout';

import api from '../api/axios';

function PurchasesPage() {

    const [suppliers, setSuppliers] = useState([]);

    const [products, setProducts] = useState([]);

    const [purchases, setPurchases] = useState([]);

    const [form, setForm] = useState({
        supplier_id: '',
        payment_status: 'PAID'
    });

    const [items, setItems] = useState([
        {
            product_id: '',
            qty: 1,
            cost_price: 0
        }
    ]);

    const getData = async () => {

        try {

            const [
                supplierRes,
                productRes,
                purchaseRes
            ] = await Promise.all([
                api.get('/suppliers'),
                api.get('/products'),
                api.get('/purchases')
            ]);

            setSuppliers(supplierRes.data.data);

            setProducts(productRes.data.data);

            setPurchases(purchaseRes.data.data);

        } catch (err) {

            console.log(err);

        }

    };

    const addItem = () => {

        setItems([
            ...items,
            {
                product_id: '',
                qty: 1,
                cost_price: 0
            }
        ]);

    };

    const updateItem = (
        index,
        field,
        value
    ) => {

        const updated = [...items];

        updated[index][field] = value;

        setItems(updated);

    };

    const createPurchase = async (e) => {

        e.preventDefault();

        try {

            await api.post('/purchases', {
                ...form,
                items
            });

            alert('Purchase created');

            setItems([
                {
                    product_id: '',
                    qty: 1,
                    cost_price: 0
                }
            ]);

            await getData();

        } catch (err) {

            console.log(err);

            alert('Failed create purchase');

        }

    };

    useEffect(() => {

        getData();

    }, []);

    return (

        <MainLayout>

            <div className="mb-10">

                <h1 className="text-4xl font-bold">
                    Purchases
                </h1>

                <p className="text-gray-500 mt-2">
                    Purchase order & receiving system
                </p>

            </div>

            {/* FORM */}

            <div className="bg-white rounded-3xl shadow p-6 mb-10">

                <h2 className="text-2xl font-bold mb-6">
                    Create Purchase
                </h2>

                <form onSubmit={createPurchase}>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                        <select
                            value={form.supplier_id}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    supplier_id: parseInt(
                                        e.target.value
                                    )
                                })
                            }
                            className="border p-3 rounded-xl"
                            required
                        >

                            <option value="">
                                Select Supplier
                            </option>

                            {suppliers.map(item => (

                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.supplier_name}
                                </option>

                            ))}

                        </select>

                        <select
                            value={form.payment_status}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    payment_status:
                                        e.target.value
                                })
                            }
                            className="border p-3 rounded-xl"
                        >

                            <option value="PAID">
                                PAID
                            </option>

                            <option value="UNPAID">
                                UNPAID
                            </option>

                        </select>

                    </div>

                    {/* ITEMS */}

                    <div className="space-y-4 mb-6">

                        {items.map((item, index) => (

                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-3 gap-4"
                            >

                                <select
                                    value={item.product_id}
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            'product_id',
                                            parseInt(
                                                e.target.value
                                            )
                                        )
                                    }
                                    className="border p-3 rounded-xl"
                                >

                                    <option value="">
                                        Select Product
                                    </option>

                                    {products.map(product => (

                                        <option
                                            key={product.id}
                                            value={product.id}
                                        >
                                            {product.product_name}
                                        </option>

                                    ))}

                                </select>

                                <input
                                    type="number"
                                    placeholder="Qty"
                                    value={item.qty}
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            'qty',
                                            parseInt(
                                                e.target.value
                                            )
                                        )
                                    }
                                    className="border p-3 rounded-xl"
                                />

                                <input
                                    type="number"
                                    placeholder="Cost Price"
                                    value={item.cost_price}
                                    onChange={(e) =>
                                        updateItem(
                                            index,
                                            'cost_price',
                                            parseFloat(
                                                e.target.value
                                            )
                                        )
                                    }
                                    className="border p-3 rounded-xl"
                                />

                            </div>

                        ))}

                    </div>

                    <div className="flex gap-4">

                        <button
                            type="button"
                            onClick={addItem}
                            className="bg-gray-500 text-white px-4 py-3 rounded-xl"
                        >
                            Add Item
                        </button>

                        <button
                            className="bg-blue-500 text-white px-6 py-3 rounded-xl"
                        >
                            Save Purchase
                        </button>

                    </div>

                </form>

            </div>

            {/* TABLE */}

            <div className="bg-white rounded-3xl shadow overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="border-b bg-gray-100">

                            <th className="p-4 text-left">
                                Invoice
                            </th>

                            <th className="p-4 text-left">
                                Supplier
                            </th>

                            <th className="p-4 text-left">
                                Total
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {purchases.map(item => (

                            <tr
                                key={item.id}
                                className="border-b"
                            >

                                <td className="p-4">
                                    {item.invoice_no}
                                </td>

                                <td className="p-4">
                                    {
                                        item.supplier
                                            ?.supplier_name
                                    }
                                </td>

                                <td className="p-4">
                                    Rp {item.total_amount}
                                </td>

                                <td className="p-4">
                                    {item.payment_status}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </MainLayout>

    );
}

export default PurchasesPage;