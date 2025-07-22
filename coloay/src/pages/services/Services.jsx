// src/components/Services/Services.jsx

import React, { useEffect, useRef } from "react";
// Import icons for each service
import { FiCode, FiLayout, FiTrendingUp } from "react-icons/fi";
import styles from "./Services.module.css";

function Services() {
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
      { threshold: 0.1 }
    );

    // FIX: Changed sectionref to sectionRef
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      // FIX: Changed sectionref to sectionRef
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.servicesSection} id="services">
      <div ref={sectionRef} className={`container ${styles.scrollAnimate}`}>
        <div className={styles.titleContainer}>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            We offer a complete suite of services to build and grow your online
            presence.
          </p>
        </div>
        <div className={styles.cardsGrid}>
          {/* Card 1 */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <FiCode />
            </div>
            <h3>Custom Website Development</h3>
            <p>
              Pixel-perfect sites tailored to your brand and built using the
              latest web technologies.
            </p>
          </div>
          {/* Card 2 */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <FiLayout />
            </div>
            <h3>UI/UX Design</h3>
            <p>
              Clean, user-centric designs that turn visitors into customers with
              intuitive interfaces.
            </p>
          </div>
          {/* Card 3 */}
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <FiTrendingUp />
            </div>
            <h3>SEO & Optimization</h3>
            <p>
              Speed, structure, and search optimization so your site ranks and
              loads lightning fast.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
