"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AnimatedFooter = () => {
  const text = "Community Book Sharing Platform";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    let forward = true;
    const interval = setInterval(() => {
      if (forward) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === text.length) forward = false;
      } else {
        setDisplayedText(text.slice(0, currentIndex - 1));
        currentIndex--;
        if (currentIndex === 0) forward = true;
      }
    }, 150); // speed of typing/deleting

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="flex h-screen items-center justify-center bg-white dark:bg-gray-dark">
      <motion.h1
        className="text-3xl md:text-5xl font-bold text-primary dark:text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {displayedText}
        <motion.span
          className="inline-block"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          |
        </motion.span>
      </motion.h1>
    </footer>
  );
};

export default AnimatedFooter;
