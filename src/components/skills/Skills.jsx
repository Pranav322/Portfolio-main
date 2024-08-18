import React from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaJava, FaNodeJs } from 'react-icons/fa';
import { SiCplusplus, SiDart, SiExpress, SiNextdotjs, SiDjango, SiFlutter, SiMysql, SiPostgresql, SiPrisma } from 'react-icons/si';
import { GiArtificialIntelligence } from 'react-icons/gi'; // Generic AI icon as placeholder
import GitHubCalendar from 'react-github-calendar'; // Import GitHub Calendar component

const skills = [
  { id: 1, name: 'HTML5', icon: <FaHtml5 className="text-4xl text-orange-500" /> },
  { id: 2, name: 'CSS3', icon: <FaCss3Alt className="text-4xl text-blue-400" /> },
  { id: 3, name: 'JavaScript', icon: <FaJs className="text-4xl text-yellow-500" /> },
  { id: 4, name: 'Python', icon: <FaPython className="text-4xl text-yellow-500" /> },
  { id: 5, name: 'C', icon: <SiCplusplus className="text-4xl text-blue-500" /> },
  { id: 6, name: 'C++', icon: <SiCplusplus className="text-4xl text-blue-500" /> },
  { id: 7, name: 'Java', icon: <FaJava className="text-4xl text-red-500" /> },
  { id: 8, name: 'Dart', icon: <SiDart className="text-4xl text-blue-600" /> },
  { id: 9, name: 'Node.js', icon: <FaNodeJs className="text-4xl text-green-500" /> },
  { id: 10, name: 'Express', icon: <SiExpress className="text-4xl text-gray-500" /> },
  { id: 11, name: 'MongoDB', icon: <GiArtificialIntelligence className="text-4xl text-green-800" /> }, // Use MongoDB icon if available
  { id: 12, name: 'Next.js', icon: <SiNextdotjs className="text-4xl text-gray-600" /> },
  { id: 13, name: 'Django', icon: <SiDjango className="text-4xl text-green-600" /> },
  { id: 14, name: 'DRF', icon: <SiDjango className="text-4xl text-blue-600" /> }, // DRF (Django Rest Framework) - Use Django icon
  { id: 15, name: 'React Native', icon: <FaJs className="text-4xl text-blue-400" /> },  // Use React Native icon if available
  { id: 16, name: 'Flutter', icon: <SiFlutter className="text-4xl text-blue-500" /> },
  { id: 17, name: 'MySQL', icon: <SiMysql className="text-4xl text-blue-600" /> },
  { id: 18, name: 'PostgreSQL', icon: <SiPostgresql className="text-4xl text-blue-700" /> },
  { id: 19, name: 'Prisma ORM', icon: <SiPrisma className="text-4xl text-yellow-600" /> }
];

const Skills = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center py-10 px-6 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 opacity-50 z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Skills Section */}
      <section className="w-full max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Professional Skillset
        </motion.h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {skills.map(skill => (
            <motion.div
              key={skill.id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transition-transform transform hover:scale-105"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: skill.id * 0.1 }}
            >
              <div className="mb-4">
                {skill.icon}
              </div>
              <p className="text-xl font-semibold">{skill.name}</p>
            </motion.div>
          ))}
        </div>

        {/* GitHub Calendar */}
        <div className="mt-16">
          <motion.h2
            className="text-3xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            GitHub Activity
          </motion.h2>
          <GitHubCalendar
            username="Pranav322"
            blockSize={15}
            blockMargin={5}
            color="#c4e17f"
            fontSize={16}
            className="mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default Skills;
