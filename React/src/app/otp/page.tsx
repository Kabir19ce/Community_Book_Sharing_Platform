"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AllAPIs from "@/api/allAPIs";
import apiService from "@/api/apiService";

const OtpPage = () => {
  const router = useRouter();

  const [Userotp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [tempOTP, setTempOTP] = useState<any>(null);

  // Load stored user + OTP and call SEND OTP automatically
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedTempOTP = sessionStorage.getItem("tempOTP");

console.log("Stored User:", storedTempOTP);
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedTempOTP) setTempOTP(JSON.parse(storedTempOTP));

  }, []);

  // Call SENDOTP automatically when user & tempOTP are loaded
  useEffect(() => {
    if (!user || !tempOTP) return;

    const sendOtpToEmail = async () => {
      try {
        const response = await apiService.PostMethod(AllAPIs.SENDOTP, {
          email: user.email,
          tempOTP: tempOTP,
        });

        console.log("Send OTP Response:", response);
      } catch (err) {
        setError("Failed to send OTP automatically.");
      }
    };

    sendOtpToEmail();

  }, [user, tempOTP]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setError("");
    }
  };

  const handleVerify = async () => {
    if (Userotp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      //console.log("Verifying OTP:", { userid: user.userid, Userotp, userOTP: Userotp });
      const verifyResponse = await apiService.PostMethod(AllAPIs.VERIFYOTP, {
        userId: user.userid,
        otp: tempOTP,
        userOTP: Userotp,
      });

      console.log("Verify Response:", verifyResponse);

      if (verifyResponse === true) {
        alert("OTP verified successfully!");
        router.push("/AfterLogin");
      } else {
        setError("Invalid OTP. Please try again.");
      }

    } catch (err: any) {
      setError(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-sm">

        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>

        {user && (
          <p className="text-center text-sm mb-2 text-gray-500 dark:text-gray-400">
            OTP sent to <strong>{user.email}</strong>
          </p>
        )}

        <input
          type="text"
          value={Userotp}
          onChange={handleChange}
          placeholder="Enter OTP"
          maxLength={6}
          className="w-full mb-4 px-4 py-3 border rounded"
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </section>
  );
};

export default OtpPage;
