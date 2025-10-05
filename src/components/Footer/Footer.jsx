import "./Footer.css";
import logo4Dx from "./img/4dx.png";
import logo3D from "./img/3d.png";
import logoIMAX from "./img/imax.png";
import logoStadium from "./img/stadium.png";
import logoGoldClass from "./img/goldclass.png";
import logoLamour from "./img/lamour.png";
import logoSweetBox from "./img/sweetbox.png";
import logoPremium from "./img/premium.png";
import logoScreenX from "./img/screenx.png";
import logoCineandforest from "./img/cineandforest.png";
import logoCineandlivingroom from "./img/cineandlivingroom.png";
import logoUltra4DX from "./img/ULTRA-4DX.png";
import logoCinesuite from "./img/cine-suite.png";

import logoFacebook from "./img/Facebook.png";
import logoYoutube from "./img/Youtube.png";
import logoIntagram from "./img/Instagram.png";

function Footer() {

    return (
        <div>
            <div className="w-full bg-fdfcf0">
                <div id="brand-list" className="border-b border-black h-[50px] flex justify-center items-center gap-2">
                    <img src={logo4Dx} alt="" className="h-[20px]" />
                    <img src={logoIMAX} alt="" className="h-[20px]" />
                    <img src={logoStadium} alt="" className="h-[20px]" />
                    <img src={logoGoldClass} alt="" className="h-[20px]" />
                    <img src={logoLamour} alt="" className="h-[20px]" />
                    <img src={logoSweetBox} alt="" className="h-[20px]" />
                    <img src={logoPremium} alt="" className="h-[20px]" />
                    <img src={logoScreenX} alt="" className="h-[20px]" />
                    <img src={logoCineandforest} alt="" className="h-[20px]" />
                    <img src={logoCineandlivingroom} alt="" className="h-[20px]" />
                    <img src={logoCinesuite} alt="" className="h-[20px]" />
                    <img src={logoUltra4DX} alt="" className="h-[20px]" />
                    <img src={logo3D} alt="" className="h-[20px]" />
                </div>
                <div className="pt-5 pb-5 flex gap-10 justify-center border-b border-black">
                    <ul className="w-[250px]"><h1 className="text-[18px] font-[700] text-gray-700 pb-4">CGV Việt Nam</h1>
                        <li>Giới Thiệu</li>
                        <li>Tiện Ích Online</li>
                        <li>Thẻ Quà Tặng</li>
                        <li>Tuyển Dụng</li>
                        <li>Liên Hệ Quảng Cáo CGV</li>
                        <li>Dành Cho Đối Tác</li>
                    </ul>
                    <ul className="w-[250px]"><h1 className="text-[18px] font-[700] text-gray-700 pb-4">Điều Khoản Sử Dụng</h1>
                        <li>Điều khoản sử dụng</li>
                        <li>Điều khoản giao diện</li>
                        <li>Chính sách thanh toán</li>
                        <li>Chính sách bảo mật</li>
                        <li>Câu hỏi thường gặp</li>
                    </ul>
                    <ul className="w-[250px]"><h1 className="text-[18px] font-[700] text-gray-700 pb-4">Kết nối với chúng tôi</h1>
                        <div className="flex gap-2">
                            <li><img src={logoFacebook} alt="" className="h-[30px]" /></li>
                            <li><img src={logoYoutube} alt="" className="h-[30px]" /></li>
                            <li><img src={logoIntagram} alt="" className="h-[30px]" /></li>
                        </div>

                    </ul>
                    <ul className="w-[250px]"><h1 className="text-[18px] font-[700] text-gray-700 pb-4">Chăm sóc khách hàng</h1>
                        <li>Hotline: 1900 6017</li>
                        <li>Giờ làm việc: 8:00 - 22:00 (Tất cả các ngày bao gồm cả Lễ Tết)</li>
                        <li>Email hỗ trợ: hoidap@cgv.vn</li>
                    </ul>
                </div>
                <div className="pt-5 pb-5 flex justify-center">
                    <ul><h1 className="text-[18px] font-[700] text-gray-700">CÔNG TY TNHH CJ CGV VIỆT NAM</h1>
                        <li> Giấy Chứng nhận đăng ký doanh nghiệp: 0303675393 đăng ký lần đầu ngày 31/7/2008,
                            được cấp bởi Sở Kế hoạch và Đầu tư Thành phố Hồ Chí Minh
                        </li>
                        <li>Địa chỉ: Lầu 2, số 7/28, Đường Thành Thái, Phường 14, Quận 10, Thành phố Hồ Chí Minh, Việt Nam</li>
                        <li>Đường dây nóng (Hotline): 1900 6017</li>
                        <li>COPYRIGHT 2017 CJ CGV VIETNAM CO., LTD. ALL RIGHTS RESERVED</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer