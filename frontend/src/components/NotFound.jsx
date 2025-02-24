import React from 'react';
// import { Button } from '../ui'; // Import shadcn/ui button
import { motion } from 'framer-motion'; // For animations
import { Search } from 'lucide-react'; // For search icon
import { Button } from './ui/button';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4"
    >
      {/* Illustration */}
      <motion.img
        src="https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg?w=826&t=st=1709721603~exp=1709722203~hmac=7c1e1b0c7c8b8e8b8e8b8e8b8e8b8e8b8e8b8e8b8e8b8e8b8e8b8e8b8e8b8e8b8" // Fun 404 illustration
        alt="404 Illustration"
        className="w-64 h-64 mb-8"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />

      {/* Heading */}
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>

    

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
        <Button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
          onClick={() => (window.location.href = '/')}
        >
          Go Home
        </Button>
      </div>
    </motion.div>
  );
};

export default NotFound;