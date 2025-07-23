import React from "react";
import { FiCode, FiLayout, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";
import styles from "./Services.module.css";

const containerVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

function Services() {
  return (
    <motion.section
      className={styles.servicesSection}
      id="services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariant}
    >
      <div className={`container`}>
        <motion.div className={styles.titleContainer}>
          <motion.h2 className={styles.title} variants={cardVariant}>
            Our Services
          </motion.h2>
          <motion.p className="styles.subtitle" variants={cardVariant}>
            We offer a complete suite of services to build and grow your online
            presence.
          </motion.p>
        </motion.div>

        <motion.div className={styles.cardsGrid}>
          <motion.div className={styles.card} variants={cardVariant}>
            <div className={styles.cardIcon}>
              <FiCode />
            </div>
            <h3>Custom Website Development</h3>
            <p>
              Pixel-perfect sites tailored to your brand and built using the
              latest web technologies.
            </p>
          </motion.div>

          <motion.div className={styles.card} variants={cardVariant}>
            <div className={styles.cardIcon}>
              <FiLayout />
            </div>
            <h3>UI/UX Design</h3>
            <p>
              Clean, user-centric designs that turn visitors into customers with
              intuitive interfaces.
            </p>
          </motion.div>

          <motion.div className={styles.card} variants={cardVariant}>
            <div className={styles.cardIcon}>
              <FiTrendingUp />
            </div>
            <h3>SEO & Optimization</h3>
            <p>
              Speed, structure, and search optimization so your site ranks and
              loads lightning fast.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Services;
