import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaFileAlt, FaSearch, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(true);
    }, 3000);

    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(intervalId);
    };
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } }
  };

  const slideFromLeft = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerCards = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center h-screen px-4">
          <motion.div 
            className="w-full max-w-6xl mx-auto text-center"
            variants={slideFromLeft}
          >
            <motion.div 
              className="relative w-10/12 mx-auto mb-12 overflow-hidden shadow-2xl rounded-xl md:w-8/12"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <img
                src="miniproject.jpg"
                alt="Hands joined together in unity"
                className="object-cover w-full transition-transform duration-700 hover:scale-110 h-96"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </motion.div>

            <motion.h1 
              className="mb-6 text-4xl font-black leading-tight text-white md:text-6xl"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { delay: 0.7 } }
              }}
            >
              Break the Silence,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-red-300">
                Secure the Future
              </span>
            </motion.h1>

            <motion.p 
              className="max-w-2xl mx-auto mb-8 text-xl text-gray-200"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { delay: 0.9 } }
              }}
            >
              A safe platform to anonymously report cases of abuse, providing support and transparency throughout the process.
            </motion.p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link to="/abuse-report-form" className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 hover:shadow-xl hover:-translate-y-1">
                Start Your Report
                <FaArrowRight className="ml-2 animate-bounce" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating shapes background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full bg-white/10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, 30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section
        className="py-24 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerCards}
      >
        <div className="max-w-6xl px-4 mx-auto">
          <motion.h2 
            className="mb-16 text-4xl font-bold text-center text-gray-800"
            variants={fadeIn}
          >
            How It Works
          </motion.h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { 
                icon: FaFileAlt, 
                title: "Submit Report", 
                description: "Submit your report anonymously with details like the type of abuse, incident location, and any evidence.",
                color: "blue"
              },
              { 
                icon: FaSearch, 
                title: "Investigation", 
                description: "Authorities review your report, initiate an investigation, and provide regular updates.",
                color: "yellow"
              },
              { 
                icon: FaCheckCircle, 
                title: "Case Resolved", 
                description: "Upon resolution, the case is closed, and you'll receive a notification of the outcome.",
                color: "green"
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                className={`relative p-8 transition-all duration-300 bg-white border rounded-xl hover:shadow-2xl ${
                  index === activeIndex ? 'border-blue-500 shadow-xl' : 'border-gray-200'
                }`}
                variants={cardVariants}
                whileHover={{ y: -10 }}
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${
                  step.color === 'blue' ? 'from-blue-400 to-blue-600' :
                  step.color === 'yellow' ? 'from-yellow-400 to-yellow-600' :
                  'from-green-400 to-green-600'
                }`} />
                
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-br from-gray-50 to-gray-100">
                  <step.icon className={`text-2xl ${
                    step.color === 'blue' ? 'text-blue-500' :
                    step.color === 'yellow' ? 'text-yellow-500' :
                    'text-green-500'
                  }`} />
                </div>

                <h3 className="mb-4 text-xl font-bold text-gray-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-20 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-4xl px-4 mx-auto text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-800">Ready to Report?</h2>
          <p className="mb-8 text-xl text-gray-600">
            Your voice matters. Help us fight abuse by taking the first step.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/abuse-report-form" className="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl">
              Report Now
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Alert */}
      <AnimatePresence>
        {showAlert && (
          <motion.div
            className="fixed z-50 flex items-center p-4 space-x-4 bg-white border-l-4 border-blue-500 rounded-lg shadow-2xl bottom-4 right-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
              <FaCheckCircle className="text-2xl text-blue-500" />
            </div>
            <div>
              <h4 className="mb-1 text-lg font-semibold text-gray-800">Speak Without Fear</h4>
              <p className="text-sm text-gray-600">
                Raise your voice, break the silence, and stand strong against injustice — your courage can create change.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;