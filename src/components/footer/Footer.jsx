import React from "react";
import { FiGithub, FiTwitter, FiLinkedin } from "react-icons/fi";
import styles from "./Footer.module.css";
import { motion } from "framer-motion";

const containerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Footer() {
  return (
    <motion.footer
      className={styles.footer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariant}
    >
      <div className={`container ${styles.footerGrid}`}>
        <motion.div className={styles.footerColumn} variants={itemVariant}>
          <h3 className={styles.logo}>Coloay</h3>
          <p className={styles.tagline}>
            We build innovative, <br />
            high-performance websites with modern design and seamless functionality,
            helping clients shape the future of the web.
          </p>
        </motion.div>

        <motion.div className={styles.footerColumn} variants={itemVariant}>
          <h4 className={styles.columnTitle}>Navigate</h4>
          <ul className={styles.footerLinks}>
            {["About", "Services", "Contact"].map((link) => (
              <motion.li key={link} whileHover={{ scale: 1.05 }}>
                <motion.a
                  href={`#${link.toLowerCase()}`}
                  whileHover={{ color: "#fff" }}
                  style={{ color: "#aaa", position: "relative" }}
                >
                  {link}
                  <motion.span
                    style={{
                      position: "absolute",
                      left: 0,
                      bottom: -2,
                      height: 2,
                      width: "0%",
                      backgroundColor: "#fff",
                      borderRadius: 4,
                    }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div className={styles.footerColumn} variants={itemVariant}>
          <h4 className={styles.columnTitle}>Connect</h4>
          <div className={styles.socialIcons}>
            {[
              { icon: <FiGithub />, link: "https://github.com" },
              { icon: <FiTwitter />, link: "https://twitter.com" },
              { icon: <FiLinkedin />, link: "https://linkedin.com" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div className={styles.footerBottom} variants={itemVariant}>
        <div className="container">
          <p>&copy; 2025 Coloay. All rights reserved.</p>
        </div>
      </motion.div>
    </motion.footer>
  );
}

export default Footer;
