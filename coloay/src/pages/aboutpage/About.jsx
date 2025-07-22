// src/components/About/About.jsx

import React, { useEffect, useRef } from "react";
import styles from "./About.module.css";

function About() {
  const sectionRef = useRef(null);

  // Updated scroll animation effect using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.2 } // Animation triggers when 20% of the section is visible
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.aboutSection} ${styles.scrollAnimate}`}
      id="about"
    >
      <div className="container">
        <h2 className={styles.title}>About Us</h2>
        <p className={styles.subtitle}>
          We’re a full-stack web agency creating high-performing websites.
        </p>
        <p className={styles.description}>
          At Coloay, we specialize in delivering top-notch websites that blend
          modern aesthetics with blazing speed. From startups to enterprise
          businesses, we serve all with scalable, reliable, and beautifully
          crafted websites.
        </p>
      </div>
    </section>
  );
}

export default About;
