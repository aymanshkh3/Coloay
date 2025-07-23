// src/components/About/About.jsx

import React from "react";
import styles from "./About.module.css";
import { motion } from "framer-motion";

const containerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function About() {
  return (
    <motion.section
      className={styles.aboutSection}
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariant}
    >
      <div className="container">
        <motion.div className={styles.titleContainer} variants={cardVariant}>
          <h2 className={styles.title}>About Us</h2>
          <p className="section-subtitle">
            We're a full-stack agency delivering blazing-fast and beautiful websites.
          </p>
        </motion.div>

        <motion.div className={styles.contentContainer} variants={cardVariant}>
          <p className={styles.description}>
            At Coloay, we specialize in crafting scalable, secure, and stunning websites
            tailored to your exact needs. Whether it’s a sleek frontend or a complete backend
            system, our team ensures every project is executed with speed, style, and success.
          </p>
        </motion.div>

        <motion.div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "60%",
            height: "60%",
            background:
              "radial-gradient(circle, rgba(156, 131, 255, 0.1), transparent 70%)",
            filter: "blur(100px)",
            zIndex: 0,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
    </motion.section>
  );
}

export default About;
