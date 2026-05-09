function RecentTransactions() {

  const transactions = [
    {
      invoice: 'INV001',
      customer: 'Budi',
      total: 250000
    },
    {
      invoice: 'INV002',
      customer: 'Andi',
      total: 400000
    },
    {
      invoice: 'INV003',
      customer: 'Siti',
      total: 150000
    }
  ];

  return (
    <div className="bg-white rounded-3xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recent Transactions
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-left border-b">

              <th className="pb-3">Invoice</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Total</th>

            </tr>

          </thead>

          <tbody>

            {transactions.map((item, index) => (

              <tr
                key={index}
                className="border-b"
              >

                <td className="py-4">
                  {item.invoice}
                </td>

                <td>
                  {item.customer}
                </td>

                <td className="font-semibold">
                  Rp {item.total.toLocaleString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RecentTransactions;