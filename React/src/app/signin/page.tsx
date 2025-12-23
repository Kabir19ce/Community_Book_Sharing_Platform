"use client";

import Link from "next/link";
import { useState } from "react";
import AllAPIs from "@/api/allAPIs";
import apiService from "@/api/apiService";
import { useRouter } from "next/navigation";


const SigninPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
     setError('');
    

    try {
  // Call login API
  const loginResponse = await apiService.PostMethod(AllAPIs.SIGN_IN, { email, password });
  console.log("Login Response:", loginResponse);

  if (loginResponse) {
    // Save user info in sessionStorage to keep signed in
    sessionStorage.setItem('user', JSON.stringify(loginResponse));
    alert("Login successful");

    // Call generate OTP API using userid from login response
    const otpResponse = await apiService.PostMethod(AllAPIs.GENRATEOTP, { userid: loginResponse.userid });
    console.log("OTP Response:", otpResponse);
    sessionStorage.setItem('tempOTP', JSON.stringify(otpResponse));
    // Redirect to OTP page
    router.push("/otp");
  } else {
    setError("Invalid email or password");
  }
} catch (err: any) {
  setError(err.message || "Something went wrong");
}
  };

  const inputClass = "border-stroke w-full rounded-xs px-6 py-3 text-base outline-none transition-all duration-300 bg-white dark:bg-[#2C303B] text-black dark:text-white";

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4">
            <div className="shadow-three dark:bg-dark mx-auto max-w-[500px] rounded-sm bg-white px-6 py-10 sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                Sign in to your account
              </h3>

              <div className="mb-8 flex items-center justify-center">
                <span className="bg-body-color/50 hidden h-[1px] w-full max-w-[70px] sm:block"></span>
                <p className="text-body-color w-full px-5 text-center text-base font-medium">
                  Sign in with your email and password
                </p>
                <span className="bg-body-color/50 hidden h-[1px] w-full max-w-[70px] sm:block"></span>
              </div>

              <form onSubmit={handleForm}>
                <div className="mb-6">
                  <label className="text-dark mb-3 block text-sm dark:text-white">Your Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="text-dark mb-3 block text-sm dark:text-white">Your Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your Password"
                    className={inputClass}
                    required
                  />
                </div>

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="mb-6 flex flex-col justify-between sm:flex-row sm:items-center">
                  <div></div>
                  <div>
                    <a href="#0" className="text-primary text-sm font-medium hover:underline">
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
                    className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 w-full rounded-xs px-9 py-4 text-base font-medium text-white duration-300"
                  >
                    Sign in
                  </button>
                </div>

                <p className="text-body-color text-center text-base font-medium">
                  Don’t have an account?{" "}
                  <Link href="/signup" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SigninPage;
