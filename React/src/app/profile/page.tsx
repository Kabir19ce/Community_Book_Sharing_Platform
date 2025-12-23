"use client";

import Sidebar from "@/components/sidebar/sidebar";
//import ProfileIcon from "@/components/icons/profileIcon";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar />

      <main className="flex-1 p-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow transition-colors duration-300 max-w-3xl mx-auto">
          <div className="flex items-center space-x-6 mb-6">
            {/* <ProfileIcon size={100} /> */}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {user?.name || "User Name"}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{user?.email || "user@example.com"}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded">
              <span className="font-medium text-gray-700 dark:text-gray-300">User ID</span>
              <span className="text-gray-800 dark:text-white">{user?.userid || "N/A"}</span>
            </div>

            <div className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded">
              <span className="font-medium text-gray-700 dark:text-gray-300">Full Name</span>
              <span className="text-gray-800 dark:text-white">{user?.firstname + " " + user?.lastname || "N/A"}</span>
            </div>

           

            <div className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded">
              <span className="font-medium text-gray-700 dark:text-gray-300">Email</span>
              <span className="text-gray-800 dark:text-white">{user?.email || "N/A"}</span>
            </div>

            <div className="flex justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded">
              <span className="font-medium text-gray-700 dark:text-gray-300">Phone</span>
              <span className="text-gray-800 dark:text-white">{user?.phone || "N/A"}</span>
            </div>

            
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
