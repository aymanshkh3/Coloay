// src/components/Hero/Hero.jsx

import React, { useEffect, useRef } from "react";
import Typed from "typed.js"; // 1. Import Typed.js
import { motion } from "framer-motion";
import styles from "./Hero.module.css";

// --- Framer Motion Variants ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

function Hero() {
  // 2. Create a ref for the element where the typing animation will occur
  const typedEl = useRef(null);

  // 3. Use useEffect to initialize and clean up Typed.js
  useEffect(() => {
    const options = {
      strings: [
        "Dynamic Apps",
        "Stunning Designs",
        "Powerful Solutions",
        "Modern Websites",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      showCursor: false,
    };

    // Initialize Typed.js on the ref's current element
    const typed = new Typed(typedEl.current, options);

    // 4. Cleanup function to destroy the Typed instance when the component unmounts
    return () => {
      typed.destroy();
    };
  }, []); // Empty array ensures this runs only once on mount

  return (
    <section className={styles.hero} id="home">
      <motion.div
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.h1 variants={itemVariants}>
          We Build
          <br />
          {/* 5. Attach the ref to the span */}
          <span className={styles.gradientText} ref={typedEl}></span>
          <br />
          {/* That Convert */}
        </motion.h1>

        <motion.p variants={itemVariants}>
          That convert end-to-end design and development services for <br/>fast-growing
          businesses.
        </motion.p>

        <motion.a
          href="#contact"
          className={styles.heroCta}
          variants={itemVariants}
          whileHover={{
            scale: 1.05,
            boxShadow: "0px 8px 25px rgba(255, 255, 255, 0.2)",
            transition: { type: "spring", stiffness: 300, damping: 15 },
          }}
          whileTap={{ scale: 0.95 }}
        >
          Let’s Get Started
        </motion.a>
      </motion.div>
    </section>
  );
}

export default Hero;
