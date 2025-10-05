import React from "react";  // <-- BẠN ĐANG THIẾU DÒNG NÀY

function ThanhVienCGV() {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/thanh-vien-cgv")
      .then((response) => response.json())
      .then((data) => setEvents(data.slice(0, 4))) // Lấy 4 sự kiện đầu tiên
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Thành viên CGV</h1>
      <div className="flex justify-center items-center gap-4 ">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="transition-transform duration-300 hover:scale-105 cursor-pointer">
              <img
                src={event["link-img-thanh-vien-cgv"]}
                alt={`Sự kiện ${event.id}`}
                className=""
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-4">Đang tải dữ liệu...</p>
        )}
      </div>
    </div>
  );
}

export default ThanhVienCGV;

// transition-transform duration-300 hover:scale-105 cursor-pointer