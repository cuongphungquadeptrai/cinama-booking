import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header/Header.jsx';
import Home from './page/Home.jsx';
import Login from './page/Login.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/:id" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/phim-dang-chieu" element={<div>Phim đang chiếu</div>} />
        <Route path="/phim-sap-chieu" element={<div>Phim sắp chiếu</div>} />
        <Route path="/tat-ca-rap" element={<div>Tất cả các rạp</div>} />
        <Route path="/rap-dac-biet" element={<div>Rạp đặc biệt</div>} />
        <Route path="/rap-3d" element={<div>Rạp 3D</div>} />
        <Route path="/tin-tuc" element={<div>Tin tức</div>} />
        <Route path="/e-cgv" element={<div>E-CGV</div>} />
        <Route path="/cgv-egift" element={<div>CGV-EGIFT</div>} />
        <Route path="/chv-rules" element={<div>CGV-RULES</div>} />
        <Route path="/profile" element={<div>Thông tin cá nhân</div>} />
        <Route path="/tickets" element={<div>Vé của tôi</div>} />
        <Route path="/transactions" element={<div>Lịch sử giao dịch</div>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>
);