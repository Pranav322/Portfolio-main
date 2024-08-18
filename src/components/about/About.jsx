import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center py-10 px-6 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-50 z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* About Section */}
      <section className="w-full max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-light text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Know Who I Am
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Hi Everyone, I am <span className="text-blue-400 font-semibold">Pranav</span> from Bihar, India. I am currently pursuing my B.E. in Computer Science from Chandigarh University (yes, I regret it too).
        </motion.p>

        <motion.p
          className="text-xl md:text-2xl mb-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Apart from coding, some other activities that I love to do include:
        </motion.p>

        <motion.ul
          className="list-disc list-inside text-lg md:text-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <li>Playing Games</li>
          <li>Reading Books (one in two months)</li>
          <li>Learning New Technologies</li>
        </motion.ul>
      </section>
    </div>
  );
};

export default About;
