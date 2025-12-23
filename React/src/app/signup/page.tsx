"use client";

import Link from "next/link";
import { useState } from "react";
import AllAPIs from "@/api/allAPIs";
import apiService from "@/api/apiService";

const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  // Validation functions
  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => password.length >= 6;
  const validatePhoneNumber = (phoneno: string) => /^[0-9]{10}$/.test(phoneno);

  // Handle changes and validate live
  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(!validateEmail(value) ? "Please enter a valid email address" : "");
  };

  const handlePhoneChange = (value: string) => {
    setPhoneno(value);
    setPhoneError(!validatePhoneNumber(value) ? "Phone number must be 10 digits" : "");
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(!validatePassword(value) ? "Password must be at least 6 characters long" : "");

    if (confirmPassword && value !== confirmPassword) setConfirmError("Passwords do not match");
    else setConfirmError("");
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setConfirmError(password !== value ? "Passwords do not match" : "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError || phoneError || passwordError || confirmError) {
      alert("Please fix the errors before submitting!");
      return;
    }
    saveUserData();
  };

  function saveUserData() {
    const userData = {
      firstname: firstName,
      lastname: lastName,
      email,
      phoneno,
      password,
      confirm_password: confirmPassword,
      created_date: formatDate(new Date()),
      userrole: 1,
      status: 1,
    };

    function formatDate(date: Date): string {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    apiService
      .PostMethod(AllAPIs.SAVE_USER_DATA, userData)
      .then((data) => {
        if (data === true) {
          alert("Registration successful! Please sign in.");
          window.location.href = "/signin";
        } else {
          alert("Registration failed: " + data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  const inputClass = (error: string) =>
    `w-full rounded-xs px-6 py-3 text-base outline-none transition-all duration-300
     ${error ? "border-red-500" : "border-stroke"} bg-white dark:bg-[#2C303B] text-black dark:text-white`;

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          <div className="w-full px-4">
            <div className="shadow-three dark:bg-dark mx-auto max-w-[500px] rounded-sm bg-white px-6 py-10 sm:p-[60px]">
              <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                Create your account
              </h3>

              <div className="mb-8 flex items-center justify-center">
                <span className="bg-body-color/50 hidden h-[1px] w-full max-w-[60px] sm:block"></span>
                <p className="text-body-color w-full px-5 text-center text-base font-medium">
                  Register with your email
                </p>
                <span className="bg-body-color/50 hidden h-[1px] w-full max-w-[60px] sm:block"></span>
              </div>

              <form onSubmit={handleSubmit}>
                {/* First Name */}
                <div className="mb-6">
                  <label className="text-dark mb-3 block text-sm dark:text-white">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className={`${inputClass("")}`}
                    required
                  />
                </div>

                {/* Last Name */}
                <div className="mb-6">
                  <label className="text-dark mb-3 block text-sm dark:text-white">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className={`${inputClass("")}`}
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="text-dark mb-3 block text-sm dark:text-white">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                    placeholder="Enter your email"
                    className={inputClass(emailError)}
                    required
                  />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>

                {/* Phone */}
                <div className="mb-6">
                  <label className="text-dark mb-3 block text-sm dark:text-white">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneno}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="Enter your phone number"
                    className={inputClass(phoneError)}
                    required
                  />
                  {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
                </div>

                {/* Password */}
                <div className="mb-6">
                  <label className="text-dark mb-3 block text-sm dark:text-white">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    placeholder="Enter your password"
                    className={inputClass(passwordError)}
                    required
                  />
                  {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>

                {/* Confirm Password */}
                <div className="mb-6">
                  <label className="text-dark mb-3 block text-sm dark:text-white">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    placeholder="Re-enter your password"
                    className={inputClass(confirmError)}
                    required
                  />
                  {confirmError && <p className="text-red-500 text-sm mt-1">{confirmError}</p>}
                </div>

                {/* Submit Button */}
                <div className="mb-6">
                  <button
                    type="submit"
                    className="shadow-submit dark:shadow-submit-dark bg-primary hover:bg-primary/90 w-full rounded-xs px-9 py-4 text-base font-medium text-white duration-300"
                  >
                    Sign Up
                  </button>
                </div>

                <p className="text-body-color text-center text-base font-medium">
                  Already have an account?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
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

export default SignupPage;
