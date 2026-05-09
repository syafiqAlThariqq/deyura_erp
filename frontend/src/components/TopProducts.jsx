function TopProducts() {

  const products = [
    {
      name: 'Hoodie Polos',
      sold: 120
    },
    {
      name: 'Kaos Oversize',
      sold: 95
    },
    {
      name: 'Crewneck Basic',
      sold: 80
    }
  ];

  return (

    <div className="bg-white rounded-3xl shadow p-6">

      <h2 className="text-2xl font-bold mb-6">
        Top Products
      </h2>

      <div className="space-y-4">

        {products.map((product, index) => (

          <div
            key={index}
            className="flex justify-between items-center border-b pb-3"
          >

            <div>

              <p className="font-semibold">
                {product.name}
              </p>

              <p className="text-sm text-gray-500">
                Best Seller
              </p>

            </div>

            <div className="font-bold text-blue-600">

              {product.sold}

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default TopProducts;