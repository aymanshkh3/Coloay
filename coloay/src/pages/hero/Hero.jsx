// src/components/Hero/Hero.jsx

import React from "react";
import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.heroContent}>
        <h1>
          We Build{" "}
          <span className={styles.gradientText}>Modern Websites</span> That
          Convert
        </h1>
        <p>
          End-to-end design and development services for fast-growing
          businesses.
        </p>
        <a href="#contact" className={styles.heroCta}>
          Let’s Get Started
        </a>
      </div>
    </section>
  );
}

export default Hero;
