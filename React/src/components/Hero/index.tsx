"use client";
import { useEffect } from "react";
import Link from "next/link";

const Hero = () => {

  useEffect(() => {
    // This runs only on the client (browser)
    sessionStorage.removeItem("user");
    sessionStorage.clear();
  }, []);

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  Gain Knwlodage and share knowlade with the world
                  
                </h1>
                <div className="mb-8 text-lg leading-relaxed text-body-color dark:text-gray-300">
                  Join our community of learners and educators to explore, create, and share knowledge on a global scale.
                </div>
                <div className="mb-10 flex flex-wrap justify-center gap-4">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-4 text-center text-base font-semibold text-white hover:bg-blue-700 hover:shadow-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                  >
                    Get Started

                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex items-center justify-center rounded-lg bg-gray-200 px-6 py-4 text-center text-base font-semibold text-gray-700 hover:bg-gray-300 hover:shadow-lg focus:ring-4 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-900"
                  >
                    Learn More
                  </Link>
                </div>
                <br></br>
              </div>
            </div>
          </div>
        </div>
        
      


       
      </section>
    </>
  );
};

export default Hero;
