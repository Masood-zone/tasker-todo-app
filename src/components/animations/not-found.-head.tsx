"use client";
import React from "react";
import { motion } from "framer-motion";

const NotFoundHead: React.FC = () => {
  return (
    <motion.div
      animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{ display: "inline-block" }}
      className="text-4xl"
    >
      <span role="img" aria-label="disagreeing head">
        🙂‍↕️
      </span>
    </motion.div>
  );
};

export default NotFoundHead;
