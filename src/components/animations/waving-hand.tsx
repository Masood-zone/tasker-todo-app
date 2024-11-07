"use client";
import { motion } from "framer-motion";

const WavingHand = () => {
  return (
    <motion.div
      animate={{ rotate: [0, 20, -20, 20, -20, 0] }}
      transition={{ duration: 2, repeat: 2000 }}
      style={{ display: "inline-block" }}
    >
      👋
    </motion.div>
  );
};

export default WavingHand;
