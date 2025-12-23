"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AfterLogin = () => {
  const router = useRouter();

  useEffect(() => {
    // Get user info from sessionStorage (set during login)
     const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    //console.log("AfterLogin User:", user);
    console.log("AfterLogin UserID:", user.userid);
    console.log("AfterLogin UserRole:", user.userrole);
    
    //if (!user || !user.userid) {
      // Not logged in → redirect to login
     // alert("User id Not found, please login again.");
     // router.push("/signin");
      //return;
    //}

    // Logged in → redirect to userDashboard
     if (user == null || user.userid == null) {
      alert("User not found. Please login again.");
      router.push("/signin");
      return;
    }

    // Redirect based on role
    if (user.userrole === 2) {
      router.push("/AdminDashboard");
    } else if (user.userrole === 1) {
      router.push("/userDashboard");
    } else {
      router.push("/signin");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-lg text-gray-700 dark:text-white">
        Redirecting...
      </p>
    </div>
  );
};

export default AfterLogin;
