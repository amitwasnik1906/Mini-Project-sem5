import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaFileAlt, FaSearch, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.5 }
    }
  };

  const bounceButton = {
    hover: { scale: 1.1, transition: { yoyo: Infinity } }
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 text-center text-white bg-gradient-to-r from-blue-600 to-indigo-700"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 w-100 mx-auto">
          <motion.img
            src="miniproject.jpg"
            alt="Hands joined together in unity"
            className="object-cover w-full h-64 mb-8 rounded-lg shadow-2xl"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
          <motion.h1 className="mb-4 text-5xl font-bold leading-tight" variants={fadeIn}>
            Break the Silence, Secure the Future
          </motion.h1>
          <motion.p className="mb-8 text-xl" variants={fadeIn}>
            A safe platform to anonymously report cases of abuse, providing support and transparency throughout the process.
          </motion.p>
          <motion.div
            variants={bounceButton}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/abuse-report-form" className="px-8 py-3 font-bold text-blue-600 transition-all bg-white rounded-full shadow-md hover:bg-gray-100 hover:text-blue-700">
              Start Your Report <FaArrowRight className="inline ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-16 text-center bg-white"
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
      >
        <motion.h2 className="mb-8 text-3xl font-bold text-gray-800" variants={fadeIn}>
          How It Works
        </motion.h2>
        <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-3">
          {[
            { icon: FaFileAlt, title: "Submit Report", description: "Submit your report anonymously with details like the type of abuse, incident location, and any evidence." },
            { icon: FaSearch, title: "Investigation", description: "Authorities review your report, initiate an investigation, and provide regular updates." },
            { icon: FaCheckCircle, title: "Case Resolved", description: "Upon resolution, the case is closed, and you'll receive a notification of the outcome." }
          ].map((step, index) => (
            <motion.div
              key={step.title}
              className="flex flex-col items-center p-6 transition-all duration-300 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-200"
              variants={slideUp}
              whileHover={{ scale: 1.05 }}
            >
              <step.icon className={`mb-4 text-4xl ${index === 0 ? 'text-blue-500' : index === 1 ? 'text-yellow-500' : 'text-green-500'}`} />
              <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-12 text-center bg-indigo-100"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h2 className="mb-4 text-2xl font-bold text-indigo-800">Ready to Report?</h2>
        <p className="mb-6 text-lg text-gray-700">
          Your voice matters. Help us fight abuse by taking the first step.
        </p>
        <motion.div
          variants={bounceButton}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/abuse-report-form" className="px-8 py-3 font-bold text-white transition-all bg-indigo-600 rounded-full shadow-md hover:bg-indigo-500">
            Report Now <FaArrowRight className="inline ml-2" />
          </Link>
        </motion.div>
      </motion.section>

      {/* Custom Alert */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            className="fixed w-64 p-4 bg-white border border-gray-300 rounded-lg shadow-lg bottom-4 right-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <h4 className="mb-2 text-lg font-semibold">Speak Without Fear</h4>
            <p className="text-sm text-gray-600">
              
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;