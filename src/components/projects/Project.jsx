import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'TeamFinder',
    description: 'Find teammates for projects or projects for yourself seamlessly.',
    image: 'https://via.placeholder.com/400x200?text=TeamFinder',
    repoLink: 'https://github.com/pranav322/teamfinder',
    livePreview: '#',
    tech: ['Next.js', 'NextAuth', 'Prisma'],
  },
  {
    id: 2,
    title: 'Spotify-Telegram-Bot',
    description: 'Listen, pause, play songs on your Spotify through a Telegram bot.',
    image: 'https://via.placeholder.com/400x200?text=Spotify-Telegram-Bot',
    repoLink: 'https://github.com/pranav322/spotify-telegram-bot',
    livePreview: '#',
    tech: ['Python', 'SpotifyAPI'],
  },
  {
    id: 3,
    title: 'Cricket-Telegram-Bot',
    description: 'Get cricket scores and more through a Telegram bot with web scraping.',
    image: 'https://via.placeholder.com/400x200?text=Cricket-Telegram-Bot',
    repoLink: 'https://github.com/pranav322/cricbot',
    livePreview: '#',
    tech: ['Python', 'Selenium'],
  },
  {
    id: 4,
    title: 'ElecTrade',
    description: 'Trade electricity seamlessly with our blockchain-integrated app.',
    image: 'https://via.placeholder.com/400x200?text=ElecTrade',
    repoLink: 'https://github.com/pranav322/ElecTrade',
    livePreview: '#',
    tech: ['React Native', 'Blockchain'],
  },
  {
    id: 5,
    title: 'QuizApp',
    description: 'A quiz app created using Flutter and Firebase.',
    image: 'https://via.placeholder.com/400x200?text=QuizApp',
    repoLink: 'https://github.com/pranav322/quizapp',
    livePreview: '#',
    tech: ['Flutter', 'Firebase'],
  }
];

const Projects = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen py-10 px-6 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-500 to-yellow-600 opacity-50 z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Projects Section */}
      <section className="w-full max-w-6xl mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          My Projects
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <motion.div
              key={project.id}
              className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: project.id * 0.1 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover group-hover:opacity-50 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Repository
                </a>
                {project.livePreview && (
                  <a
                    href={project.livePreview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Live Preview
                  </a>
                )}
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-400 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span key={index} className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Projects;
