import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import MainLayout from '../layouts/MainLayout';

import { getProducts } from '../api/productApi';

import {
    createSale,
    getSales
} from '../api/salesApi';

function SalesPage() {

    const [products, setProducts] = useState([]);

    const [sales, setSales] = useState([]);

    const [cart, setCart] = useState([]);

    const [customerName, setCustomerName] = useState('');

    const [paymentStatus, setPaymentStatus] = useState('PAID');

    const [selectedProduct, setSelectedProduct] = useState('');

    const [qty, setQty] = useState(1);

    const [loading, setLoading] = useState(false);

    // LOAD PRODUCTS

    const fetchProducts = async () => {

        try {

            const response = await getProducts();

            setProducts(response.data.data);

        } catch (err) {

            toast.error('Failed load products');

        }

    };

    // LOAD SALES

    const fetchSales = async () => {

        try {

            const response = await getSales();

            setSales(response.data.data);

        } catch (err) {

            toast.error('Failed load sales');

        }

    };

    useEffect(() => {

        fetchProducts();

        fetchSales();

    }, []);

    // ADD TO CART

    const addToCart = () => {

        const product = products.find(
            p => p.id === parseInt(selectedProduct)
        );

        if (!product) {
            return toast.error('Select product first');
        }

        const existing = cart.find(
            item => item.product_id === product.id
        );

        if (existing) {

            setCart(
                cart.map(item =>
                    item.product_id === product.id
                        ? {
                            ...item,
                            qty: item.qty + parseInt(qty)
                        }
                        : item
                )
            );

        } else {

            setCart([
                ...cart,
                {
                    product_id: product.id,
                    product_name: product.product_name,
                    qty: parseInt(qty),
                    price: product.selling_price
                }
            ]);

        }

        setQty(1);

    };

    // REMOVE CART

    const removeCart = (id) => {

        setCart(
            cart.filter(item => item.product_id !== id)
        );

    };

    // TOTAL

    const grandTotal = cart.reduce((acc, item) => {
        return acc + (item.qty * item.price);
    }, 0);

    // CHECKOUT

    const checkout = async () => {

        if (cart.length === 0) {
            return toast.error('Cart empty');
        }

        try {

            setLoading(true);

            const payload = {
                customer_name: customerName,
                payment_status: paymentStatus,
                items: cart
            };

            const response = await createSale(payload);

            toast.success(response.data.message);

            setCart([]);

            setCustomerName('');

            fetchProducts();

            fetchSales();

        } catch (err) {

            toast.error(
                err.response?.data?.message || 'Checkout failed'
            );

        } finally {

            setLoading(false);

        }

    };

    return (
        <MainLayout>

            <Toaster position="top-right" />

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">
                    Sales POS
                </h1>

            </div>

            {/* TOP */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                {/* PRODUCT SECTION */}

                <div className="xl:col-span-2 bg-white rounded-3xl shadow p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Add Product
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="border rounded-2xl p-3"
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
                                    {' '}
                                    (Stock: {product.stock})
                                </option>

                            ))}

                        </select>

                        <input
                            type="number"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                            className="border rounded-2xl p-3"
                        />

                        <button
                            onClick={addToCart}
                            className="bg-blue-500 text-white rounded-2xl"
                        >
                            Add Cart
                        </button>

                    </div>

                    {/* CART */}

                    <div className="space-y-4">

                        {cart.map(item => (

                            <div
                                key={item.product_id}
                                className="flex justify-between items-center border rounded-2xl p-4"
                            >

                                <div>

                                    <h3 className="font-bold">
                                        {item.product_name}
                                    </h3>

                                    <p>
                                        Qty: {item.qty}
                                    </p>

                                </div>

                                <div className="flex items-center gap-4">

                                    <p className="font-bold">
                                        Rp {item.qty * item.price}
                                    </p>

                                    <button
                                        onClick={() => removeCart(item.product_id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-xl"
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

                {/* CHECKOUT */}

                <div className="bg-white rounded-3xl shadow p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Checkout
                    </h2>

                    <div className="space-y-4">

                        <input
                            type="text"
                            placeholder="Customer Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="border rounded-2xl p-3 w-full"
                        />

                        <select
                            value={paymentStatus}
                            onChange={(e) => setPaymentStatus(e.target.value)}
                            className="border rounded-2xl p-3 w-full"
                        >

                            <option value="PAID">
                                PAID
                            </option>

                            <option value="UNPAID">
                                UNPAID
                            </option>

                        </select>

                        <div className="bg-gray-100 rounded-2xl p-6">

                            <h3 className="text-xl font-bold mb-2">
                                Grand Total
                            </h3>

                            <p className="text-4xl font-bold">
                                Rp {grandTotal}
                            </p>

                        </div>

                        <button
                            onClick={checkout}
                            disabled={loading}
                            className="bg-green-500 text-white w-full p-4 rounded-2xl"
                        >
                            {loading ? 'Processing...' : 'Checkout'}
                        </button>

                    </div>

                </div>

            </div>

            {/* SALES HISTORY */}

            <div className="bg-white rounded-3xl shadow p-6 mt-8">

                <h2 className="text-2xl font-bold mb-6">
                    Transaction History
                </h2>

                <div className="overflow-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left p-4">
                                    Invoice
                                </th>

                                <th className="text-left p-4">
                                    Customer
                                </th>

                                <th className="text-left p-4">
                                    Total
                                </th>

                                <th className="text-left p-4">
                                    Status
                                </th>

                                <th className="text-left p-4">
                                    PDF
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {sales.map(sale => (

                                <tr
                                    key={sale.id}
                                    className="border-b"
                                >

                                    <td className="p-4">
                                        {sale.invoice_no}
                                    </td>

                                    <td className="p-4">
                                        {sale.customer_name}
                                    </td>

                                    <td className="p-4">
                                        Rp {sale.total_amount}
                                    </td>

                                    <td className="p-4">
                                        {sale.payment_status}
                                    </td>

                                    <td className="p-4">

                                        <a
                                            href={`http://localhost:5000/api/sales/invoice/${sale.id}`}
                                            target="_blank"
                                            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                                        >
                                            PDF
                                        </a>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </MainLayout>
    );
}

export default SalesPage;