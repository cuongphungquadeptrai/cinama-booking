import React from "react";

function TinTucVaUuDai() {
  const [events, setEvents] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:3000/tin-tuc-va-uu-dai")
      .then((response) => response.json())
      .then((data) => setEvents(data))  // ✅ Lưu dữ liệu vào state
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto pt-4 pb-20">
      <h1 className="text-3xl font-bold text-center text-white mb-8">Tin tức và ưu đãi</h1>
      <div className="flex justify-center items-center gap-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event.id} className="transition-transform duration-300 hover:scale-105 cursor-pointer">
              <img
                src={event["link-img-tin-tuc-va-uu-dai"]}
                alt={`Sự kiện ${event.id}`}
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

export default TinTucVaUuDai;
