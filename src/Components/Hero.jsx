import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const Hero = ({ searchQuery }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = 6;

  const paginatedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            searchQuery
          )}&maxResults=35&filter=free-ebooks&key=AIzaSyAjpak8cc2-e_wXGILhogaS99qGc4mAmAY`
        );
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        const mappedBooks =
          data.items?.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title || "Untitled",
            authors: item.volumeInfo.authors?.join(", ") || "Unknown Author",
            categories: item.volumeInfo.categories?.join(", ") || "General",
            rating: item.volumeInfo.averageRating || 0,
            pageCount: item.volumeInfo.pageCount || "N/A",
            printType: item.volumeInfo.printType || "Unknown",
            ratingsCount: item.volumeInfo.ratingsCount || 0,
            imageUrl: item.volumeInfo.imageLinks?.thumbnail || "",
            description: item.volumeInfo.description || "",
            infoLink: item.volumeInfo.infoLink || "#",
          })) || [];

        let limitedBooks = mappedBooks.slice(0, 35);
        if (limitedBooks.length < 35) {
          const missingCount = 35 - limitedBooks.length;
          const dummyBooks = Array.from({ length: missingCount }, (_, i) => ({
            dummy: true,
            id: `dummy-${i}`,
          }));

          limitedBooks = [...limitedBooks, ...dummyBooks];
        }
        setBooks(limitedBooks);
      } catch (error) {
        console.error("Error fetching Books:", error);
        const dummyBooks = Array.from({ length: 35 }, (_, i) => ({
          dummy: true,
          id: `dummy-${i}`,
        }));
        setBooks(dummyBooks);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [searchQuery]);

  const getPlaceholder = (title) => {
    const initials = title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .substring(0, 2);
    return `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900">
        <rect width="100%" height="100%" fill="#2D3748"/>
        <text x="50%" y="50%" fill="#4A5568" font-family="monospace" font-size="80" 
              text-anchor="middle" dominant-baseline="middle">${initials}</text>
      </svg>`
    )}`;
  };

  if (loading) {
    return (
      <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 md:h-96 bg-gray-800/50 rounded-xl md:rounded-2xl backdrop-blur-lg"></div>
        ))}
      </div>
    );
  }

  const allDummy = books.every((book) => book.dummy);
  if (allDummy) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex justify-center items-center">
        <p className="text-cyan-300 text-lg md:text-xl text-center">
          No Matches found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 md:pt-20 bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-6 md:p-8 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {paginatedBooks.map((book, index) => {
            if (book.dummy) {
              return (
                <div
                  key={book.id || index}
                  className="group relative bg-gray-800/30 rounded-xl md:rounded-2xl backdrop-blur-xl border border-dashed border-gray-700/50 flex items-center justify-center h-64 md:h-96">
                  <p className="text-gray-400 text-sm md:text-base">No Book</p>
                </div>
              );
            }
            return (
              <div
                id="hero"
                key={book.id}
                className="group relative bg-gray-800/30 rounded-xl md:rounded-2xl backdrop-blur-xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:-translate-y-1 md:hover:-translate-x-2 shadow-xl hover:shadow-2xl hover:shadow-cyan-400/10">
                <a
                  href={book.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 cursor-pointer"
                  aria-label={`view ${book.title}`}></a>
                <div className="p-4 md:p-6">
                  <div className="relative aspect-[4/5] w-full rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-cyan-400/10 to-blue-400/10">
                    <img
                      src={book.imageUrl || getPlaceholder(book.title)}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      style={{
                        imageRendering: "-webkit-optimize-contrast",
                      }}
                      onError={(e) =>
                        (e.target.src = getPlaceholder(book.title))
                      }
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 bg-gradient-to-t from-gray-900/90 to-transparent">
                      <span className="text-xs md:text-sm font-medium text-cyan-300">
                        {book.printType}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;
