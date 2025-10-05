import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function LoginAndRegister() {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullname: '',
    email: '',
    phone: '',
    gender: 'Nam',
    dateofbirth: '',
    agree1: false,
    agree2: false,
    agree3: false,
    agree4: false,
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value,
    });
  };

  const resetFormData = () => {
    setFormData({
      username: '',
      password: '',
      confirmPassword: '',
      fullname: '',
      email: '',
      phone: '',
      gender: 'Nam',
      dateofbirth: '',
      agree1: false,
      agree2: false,
      agree3: false,
      agree4: false,
    });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.agree1 || !formData.agree2 || !formData.agree3 || !formData.agree4) {
      setError('Vui lòng tích vào các điều khoản');
      toast.error('Vui lòng tích vào các điều khoản');
      return;
    }

    if (formData.username.length < 7 || formData.username.length > 15) {
      setError('Tài khoản phải từ 7 đến 15 ký tự');
      toast.error('Tài khoản phải từ 7 đến 15 ký tự');
      return;
    }
    if (formData.password.length < 6) {
      setError('Mật khẩu phải trên 5 ký tự');
      toast.error('Mật khẩu phải trên 5 ký tự');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp');
      toast.error('Mật khẩu và xác nhận mật khẩu không khớp');
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Số điện thoại phải đúng 10 chữ số');
      toast.error('Số điện thoại phải đúng 10 chữ số');
      return;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Email không hợp lệ');
      toast.error('Email không hợp lệ');
      return;
    }
    if (!['Nam', 'Nữ'].includes(formData.gender)) {
      setError('Vui lòng chọn giới tính Nam hoặc Nữ');
      toast.error('Vui lòng chọn giới tính Nam hoặc Nữ');
      return;
    }

    try {
      // Check for existing username, email, and phone
      const checkResponse = await fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (checkResponse.ok) {
        const users = await checkResponse.json();
        const existingUsername = users.find((u) => u.username === formData.username);
        const existingEmail = users.find((u) => u.email === formData.email);
        const existingPhone = users.find((u) => u.phone === formData.phone);

        if (existingUsername) {
          setError('Tài khoản đã tồn tại');
          toast.error('Tài khoản đã tồn tại');
          return;
        }
        if (existingEmail) {
          setError('Email đã được sử dụng');
          toast.error('Email đã được sử dụng');
          return;
        }
        if (existingPhone) {
          setError('Số điện thoại đã được sử dụng');
          toast.error('Số điện thoại đã được sử dụng');
          return;
        }
      } else {
        setError('Lỗi khi kiểm tra thông tin');
        toast.error('Lỗi khi kiểm tra thông tin');
        return;
      }

      // Format dateofbirth to DD/MM/YYYY
      let formattedDate = '';
      if (formData.dateofbirth) {
        const date = new Date(formData.dateofbirth);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        formattedDate = `${day}/${month}/${year}`;
      }

      const response = await fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          name: formData.fullname,
          dateofbirth: formattedDate,
          email: formData.email,
          phone: formData.phone,
          gender: formData.gender,
        }),
      });

      if (response.ok) {
        toast.success('Đăng ký thành công!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        resetFormData(); // Clear all input fields
        setIsRegister(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Đăng ký không thành công');
        toast.error(errorData.message || 'Đăng ký không thành công');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      toast.error('Lỗi kết nối server');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const users = await response.json();
        const user = users.find(
          (u) => u.username === formData.username && u.password === formData.password
        );

        if (user) {
          toast.success('Đăng nhập thành công!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setFormData((prev) => ({
            ...prev,
            username: '',
            password: '',
          })); // Clear username and password fields
          // Điều hướng đến /home/id=<userId>
          setTimeout(() => navigate(`/home/${user.id}`), 2000);
        } else {
          setError('Tài khoản hoặc mật khẩu không đúng');
          toast.error('Tài khoản hoặc mật khẩu không đúng');
        }
      } else {
        setError('Lỗi khi đăng nhập');
        toast.error('Lỗi khi đăng nhập');
      }
    } catch (err) {
      setError('Lỗi kết nối server');
      toast.error('Lỗi kết nối server');
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center w-[500px] min-h-screen px-4 gap-6 md:gap-12 py-8">
      {isRegister ? (
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
          <h1 className="text-white text-2xl font-bold text-center mb-6">Đăng Ký</h1>
          {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

          <form className="space-y-4" onSubmit={handleRegisterSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm text-gray-300 mb-1">
                Tài khoản
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tài khoản"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mật khẩu"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-gray-300 mb-1">
                Xác nhận mật khẩu
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Xác nhận mật khẩu"
              />
            </div>

            <div>
              <label htmlFor="fullname" className="block text-sm text-gray-300 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                id="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Họ và tên"
              />
            </div>

            <div>
              <label htmlFor="dateofbirth" className="block text-sm text-gray-300 mb-1">
                Ngày sinh
              </label>
              <input
                type="date"
                id="dateofbirth"
                value={formData.dateofbirth}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm text-gray-300 mb-1">
                Số điện thoại
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0123456789"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm text-gray-300 mb-1">
                Giới tính
              </label>
              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>

            <div className="space-y-2 text-gray-300 text-sm">
              <label className="flex items-start gap-2">
                <input type="checkbox" id="agree1" checked={formData.agree1} onChange={handleChange} />
                <span>
                  Bằng việc bấm nút “Đăng Ký” bên dưới. Tôi đồng ý cho phép CGV Việt Nam thực hiện xử lý dữ liệu cá nhân của tôi phù hợp với mục đích mà CGV Việt Nam đã thông báo tại Chính Sách Bảo Mật.
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" id="agree2" checked={formData.agree2} onChange={handleChange} />
                <span>
                  Thông tin cá nhân cung cấp tại đây là chính xác và trùng khớp với thông tin tại CMND/CCCD/Thẻ Căn cước và/hoặc Giấy khai sinh. Email cung cấp tại đây là chính xác và thuộc quyền quản lý duy nhất của tôi.
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" id="agree3" checked={formData.agree3} onChange={handleChange} />
                <span>
                  Xác nhận email chính xác và ngày sinh khớp với thông tin trên CMND/CCCD. Nếu không trùng khớp, các thông tin này sẽ không được hỗ trợ cập nhật thay đổi và có thể không được hưởng các quyền lợi thành viên.
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" id="agree4" checked={formData.agree4} onChange={handleChange} />
                <span>
                  Tôi đồng ý với Điều Khoản Sử Dụng Của CGV.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
            >
              Đăng ký
            </button>
          </form>

          <p className="text-gray-400 text-sm text-center mt-4">
            Bạn đã có tài khoản?{' '}
            <button
              onClick={() => setIsRegister(false)}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Đăng nhập
            </button>
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
          <h1 className="text-white text-2xl font-bold text-center mb-6">Đăng Nhập</h1>
          {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm text-gray-300 mb-1">
                Tài khoản
              </label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tài khoản"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm text-gray-300 mb-1">
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-900 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Mật khẩu"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
            >
              Đăng nhập
            </button>
          </form>
          <p className="text-gray-400 text-sm text-center mt-4">
            Bạn chưa có tài khoản?{' '}
            <button
              onClick={() => setIsRegister(true)}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Đăng ký tài khoản
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default LoginAndRegister;