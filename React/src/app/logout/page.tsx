 
 "use client";
import { useEffect } from "react";
import Link from "next/link";


const Logout = () => {
   useEffect(() => {
    // This runs only on the client (browser)
    sessionStorage.removeItem("user");
    sessionStorage.clear();
  }, []);
  return (
    // iwant to redirect to home page when cleick on logout button i want to return to home page
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">  
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">You have been logged out</h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">Thank you for visiting our Community Book Sharing Platform.</p>
        <Link
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};
export default Logout;
