// src/components/Contact/Contact.jsx

import React, { useState, useEffect } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMessageSquare,
  FiSend,
} from "react-icons/fi";
import styles from "./Contact.module.css";
import { motion, AnimatePresence } from "framer-motion";
import validator from "validator";
import emailjs from "@emailjs/browser";

const formVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const fieldVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const shakeVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.6 },
  },
};

const isValidPhone = (phone) => {
  if (!phone) return true;
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    isError: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: "", isError: false });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.name || !formData.email || !formData.message) {
      setNotification({
        show: true,
        message: "Please fill in all required fields!",
        isError: true,
      });
      setIsSubmitting(false);
      return;
    }

    if (!validator.isEmail(formData.email)) {
      setNotification({
        show: true,
        message: "Please enter a valid email address!",
        isError: true,
      });
      setIsSubmitting(false);
      return;
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      setNotification({
        show: true,
        message: "Phone number must be exactly 10 digits!",
        isError: true,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const combinedMessage = formData.phone
        ? `Phone: ${formData.phone}\n\nMessage: ${formData.message}`
        : formData.message;

      const result = await emailjs.send(
        "service_c3sk3c1", // Your EmailJS Service ID
        "template_yhsh3no", // Your EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          message: combinedMessage,
        },
        "gKbFEQhoxU7VWoXg-" // Your EmailJS Public Key
      );

      if (result.status === 200) {
        setNotification({
          show: true,
          message: "Your message has been sent successfully!",
          isError: false,
        });
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setNotification({
          show: true,
          message: "An error occurred while sending your message.",
          isError: true,
        });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      setNotification({
        show: true,
        message: "A network error occurred. Please try again.",
        isError: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.section
      className={styles.contactSection}
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={formVariant}
    >
      <AnimatePresence>
        {notification.show && (
          <motion.div
            className={`${styles.notification} ${
              notification.isError ? styles.error : ""
            }`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={
              notification.isError
                ? shakeVariant
                : {
                    hidden: { opacity: 0, y: -20 },
                    visible: { opacity: 1, y: 0 },
                  }
            }
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container">
        <motion.div className={styles.titleContainer} variants={fieldVariant}>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Let's discuss your project.</p>
        </motion.div>

        <motion.div className={styles.formWrapper} variants={fieldVariant}>
          <motion.form
            className={styles.contactForm}
            onSubmit={handleSubmit}
            variants={formVariant}
          >
            <motion.div className={styles.inputGroup} variants={fieldVariant}>
              <FiUser className={styles.inputIcon} />
              <input
                type="text"
                name="name"
                placeholder="Full Name (Required)"
                className={styles.inputField}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div className={styles.inputGroup} variants={fieldVariant}>
              <FiMail className={styles.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="Email Address (Required)"
                className={styles.inputField}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div className={styles.inputGroup} variants={fieldVariant}>
              <FiPhone className={styles.inputIcon} />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (Optional - 10 digits)"
                className={styles.inputField}
                value={formData.phone}
                onChange={handleChange}
              />
            </motion.div>

            <motion.div className={styles.inputGroup} variants={fieldVariant}>
              <FiMessageSquare className={styles.inputIcon} />
              <textarea
                name="message"
                placeholder="Tell us about your project... (Required)"
                rows="5"
                className={styles.textareaField}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.button
              type="submit"
              className={styles.submitBtn}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 25px rgba(113, 77, 255, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              variants={fieldVariant}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              <FiSend />
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;
