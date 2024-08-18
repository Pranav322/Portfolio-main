import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"; // Optional social icons if needed
import homeImage from "../assets/cattt.gif";
import Terminalcomp from "./Terminal";

const typingSpeed = 100; // Speed at which text is typed
const erasingSpeed = 50; // Speed at which text is erased
const switchDelay = 2000; // Delay before switching text

const texts = ["Web Developer", "App Developer", "Blockchain Developer"];

const Home = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timer;

    const typeText = () => {
      setDisplayedText((prev) => {
        if (prev.length < texts[currentTextIndex].length) {
          timer = setTimeout(
            () => setDisplayedText(prev + texts[currentTextIndex][prev.length]),
            typingSpeed
          );
        } else {
          setIsTyping(false);
          timer = setTimeout(() => setIsTyping(true), switchDelay);
        }
        return prev;
      });
    };

    const eraseText = () => {
      setDisplayedText((prev) => {
        if (prev.length > 0) {
          timer = setTimeout(
            () => setDisplayedText(prev.slice(0, -1)),
            erasingSpeed
          );
        } else {
          setIsTyping(true);
          setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
        return prev;
      });
    };

    if (isTyping) {
      typeText();
    } else {
      eraseText();
    }

    return () => clearTimeout(timer);
  }, [displayedText, isTyping, currentTextIndex]);

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {/* First Section: Introduction */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto px-4 py-20">
        {" "}
        {/* Adjusted top margin */}
        {/* Left Section */}
        <motion.div
          className="text-center md:text-left mb-12 md:mb-0 flex-1"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Hi, I'm <span className="text-blue-400">Pranav</span>
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            I am a{" "}
            <span className="text-blue-400 font-semibold">{displayedText}</span>
          </p>
          <p className="text-lg md:text-xl mb-6">
            Passionate about creating innovative solutions and bringing ideas to
            life.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Lying, of course. I use ChatGPT.
          </p>
        </motion.div>
        {/* Right Section with Illustration */}
        <motion.div
          className="flex flex-col items-center flex-1" // Increased top margin for the cat image
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={homeImage}
            alt="Illustration of a person working on a computer"
            className="w-64 md:w-80 h-auto mt-4"
          />
          <p className="text-lg text-center mt-4 font-light">Yep, that's me</p>
        </motion.div>
      </div>

      {/* Second Section: Terminal and Social Icons */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl mx-auto px-4 py-10">
        {/* Left Section: Terminal */}
        <div className="flex-1 w-full">
          <Terminalcomp autoFocus={false} className="w-full" />{" "}
          {/* Added w-full to ensure it spans the width */}
        </div>

        {/* Right Section: Social Icons */}
        <motion.div
          className="flex flex-row md:flex-col items-center justify-center space-x-6 md:space-x-0 md:space-y-6 mt-12 md:mt-0 flex-1"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <a
            href="https://github.com/Pranav322"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-4xl hover:text-blue-400 transition-colors" />
          </a>
          <a
            href="https://linkedin.com/in/pranawww"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-4xl hover:text-blue-400 transition-colors" />
          </a>
          <a
            href="https://x.com/_pranav69"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-4xl hover:text-blue-400 transition-colors" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
