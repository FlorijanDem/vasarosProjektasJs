import { StrictMode, } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import App from './App.jsx';
import AdminPanel from './pages/AdminPanel/AdminPanel.jsx';
import ProtectRoute from './utils/protectRoute.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path='/admin' element={<ProtectRoute allowedRoles={["admin"]}>
              <AdminPanel/>
      </ProtectRoute>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>
);
