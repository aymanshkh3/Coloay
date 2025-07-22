// src/components/About/About.jsx

import React from "react";
import styles from "./About.module.css";
import { motion } from "framer-motion";

const containerVariant = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      when: "beforeChildren",
      staggerChildren: 0.08, // Faster stagger
    },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const wordAnimation = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03, // Faster word reveal
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const About = () => {
  const titleWords = "About Us".split(" ");

  return (
    <motion.section
      className={styles.aboutSection}
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariant}
    >
      <motion.div className="container">
        <motion.h2 className={styles.title}>
          {titleWords.map((word, index) => (
            <motion.span
              key={index}
              custom={index}
              variants={wordAnimation}
              style={{ display: "inline-block", marginRight: "8px" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p className={styles.subtitle} variants={textVariant}>
          We’re a full-stack web agency creating high-performing websites.
        </motion.p>

        <motion.p className={styles.description} variants={textVariant}>
          At Coloay, we specialize in delivering top-notch websites that blend
          modern aesthetics with blazing speed. From startups to enterprise
          businesses, we serve all with scalable, reliable, and beautifully
          crafted websites.
        </motion.p>

        {/* Parallax-like background animation */}
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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
};

export default About;
