// src/components/Footer/Footer.jsx

import React from "react";
// Import icons for social media links
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        {/* Column 1: Logo and Brand */}
        <div className={styles.footerColumn}>
          <h3 className={styles.logo}>Coloay</h3>
          <p className={styles.tagline}>
            We build innovative, high-performance websites with modern design
            and seamless functionality, helping clients shape the future of the
            web.
          </p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>Navigate</h4>
          <ul className={styles.footerLinks}>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className={styles.footerColumn}>
          <h4 className={styles.columnTitle}>Connect</h4>
          <div className={styles.socialIcons}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar for copyright */}
      <div className={styles.footerBottom}>
        <div className="container">
          <p>&copy; 2025 Coloay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
