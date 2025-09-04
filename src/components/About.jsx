import React from 'react';
import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Leaf, ShoppingBasket, Users, Truck } from 'lucide-react';
import '../components/About.css';
import Aboutimg from '../assets/About-img.png';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <div className="about-page">
      <Header />

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-container">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="about-hero-title"
          >
            About <span>RythuBowl</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="about-hero-subtitle"
          >
            We connect local farmers and trusted suppliers with families,
            bringing farm-fresh vegetables, fruits, country meat, fish, and eggs
            straight to your doorstep.
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-mission">
        <div className="about-mission-container">
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={Aboutimg}
              alt="Organic farming"
              className="about-mission-image"
            />
          </motion.div>
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="about-mission-content"
          >
            <h2 className="about-mission-title">Our Mission</h2>
            <p className="about-mission-text">
              At RythuBowl, we believe in making healthy living simple and
              accessible. Our mission is to deliver fresh, hygienic, and natural
              produce directly from farms to homes, supporting local farmers and
              ensuring quality for every family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-values">
        <div className="about-values-container">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="about-values-title"
          >
            Our Values
          </motion.h2>

          <div className="about-values-grid">
            {[
              {
                icon: Leaf,
                title: 'Sustainability',
                desc: 'We prioritize eco-friendly farming and packaging.',
              },
              {
                icon: ShoppingBasket,
                title: 'Quality First',
                desc: 'Only the freshest produce makes it to your basket.',
              },
              {
                icon: Users,
                title: 'Farmer Support',
                desc: 'Empowering local farmers by connecting them directly to customers.',
              },
              {
                icon: Truck,
                title: 'On-Time Delivery',
                desc: 'Fast and hygienic delivery to your doorstep.',
              },
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2, duration: 0.6 }}
                  className="about-value-card"
                >
                  <div className="about-value-icon">
                    <Icon className="value-icon" />
                  </div>
                  <h3 className="about-value-title">{value.title}</h3>
                  <p className="about-value-desc">{value.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section className="about-cta">
        <div className="about-cta-container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="about-cta-title"
          >
            Join the <span>Fresh Revolution</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="about-cta-text"
          >
            Experience the taste of freshness delivered to your home. Together,
            let's build a healthier tomorrow with RythuBowl.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = '/product')}
            className="about-cta-button"
          >
            Shop Now
          </motion.button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
