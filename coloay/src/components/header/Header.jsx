// src/components/Header/Header.jsx

import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";

function Header() {
  // State to keep track of the active link
  const [activeLink, setActiveLink] = useState("About");

  // This effect handles updating the active link based on scroll position
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
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Left Section */}
        <div className={styles.navSection}>
          <div className={styles.logo}>Coloay</div>
        </div>

        {/* Center Section */}
        <div className={`${styles.navSection} ${styles.navCenter}`}>
          <ul className={styles.navLinks}>
            <li>
              <a
                href="#about"
                className={activeLink === "About" ? styles.active : ""}
                // Add onClick to update state immediately
                onClick={() => setActiveLink("About")}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className={activeLink === "Services" ? styles.active : ""}
                // Add onClick to update state immediately
                onClick={() => setActiveLink("Services")}
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeLink === "Contact" ? styles.active : ""}
                // Add onClick to update state immediately
                onClick={() => setActiveLink("Contact")}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section */}
        <div className={`${styles.navSection} ${styles.navRight}`}>
          <a href="#contact" className={styles.demoBtn}>
            Book a Demo
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
