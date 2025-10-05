import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MoviesNowShowing() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  const API = `http://localhost:3000/movies`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();

        const filteredMovies = data.filter((movie) => movie.status === "AreShowing");

        setMovies(filteredMovies);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const totalPages = Math.ceil(movies.length / moviesPerPage);

  const handlePageChange = (pageNumber) => {
    if (totalPages === 0) return;
    let newPage;
    if (pageNumber < 1) {
      newPage = totalPages;
    } else if (pageNumber > totalPages) {
      newPage = 1;
    } else {
      newPage = pageNumber;
    }
    setCurrentPage(newPage);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const containerWidth = 1286;
  const slideOffset = -(currentPage - 1) * containerWidth;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white text-xl font-semibold animate-pulse">Đang tải...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-red-500 text-xl font-semibold">Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 relative">
      <h1 className="text-4xl font-bold text-white mb-12 text-center tracking-wide">
        Phim Đang Chiếu
      </h1>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="h-[1000px] relative overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
            style={{ transform: `translateX(${slideOffset}px)` }}
          >
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="grid grid-cols-5 gap-6 flex-shrink-0 px-5"
                style={{
                  width: `${containerWidth}px`,
                  minHeight: "1000px",
                  gridTemplateRows: "480px 480px",
                }}
              >
                {movies
                  .slice(pageIndex * moviesPerPage, (pageIndex + 1) * moviesPerPage)
                  .map((movie) => (
                    <div
                      key={movie.id}
                      className="group relative w-[230px] bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                      <div className="w-[230px] h-[360px]">
                        <img
                          src={movie.link_img_moive}
                          alt={movie.namemovie}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                          <Link
                            to={`/movie/${movie.id}`}
                            className="bg-red-600 text-white px-4 py-2 text-sm rounded-full hover:bg-red-700 transition-colors duration-200 transform hover:scale-105"
                          >
                            Xem chi tiết
                          </Link>
                        </div>
                      </div>
                      <div className="p-4 bg-gray-800 text-white h-[120px]">
                        <h2 className="text-base font-semibold truncate text-center">
                          {movie.namemovie}
                        </h2>
                        <p className="text-sm text-gray-300 truncate text-center mt-1">
                          {movie.type}
                        </p>
                        <p className="text-sm text-gray-300 text-center mt-1">
                          {movie.time} phút
                        </p>
                      </div>
                    </div>
                  ))}
                {movies.slice(pageIndex * moviesPerPage, (pageIndex + 1) * moviesPerPage).length <
                  moviesPerPage &&
                  Array.from({
                    length:
                      moviesPerPage -
                      movies.slice(pageIndex * moviesPerPage, (pageIndex + 1) * moviesPerPage)
                        .length,
                  }).map((_, index) => (
                    <div
                      key={`placeholder-${pageIndex}-${index}`}
                      className="w-[230px] bg-gray-800 rounded-lg opacity-50"
                      style={{ height: "480px" }}
                    >
                      <div className="w-[230px] h-[360px] bg-gray-700" />
                      <div className="p-4 h-[120px]">
                        <div className="h-5 bg-gray-700 rounded mb-1" />
                        <div className="h-4 bg-gray-700 rounded mb-1" />
                        <div className="h-4 bg-gray-700 rounded" />
                      </div>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation buttons with hover gradient effect */}
      {totalPages > 1 && (
        <>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="absolute left-0 top-0 h-full w-30 bg-gradient-to-r from-black/50 to-transparent hover:from-gray-700/70 hover:to-transparent text-white text-4xl font-bold flex items-center justify-center transition-all duration-300 z-20"
          >
            &lsaquo;
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="absolute right-0 top-0 h-full w-30 bg-gradient-to-l from-black/50 to-transparent hover:from-gray-700/70 hover:to-transparent text-white text-4xl font-bold flexitems-center justify-center transition-all duration-300 z-20"
          >
            &rsaquo;
          </button>
        </>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`w-4 h-4 rounded-full transition-all duration-300 transform ${currentPage === number
                  ? "bg-red-600 scale-125"
                  : "bg-gray-400 hover:bg-gray-300 hover:scale-110"
                }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MoviesNowShowing;