import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from '../components/Footer/Footer.jsx';
import HeaderLogin from '../components/Header/HeaderLogin.jsx';
import LoginAndRegister from '../components/LoginAndRegister/LoginAndRegister.jsx'; 
import SlideInLoginPage from '../components/LoginAndRegister/SlideInLoginPage.jsx';

function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <HeaderLogin />
      <div className="flex items-center justify-center">
        <LoginAndRegister />
        <SlideInLoginPage />
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Login;
