import { useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import MainLayout from '../layouts/MainLayout';

import {
  getProducts,
  createProduct,
  deleteProduct
} from '../api/productApi';

function ProductsPage() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    product_name: '',
    sku: '',
    selling_price: '',
    cogs: '',
    stock: ''
  });

  const fetchProducts = async () => {

    try {

      const response = await getProducts();

      setProducts(response.data.data);

    } catch (err) {

      toast.error('Failed load products');

    }

  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await createProduct(form);

      toast.success(response.data.message);

      setForm({
        product_name: '',
        sku: '',
        selling_price: '',
        cogs: '',
        stock: ''
      });

      fetchProducts();

    } catch (err) {

      toast.error(err.response?.data?.message || 'Create failed');

    } finally {

      setLoading(false);

    }

  };

  const handleDelete = async (id) => {

    if (!confirm('Delete product?')) return;

    try {

      const response = await deleteProduct(id);

      toast.success(response.data.message);

      fetchProducts();

    } catch (err) {

      toast.error('Delete failed');

    }

  };

  return (
    <MainLayout>

      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Products
        </h1>

      </div>

      {/* FORM */}

      <div className="bg-white p-6 rounded-3xl shadow mb-8">

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >

          <input
            type="text"
            name="product_name"
            placeholder="Product Name"
            value={form.product_name}
            onChange={handleChange}
            className="border rounded-2xl p-3"
            required
          />

          <input
            type="text"
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            className="border rounded-2xl p-3"
            required
          />

          <input
            type="number"
            name="selling_price"
            placeholder="Selling Price"
            value={form.selling_price}
            onChange={handleChange}
            className="border rounded-2xl p-3"
            required
          />

          <input
            type="number"
            name="cogs"
            placeholder="COGS"
            value={form.cogs}
            onChange={handleChange}
            className="border rounded-2xl p-3"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={form.stock}
            onChange={handleChange}
            className="border rounded-2xl p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white rounded-2xl p-3 md:col-span-5"
          >
            {loading ? 'Processing...' : 'Add Product'}
          </button>

        </form>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">SKU</th>
              <th className="text-left p-4">Price</th>
              <th className="text-left p-4">COGS</th>
              <th className="text-left p-4">Stock</th>
              <th className="text-left p-4">Action</th>

            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-t"
              >

                <td className="p-4">
                  {product.product_name}
                </td>

                <td className="p-4">
                  {product.sku}
                </td>

                <td className="p-4">
                  Rp {product.selling_price}
                </td>

                <td className="p-4">
                  Rp {product.cogs}
                </td>

                <td className="p-4">
                  {product.stock}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
}

export default ProductsPage;