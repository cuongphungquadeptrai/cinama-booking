import { useEffect, useState, useRef } from "react";

function App() {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const startX = useRef(null);

  useEffect(() => {
    fetch("http://localhost:3000/slides")
      .then((res) => res.json())
      .then((data) => setSlides(data))
      .catch((err) => console.error("Lỗi khi fetch slides:", err));
  }, []);

  // Auto slide
  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slides]);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // Bắt đầu kéo
  const handleDragStart = (e) => {
    startX.current = e.type === "touchstart"
      ? e.touches[0].clientX
      : e.clientX;
  };

  // Kết thúc kéo
  const handleDragEnd = (e) => {
    if (startX.current === null) return;

    const endX =
      e.type === "touchend"
        ? e.changedTouches[0].clientX
        : e.clientX;
    const diff = startX.current - endX;

    if (diff > 50) nextSlide(); // Vuốt sang trái
    else if (diff < -50) prevSlide(); // Vuốt sang phải

    startX.current = null;
  };

  return (
    <div
      className="relative w-full h-[100vh] overflow-hidden"
      onMouseDown={handleDragStart}
      onMouseUp={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchEnd={handleDragEnd}
    >
      {/* Left edge as prev button */}
      <div
        onClick={prevSlide}
        className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/50 to-transparent hover:from-black/70 transition-opacity duration-300 z-10 cursor-pointer"
      />
      {/* Right edge as next button */}
      <div
        onClick={nextSlide}
        className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/50 to-transparent hover:from-black/70 transition-opacity duration-300 z-10 cursor-pointer"
      />

      {slides.length > 0 && (
        <div
          className="w-full h-full transition-transform duration-700 ease-in-out flex"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((item) => (
            <img
              key={item.id}
              src={item.linkslide}
              alt={`slide-${item.id}`}
              className="w-full h-[100vh] object-cover flex-shrink-0"
            />
          ))}
        </div>
      )}

      {/* Prev Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors duration-300"
      >
        &lsaquo;
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors duration-300"
      >
        &rsaquo;
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === index ? "bg-white scale-110" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default App;