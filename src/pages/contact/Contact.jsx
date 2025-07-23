import React, { useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiSend,
} from "react-icons/fi";
import styles from "./Contact.module.css";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import validator from "validator";

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Contact = () => {
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "user_phone") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { user_name, user_email, user_phone, message } = formData;

    if (!user_name || !user_email || !message) {
      return showNotification("Name, email, and message are required", "error");
    }

    if (!validator.isEmail(user_email)) {
      return showNotification("Enter a valid email", "error");
    }

    if (user_phone && user_phone.length !== 10) {
      return showNotification(
        "Phone number must be exactly 10 digits",
        "error"
      );
    }

    const combinedMessage = user_phone
      ? `Phone: ${user_phone}\n\nMessage: ${message}`
      : message;

    const emailParams = {
      name: user_name,
      email: user_email,
      message: combinedMessage,
    };

    emailjs
      .send(
        "service_c3sk3c1",
        "template_cg3b99k",
        emailParams,
        "gKbFEQhoxU7VWoXg-"
      )
      .then(() => {
        showNotification("Message sent successfully", "success");
        setFormData({
          user_name: "",
          user_email: "",
          user_phone: "",
          message: "",
        });
      })
      .catch(() => {
        showNotification("Something went wrong", "error");
      });
  };

  return (
    <motion.section
      id="contact"
      className={styles.contactSection}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariant}
    >
      <motion.h2 className={styles.title} variants={itemVariant}>
        Contact Us
      </motion.h2>

      <motion.div className={styles.formWrapper} variants={itemVariant}>
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              className={styles.inputField}
              type="text"
              name="user_name"
              placeholder="Your Name"
              value={formData.user_name}
              onChange={handleChange}
            />
            <FiUser className={styles.inputIcon} />
          </div>

          <div className={styles.inputGroup}>
            <input
              className={styles.inputField}
              type="email"
              name="user_email"
              placeholder="Your Email"
              value={formData.user_email}
              onChange={handleChange}
            />
            <FiMail className={styles.inputIcon} />
          </div>

          <div className={styles.inputGroup}>
            <input
              className={styles.inputField}
              type="text"
              name="user_phone"
              placeholder="Your Phone Number (optional)"
              value={formData.user_phone}
              onChange={handleChange}
            />
            <FiPhone className={styles.inputIcon} />
          </div>

          <div className={styles.inputGroup}>
            <textarea
              className={styles.textareaField}
              name="message"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            <FiMessageSquare className={styles.inputIcon} />
          </div>

          <button type="submit" className={styles.submitBtn}>
            <FiSend /> Send Message
          </button>
        </form>
      </motion.div>

      {notification.message && (
        <div
          className={`${styles.notification} ${
            notification.type === "error" ? styles.error : ""
          }`}
        >
          {notification.message}
        </div>
      )}
    </motion.section>
  );
};

export default Contact;
