// src/components/Contact/Contact.jsx

import React, { useState, useEffect, useRef } from "react";
// Import icons from react-icons
import { FiUser, FiMail, FiMessageSquare, FiSend } from "react-icons/fi";
import styles from "./Contact.module.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  // State for the custom notification
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    isError: false,
  });

  const sectionRef = useRef(null);

  // Scroll animation effect
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  // Hides the notification after 3 seconds
  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: "", isError: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setNotification({
        show: true,
        message: "Please fill in all fields!",
        isError: true,
      });
      return;
    }
    // Success notification
    setNotification({
      show: true,
      message: "Thanks for reaching out! We'll be in touch soon.",
      isError: false,
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section className={styles.contactSection} id="contact">
      {/* Conditionally render the notification */}
      {notification.show && (
        <div
          className={`${styles.notification} ${
            notification.isError ? styles.error : ""
          }`}
        >
          {notification.message}
        </div>
      )}

      <div ref={sectionRef} className={`container ${styles.scrollAnimate}`}>
        <div className={styles.titleContainer}>
          <h2 className="section-title">Contact Us</h2>
          <p className="section-subtitle">Let's discuss your project.</p>
        </div>

        <div className={styles.formWrapper}>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <FiUser className={styles.inputIcon} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className={styles.inputField}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <FiMail className={styles.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className={styles.inputField}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <FiMessageSquare className={styles.inputIcon} />
              <textarea
                name="message"
                placeholder="Tell us about your project..."
                rows="5"
                className={styles.textareaField}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className={styles.submitBtn}>
              <span>Send Message</span>
              <FiSend />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
