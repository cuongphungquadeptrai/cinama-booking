import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "./Header.css";
import logo from "./img/cgvlogo.png";
import { toast } from "react-toastify";

function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Debug
    console.log('Current URL id:', id);
    const storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('Stored user:', storedUser);

    // Nếu có storedUser và id khớp hoặc không có id, sử dụng storedUser
    if (storedUser && (!id || String(storedUser.id) === String(id))) {
      setUser(storedUser);
      return;
    }

    // Nếu có id trong URL, gọi API
    if (id) {
      const fetchUser = async () => {
        try {
          const response = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log('API response status:', response.status);
          if (response.ok) {
            const users = await response.json();
            console.log('Users from API:', users);
            const foundUser = users.find((u) => String(u.id) === String(id));
            console.log('Found user:', foundUser);
            if (foundUser) {
              setUser(foundUser);
              localStorage.setItem('user', JSON.stringify(foundUser));
            } else {
              setUser(null);
              toast.error('Không tìm thấy thông tin người dùng');
            }
          } else {
            setUser(null);
            toast.error('Lỗi khi lấy thông tin người dùng');
          }
        } catch (err) {
          setUser(null);
          toast.error('Lỗi kết nối server');
          console.error('Error fetching user:', err);
        }
      };
      fetchUser();
    } else {
      // Nếu không có id, giữ user từ localStorage (nếu có)
      setUser(storedUser);
    }
  }, [id]);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleLogout = () => {
    setOpenDropdown(null);
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="w-full h-[80px] bg-black/50 text-white flex items-center justify-between px-8 lg:px-24 text-[16px] fixed top-0 z-[1000] shadow-lg"
      ref={dropdownRef}
    >
      <Link
        to={user ? `/home/${user.id}` : "/home"}
        className="w-[80px] transition-transform hover:scale-105"
      >
        <img src={logo} alt="Logo" className="w-full h-auto" />
      </Link>

      <div className="flex gap-10 font-medium">
        <div className="relative">
          <button
            onClick={() => toggleDropdown("movie")}
            className="p-3 hover:text-red-500 transition-colors duration-300"
          >
            Phim
          </button>
          {openDropdown === "movie" && (
            <div className="absolute left-0 mt-2 w-[220px] bg-white text-black rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
              <Link
                to="/phim-dang-chieu"
                className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                onClick={() => setOpenDropdown(null)}
              >
                Phim đang chiếu
              </Link>
              <Link
                to="/phim-sap-chieu"
                className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                onClick={() => setOpenDropdown(null)}
              >
                Phim sắp chiếu
              </Link>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => toggleDropdown("rap")}
            className="p-3 hover:text-red-500 transition-colors duration-300"
          >
            Rạp chiếu phim
          </button>
          {openDropdown === "rap" && (
            <div className="absolute left-0 mt-2 w-[220px] bg-white text-black rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
              <Link
                to="/tat-ca-rap"
                className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                onClick={() => setOpenDropdown(null)}
              >
                Tất cả các rạp
              </Link>
              <Link
                to="/rap-dac-biet"
                className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                onClick={() => setOpenDropdown(null)}
              >
                Rạp đặc biệt
              </Link>
              <Link
                to="/rap-3d"
                className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                onClick={() => setOpenDropdown(null)}
              >
                Rạp 3D
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/tin-tuc"
          className="p-3 hover:text-red-500 transition-colors duration-300"
        >
          Tin tức
        </Link>

        <div className="relative">
          <button
            onClick={() => toggleDropdown("cultureflex")}
            className="p-3 hover:text-red-500 transition-colors duration-300"
          >
            Cultureflex
          </button>
          {openDropdown === "cultureflex" && (
            <div className="absolute left-0 mt-2 w-[220px] bg-white text-black rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
              <Link
                to="/tat-ca-rap"
                className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                onClick={() => setOpenDropdown(null)}
              >
                Quầy online
              </Link>
              <Link
                to="/rap-dac-biet"
                className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                onClick={() => setOpenDropdown(null)}
              >
                Thuê rạp & vé nhóm
              </Link>
              <Link
                to="/e-cgv"
                className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                onClick={() => setOpenDropdown(null)}
              >
                E-CGV
              </Link>
              <Link
                to="/cgv-egift"
                className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                onClick={() => setOpenDropdown(null)}
              >
                CGV-EGIFT
              </Link>
              <Link
                to="/chv-rules"
                className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                onClick={() => setOpenDropdown(null)}
              >
                CGV-RULES
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-6">
        {user ? (
          <div className="relative">
            <button
              onClick={() => toggleDropdown("user")}
              className="p-3 hover:text-red-500 transition-colors duration-300"
            >
              Chào mừng! {user.name}
            </button>
            {openDropdown === "user" && (
              <div className="absolute right-0 mt-2 w-[220px] bg-white text-black rounded-lg shadow-xl border border-gray-200 overflow-hidden animate-fadeIn">
                <Link
                  to="/profile"
                  className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                  onClick={() => setOpenDropdown(null)}
                >
                  Thông tin cá nhân
                </Link>
                <Link
                  to="/tickets"
                  className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                  onClick={() => setOpenDropdown(null)}
                >
                  Vé của tôi
                </Link>
                <Link
                  to="/transactions"
                  className="block px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                  onClick={() => setOpenDropdown(null)}
                >
                  Lịch sử giao dịch
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 hover:bg-red-500 hover:text-white transition-colors duration-200"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="p-3 rounded-lg hover:text-red-500 transition-colors duration-300"
          >
            Đăng nhập / Đăng ký
          </Link>
        )}
      </div>
    </div>
  );
}

export default Header;