import React from 'react';
import { ShoppingBasket, Phone, Mail, MapPin, Clock } from "lucide-react";
import '../components/Footer.css';

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="brand-logo-container">
                            <div className="brand-icon-wrapper">
                                <ShoppingBasket className="brand-icon" />
                            </div>
                            <div>
                                <h1 className="brand-title">RythuBowl</h1>
                                <p className="brand-subtitle">Fresh from Farm to Home</p>
                            </div>
                        </div>
                        <p className="brand-description">
                            Bringing you farm-fresh vegetables, fruits, country meat, fish, eggs, 
                            and healthy fruit bowls directly from trusted farmers and suppliers.  
                            Eat healthy, live better with RythuBowl.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3 className="footer-section-title">Quick Links</h3>
                        <ul className="section-list">
                            <li><a href="/" className="section-link">Home</a></li>
                            <li><a href="/about" className="section-link">About Us</a></li>
                            <li><a href="/shop" className="section-link">Shop Now</a></li>
                            <li><a href="/help" className="section-link">Help & Support</a></li>
                        </ul>
                    </div>

                    {/* For Business */}
                    <div className="footer-section">
                        <h3 className="footer-section-title">For Business</h3>
                        <ul className="section-list">
                            <li><a href="/farmer-partner" className="section-link">Partner as Farmer</a></li>
                            <li><a href="/delivery-agent" className="section-link">Join as Delivery Agent</a></li>
                            <li><a href="/business-support" className="section-link">Business Support</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="footer-section">
                        <h3 className="footer-section-title">Contact Us</h3>
                        <div className="contact-info">
                            <div className="contact-item">
                                <Phone className="contact-icon" />
                                <span className="contact-text">+91 8008072852</span>
                            </div>
                            <div className="contact-item">
                                <Mail className="contact-icon" />
                                <span className="contact-text">support@rythubowl.com</span>
                            </div>
                            <div className="contact-item">
                                <MapPin className="contact-icon" />
                                <span className="contact-text">Delivering across India</span>
                            </div>
                            <div className="contact-item">
                                <Clock className="contact-icon" />
                                <span className="contact-text">7 AM – 10 PM, All Days</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="copyright-text">
                        © 2025 RythuBowl. All rights reserved. | <a href="/privacy" className="footer-legal-link">Privacy Policy</a> | <a href="/terms" className="footer-legal-link">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
