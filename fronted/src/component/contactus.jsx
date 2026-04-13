import { useState } from 'react';
import './contactus.css';
import axios from '../utility/axiosinstance';

function Contactus() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add your API endpoint here
      let { data } = await axios.post("/user/contact",formData);
      console.log('Form submitted:', formData);
      setSubmitted(true);

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setSubmitted(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contactus-container">
      <div className="contactus-wrapper">
        {/* Header Section */}
        <div className="contactus-header">
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Send us a message!</p>
        </div>

        <div className="contactus-content">
          {/* Contact Information */}
          <div className="contact-info">
            <div className="info-box">
              <div className="info-icon">📍</div>
              <h3>Address</h3>
              <p>123 Business Street<br />City, State 12345</p>
            </div>

            <div className="info-box">
              <div className="info-icon">📞</div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>

            <div className="info-box">
              <div className="info-icon">✉️</div>
              <h3>Email</h3>
              <p>support@example.com</p>
            </div>

            <div className="info-box">
              <div className="info-icon">⏰</div>
              <h3>Hours</h3>
              <p>Mon - Fri: 9AM - 6PM<br />Sat - Sun: 10AM - 4PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            {submitted && (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <p>Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactus;