import { useEffect, useState } from 'react';

import MainLayout from '../layouts/MainLayout';

import api from '../api/axios';

function InventoryPage() {

  const [movements, setMovements] = useState([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    product_id: '',
    qty: '',
    type: 'IN',
    notes: ''
  });

  const [products, setProducts] = useState([]);

  const getMovements = async () => {

    try {

      setLoading(true);

      const response = await api.get('/stocks');

      setMovements(response.data.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  const getProducts = async () => {

    try {

      const response = await api.get('/products');

      setProducts(response.data.data);

    } catch (err) {

      console.log(err);

    }

  };

  const submitAdjustment = async (e) => {

    e.preventDefault();

    try {

      await api.post('/stocks/adjustment', form);

      setForm({
        product_id: '',
        qty: '',
        type: 'IN',
        notes: ''
      });

      await getMovements();

      await getProducts();

      alert('Stock updated');

    } catch (err) {

      console.log(err);

      alert('Failed update stock');

    }

  };

  useEffect(() => {

    getMovements();

    getProducts();

  }, []);

  return (

    <MainLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Inventory Management
          </h1>

          <p className="text-gray-500 mt-2">
            Warehouse stock movement monitoring
          </p>

        </div>

      </div>

      {/* ANALYTICS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white rounded-3xl shadow p-6">

          <h3 className="text-gray-500 mb-2">
            Total Products
          </h3>

          <p className="text-4xl font-bold">
            {products.length}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <h3 className="text-gray-500 mb-2">
            Total Movements
          </h3>

          <p className="text-4xl font-bold">
            {movements.length}
          </p>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <h3 className="text-gray-500 mb-2">
            Low Stock
          </h3>

          <p className="text-4xl font-bold text-red-500">
            {
              products.filter(
                item => item.stock <= 5
              ).length
            }
          </p>

        </div>

      </div>

      {/* STOCK ADJUSTMENT */}

      <div className="bg-white rounded-3xl shadow p-6 mb-10">

        <h2 className="text-2xl font-bold mb-6">
          Stock Adjustment
        </h2>

        <form
          onSubmit={submitAdjustment}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >

          <select
            value={form.product_id}
            onChange={(e) =>
              setForm({
                ...form,
                product_id: e.target.value
              })
            }
            className="border p-3 rounded-xl"
            required
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
            value={form.qty}
            onChange={(e) =>
              setForm({
                ...form,
                qty: e.target.value
              })
            }
            className="border p-3 rounded-xl"
            required
          />

          <select
            value={form.type}
            onChange={(e) =>
              setForm({
                ...form,
                type: e.target.value
              })
            }
            className="border p-3 rounded-xl"
          >

            <option value="IN">
              STOCK IN
            </option>

            <option value="OUT">
              STOCK OUT
            </option>

            <option value="ADJUSTMENT">
              ADJUSTMENT
            </option>

          </select>

          <input
            type="text"
            placeholder="Notes"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value
              })
            }
            className="border p-3 rounded-xl"
          />

          <button
            className="bg-blue-500 text-white p-3 rounded-xl"
          >
            Save Adjustment
          </button>

        </form>

      </div>

      {/* MOVEMENT TABLE */}

      <div className="bg-white rounded-3xl shadow overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b bg-gray-100">

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                Type
              </th>

              <th className="p-4 text-left">
                Qty
              </th>

              <th className="p-4 text-left">
                Notes
              </th>

              <th className="p-4 text-left">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {movements.map(item => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-4">
                  {item.product?.product_name}
                </td>

                <td className="p-4">
                  {item.type}
                </td>

                <td className="p-4">
                  {item.qty}
                </td>

                <td className="p-4">
                  {item.notes}
                </td>

                <td className="p-4">
                  {
                    new Date(
                      item.created_at
                    ).toLocaleString()
                  }
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>

  );
}

export default InventoryPage;