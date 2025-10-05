import { Link } from "react-router-dom";
import "./Header.css";
import logo from "./img/cgvlogo.png";

function HeaderLogin() {
  return (
    <div
      className="w-full h-[80px] bg-black/50 text-white flex items-center px-8 lg:px-24 fixed top-0 z-[1000] shadow-lg"
    >
      <Link to="/home" className="w-[80px] transition-transform hover:scale-105">
        <img src={logo} alt="Logo" className="w-full h-auto" />
      </Link>
    </div>
  );
}

export default HeaderLogin;
