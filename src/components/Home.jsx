import React from 'react';
import Header from '../components/Header';
import '../components/Home.css';
import Footer from '../components/Footer';
import {
  ShoppingBasket,
  Clock,
  Shield,
  Star,
  Apple,
  MapPin,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const HomePage = () => {
  const [pnr, setPnr] = useState('');
  const navigate = useNavigate();

  const features = [
    {
      icon: Apple,
      title: 'Farm Fresh',
      description:
        'Handpicked vegetables, fruits, and organic produce directly from local farmers',
    },
    {
      icon: Clock,
      title: 'Quick Delivery',
      description: 'Get your essentials delivered to your doorstep in no time',
    },
    {
      icon: Shield,
      title: 'Safe & Hygienic',
      description:
        'Fresh meat, fish, and eggs packed with proper hygiene and care',
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description:
        'Every product is checked and curated to maintain the highest quality standards',
    },
  ];

  const testimonials = [
    {
      name: 'Ramesh Naik',
      route: 'Banganapalle, Andhra Pradesh',
      rating: 5,
      comment:
        'Known for its premium Banginapalli mangoes with rich flavor and aroma.',
    },
    {
      name: 'Savita Reddy',
      route: 'Nalgonda, Telangana',
      rating: 5,
      comment:
        'Free-range country chickens raised without antibiotics or hormones.',
    },
    {
      name: 'Manoj Kumar',
      route: 'Warangal, Telangana',
      rating: 4,
      comment:
        'Fresh leafy greens and seasonal vegetables grown using natural compost.',
    },
  ];

  return (
    <div className="home-page">
      <Header />
      <section className="hero-section">
        <div className="gradient-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div className="bus-icon-container">
              <Card className="bus-icon-card">
                <ShoppingBasket className="bus-icon" />
              </Card>
            </div>

            <h1 className="hero-title">
              <span className="hero-title-main">Farm Fresh</span>
              <span className="hero-title-accent">Delivered To Your Home</span>
            </h1>

            <p className="hero-description">
              Experience freshness like never before! Get vegetables, fruits,
              country chicken, goat meat, fish, eggs, and fruit bowls delivered
              straight to your doorstep from trusted local farmers and
              suppliers.
            </p>

            <div className="hero-actions">
              <button
                className="btn home-order-pnr-button"
                onClick={() => navigate('/product')}
              >
                <span>Shop Now</span>
                <div className="btn-shine"></div>
              </button>
              <button
                className="btn btn-secondary btn-hero"
                onClick={() => navigate('/about')}
              >
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose RythuBowl?</h2>
            <p className="section-description">
              We bring nature’s best harvest to your kitchen with convenience
              and care
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="feature-card">
                  <Card.Body className="text-center">
                    <div className="feature-icon-container">
                      <Icon className="feature-icon" />
                    </div>
                    <Card.Title className="feature-title">
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="feature-description">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Getting fresh produce is just a few steps away
            </p>
          </div>

          <div className="steps-container">
            <div className="steps-grid">
              {[
                {
                  step: '1',
                  title: 'Browse Products',
                  desc: 'Choose from vegetables, fruits, meat, fish, eggs, and more',
                },
                {
                  step: '2',
                  title: 'Place Order',
                  desc: 'Add your favorites to cart and checkout easily',
                },
                {
                  step: '3',
                  title: 'Home Delivery',
                  desc: 'Fresh and hygienic items delivered to your doorstep',
                },
              ].map((item, index) => (
                <div key={index} className="step-item">
                  <div className="step-number">{item.step}</div>
                  <h3 className="step-title">{item.title}</h3>
                  <p className="step-description">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Proud Farmers</h2>
            <p className="section-description">
              See what farmers love about RythuBowl
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="testimonial-card">
                <Card.Body>
                  <div className="rating-container">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`star-icon ${i < testimonial.rating ? 'filled' : 'empty'}`}
                      />
                    ))}
                  </div>
                  <Card.Text className="testimonial-text">
                    "{testimonial.comment}"
                  </Card.Text>
                  <div>
                    <Card.Title className="testimonial-name">
                      {testimonial.name}
                    </Card.Title>
                    <div className="testimonial-route">
                      <MapPin className="route-icon" />
                      {testimonial.route}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;
