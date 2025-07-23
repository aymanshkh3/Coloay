// src/components/Header/Header.jsx

import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { motion } from "framer-motion";

const navVariant = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function Header() {
  const [activeLink, setActiveLink] = useState("About");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const correspondingLink = document.querySelector(
            `.${styles.navLinks} a[href="#${entry.target.id}"]`
          );
          if (correspondingLink) {
            setActiveLink(correspondingLink.textContent);
          }
        }
      });
    };

    const observerOptions = {
      rootMargin: "-40% 0px -60% 0px",
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <motion.header
      className={styles.header}
      initial="hidden"
      animate="visible"
      variants={navVariant}
    >
      <nav className={styles.nav}>
        <div className={styles.navSection}>
          <motion.div
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Coloay
          </motion.div>
        </div>

        <div className={`${styles.navSection} ${styles.navCenter}`}>
          <ul className={styles.navLinks}>
            {["About", "Services", "Contact"].map((link) => (
              <motion.li key={link} whileHover={{ scale: 1.05 }}>
                <motion.a
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setActiveLink(link)}
                  style={{
                    position: "relative",
                    color: activeLink === link ? "#fff" : "#aaa",
                  }}
                  whileHover={{ color: "#fff" }}
                >
                  {link}
                  {activeLink === link && (
                    <motion.span
                      layoutId="underline"
                      style={{
                        position: "absolute",
                        left: 0,
                        bottom: -4,
                        height: 2,
                        width: "100%",
                        backgroundColor: "#fff",
                        borderRadius: 4,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className={`${styles.navSection} ${styles.navRight}`}>
          <motion.a
            href="#contact"
            className={styles.demoBtn}
            whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            Book a Demo
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}

export default Header;
