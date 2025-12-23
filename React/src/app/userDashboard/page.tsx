// app/dashboard/dashboard.tsx
"use client";

import Sidebar from "@/components/sidebar/sidebar";

import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedUser === null || JSON.parse(storedUser).userid === null) {
      alert("User not found. Please login again.");
      window.location.href = "/signin";
      return;
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 ">
      <Sidebar />

      <main className="flex-1 p-8 mt-[100px]">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
          Welcome {user?.firstname || "User"}!
        </h1>

        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow transition-colors duration-300">
            <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
              Total Books
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-2xl mt-2">12</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow transition-colors duration-300">
            <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
              Borrowed Books
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-2xl mt-2">3</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow transition-colors duration-300">
            <h2 className="font-semibold text-lg text-gray-800 dark:text-white">
              Pending Requests
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-2xl mt-2">1</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
