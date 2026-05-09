import { Routes, Route } from 'react-router-dom';

import DashboardPage from './pages/DashboardPage';

import ProductsPage from './pages/ProductsPage';

import SalesPage from './pages/SalesPage';

import CustomersPage from './pages/CustomersPage';

import LoginPage from './pages/LoginPage';

import ProtectedRoute from './components/ProtectedRoute';

import InventoryPage from './pages/InventoryPage';

import SuppliersPage from './pages/SuppliersPage';

import PurchasesPage from './pages/PurchasesPage';

function App() {

  return (

    <Routes>

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <SalesPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <ProtectedRoute>
            <CustomersPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/inventory"
        element={<InventoryPage />}
      />

      <Route
        path="/suppliers"
        element={<SuppliersPage />}
      />

      <Route
        path="/purchases"
        element={<PurchasesPage />}
      />

    </Routes>

  );
}

export default App;