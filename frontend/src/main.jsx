import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/global.css';
import App from './App.jsx';
import AdminPanel from './pages/AdminPanel/AdminPanel.jsx';


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path='/admin' element={<AdminPanel/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>
);
