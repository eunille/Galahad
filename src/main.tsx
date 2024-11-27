import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './pages/login/login';
import Dashboard from './pages/main-dashboard/dashboard'; 
import WarningPage from './components/ui/warningpage';
import './index.css'; 
import ProductsInventory from './pages/product/productsInventory';

import EditProducts from './components/products/editProducts';
import Reports from './pages/analytics/reports';
import {AuthProvider} from "@/services/authcontext"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productsInventory" element={<ProductsInventory />} />
        <Route path="/editProducts" element={<EditProducts closeModal={() => { /* implement close modal functionality */ }} />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="*" element={<WarningPage />} />

      </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
