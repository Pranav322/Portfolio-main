import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

const ContactForm = () => {
  const [state, handleSubmit] = useForm("manwjdgr");

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center py-10 px-6 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-500 to-blue-600 opacity-50 z-[-1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
      />

      {/* Contact Form Section */}
      <section className="w-full max-w-4xl mx-auto px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Wanna Get in Touch?
        </motion.h1>

        {state.succeeded ? (
          <motion.p
            className="text-2xl text-center text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Thanks for your message! I'll get back to you soon.
          </motion.p>
        ) : (
          <motion.form
            className="bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 gap-6 mb-6">
              <label className="block">
                <span className="text-gray-300">Name</span>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                />
              </label>
              <label className="block">
                <span className="text-gray-300">Email</span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your.email@example.com"
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />
              </label>
              <label className="block">
                <span className="text-gray-300">Message</span>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-700 bg-gray-900 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="5"
                  placeholder="Your message here..."
                ></textarea>
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />
              </label>
            </div>
            <button
              type="submit"
              disabled={state.submitting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send Message
            </button>
          </motion.form>
        )}
        <p className="text-center text-gray-400 mt-4">
          Or email me directly at{' '}
          <a href="mailto:duckieduckk@duck.com" className="text-blue-400 hover:underline">
            duckieduckk@duck.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default ContactForm;
