"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/sidebar";
import Image from "next/image";
import AllAPIs from "@/api/allAPIs";
import apiService from "@/api/apiService";

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  image: string;
  file?: string;
}

const BooksPage = () => {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [filtered, setFiltered] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form state
  const [bookName, setBookName] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookCategory, setBookCategory] = useState("");
  const [bookFile, setBookFile] = useState<File | null>(null);
  const [bookImage, setBookImage] = useState<File | null>(null);

  // Dummy Books
  const dummyBooks: Book[] = [
    { id: 1, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", image: "/images/books/book1.jpg" },
    { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self-help", image: "/images/books/book2.jpg" },
    { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", category: "Finance", image: "/images/books/book3.jpg" },
  ];

  useEffect(() => {
    fetchBooksFromBackend();
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(value.toLowerCase()) ||
        book.author.toLowerCase().includes(value.toLowerCase())
    );
    setFiltered(results);
  };

  const handleShare = (fileUrl: string) => {
    navigator.clipboard.writeText(fileUrl);
    alert("Book link copied!");
  };

  const handleAddBook = () => {
    if (!bookName || !bookAuthor || !bookCategory || !bookImage || !bookFile) {
      alert("Please fill all required fields and upload an image.");
      return;
    }
    
   const bookObject = {
    //get user id from session
    user_id: JSON.parse(sessionStorage.getItem("user") || "{}").user_id,
    //need today date in dd-mm-yyyy format
    upload_date: new Date().toISOString().split('T')[0].split('-').reverse().join('-'),
    bookname: bookName,
    book_category: bookCategory,
    book_author: bookAuthor
  };

  const formData = new FormData();
  formData.append("book", JSON.stringify(bookObject));
  formData.append("pdf", bookFile);
  formData.append("image", bookImage);

apiService
      .PostMethod(AllAPIs.SAVE_BOOK_DATA, formData)
      .then((data) => {
        if (data === true) {
          alert("Book added successfully!");
          setShowModal(false);
          // Optionally, refresh book list here or add the new book to state
          fetchBooksFromBackend();
        } else {
          alert("Book Not Added: " + data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }//close function



  const fetchBooksFromBackend = () => {
  apiService
    .GetMethod(AllAPIs.GET_BOOK_DATA)
    .then((data) => {

      const mapped = data.map((b: any) => ({
        user_id: b.user_id,
        id: b.book_id,
        title: b.bookname,
        author: b.book_author,
        category: b.book_category,
        image: "http://localhost:8081" + b.bookimage, // full URL
        file: "http://localhost:8081" + b.bookpath
      }));

      setBooks(mapped);
      setFiltered(mapped);
      
    })
    .catch((error) => console.error("Error:", error));
};



  

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <main className="flex-1 p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
          Books
        </h1>

        {/* Search & Add Book */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
          <div className="relative w-full md:w-1/2">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 dark:text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
              </svg>
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search books..."
              className="w-full pl-10 p-3 border rounded-lg dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Add Book
          </button>
        </div>

        {/* Book Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((book) => (
            <div key={book.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden transition hover:shadow-lg">
              <Image src={book.image} alt={book.title} width={400} height={250} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">{book.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-1">{book.author}</p>
                <p className="text-gray-500 dark:text-gray-400 mb-3">{book.category}</p>
                <div className="flex flex-col sm:flex-row justify-between gap-2">
                  <button 
                   onClick={() => window.open(book.file, "_blank")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full sm:w-auto">
                    Read
                  </button>
                  <button onClick={() => handleShare(book.file)} className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded w-full sm:w-auto">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-gray-600 dark:text-gray-400 mt-4">No books found.</p>
        )}

        {/* Add Book Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4">Add New Book</h2>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Book Name"
                  value={bookName}
                  onChange={(e) => setBookName(e.target.value)}
                  className="w-full p-2 md:p-3 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="text"
                  placeholder="Author Name"
                  value={bookAuthor}
                  onChange={(e) => setBookAuthor(e.target.value)}
                  className="w-full p-2 md:p-3 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <select
  value={bookCategory}
  onChange={(e) => setBookCategory(e.target.value)}
  className="w-full p-2 md:p-3 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
>
  <option value="" disabled>
    Select Category
  </option>
  <option value="Fiction">Fiction</option>
  <option value="Self-help">Self-help</option>
  <option value="Finance">Finance</option>
  <option value="Science">Science</option>
  <option value="History">History</option>
  <option value="Biography">Biography</option>
  <option value="Technology">Technology</option>
  <option value="Art">Art</option>
  <option value="Poetry">Poetry</option>
</select>

                <div className="flex flex-col sm:flex-row gap-2">
                  <label className="flex-1 flex flex-col items-center justify-center p-2 md:p-3 border rounded cursor-pointer dark:border-gray-600 dark:text-white text-center">
                    {bookFile ? bookFile.name : "Upload File"}
                    <input type="file" className="hidden" onChange={(e) => setBookFile(e.target.files?.[0] || null)} />
                  </label>
                  <label className="flex-1 flex flex-col items-center justify-center p-2 md:p-3 border rounded cursor-pointer dark:border-gray-600 dark:text-white text-center">
                    {bookImage ? bookImage.name : "Upload Image"}
                    <input type="file" className="hidden" onChange={(e) => setBookImage(e.target.files?.[0] || null)} />
                  </label>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBook}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default BooksPage;
