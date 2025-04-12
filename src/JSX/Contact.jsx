import React, { useState, useEffect } from "react";
import axios from "axios";
import "../CSS/Contact.css";

const Contact = () => {
  const [user, setUser] = useState(null);
  // Thêm vào phần state ban đầu
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    rating: 5, // Thêm rating mặc định
    reviewType: 'contact' // Thêm loại đánh giá
  });

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    if (loggedInUser) {
      setUser(loggedInUser);
      setFormData(prev => ({
        ...prev,
        name: loggedInUser.fullName,
        email: loggedInUser.email
      }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };



  // Sửa lại handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8086/BE/contact', {
        ...formData,
        rating: parseInt(formData.rating)
      });
      if (response.data) {
        alert('Thank you for your feedback!');
        setFormData({
          ...formData,
          subject: '',
          message: '',
          rating: 5,
          reviewType: 'contact'
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send feedback. Please try again.');
    }
  };

  return (
    <div className="contactus">
      <div className="all-title-box">
        <div className="container10">
          <div className="row10">
            <div className="c10">
              <h2>CONTACT US</h2>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">SHOP</a>
                </li>
                <li className="breadcrumb-itemactive">/ CONTACT US</li>
              </ul>
            </div>
          </div>
        </div>
      </div>






      <div className="contact-box-main">
        <div className="containercontact">
          <div className="contactformright">
            <h2>GET IN TOUCH</h2>
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                   
                    <div className="rating-select">
                      <select
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
                        <option value="4">⭐⭐⭐⭐ Very Good</option>
                        <option value="3">⭐⭐⭐ Good</option>
                        <option value="2">⭐⭐ Fair</option>
                        <option value="1">⭐ Poor</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                   
                    <select
                      name="reviewType"
                      value={formData.reviewType}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="contact">General Contact</option>
                      <option value="product">Product Review</option>
                      <option value="service">Service Review</option>
                      <option value="suggestion">Suggestion</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your Message"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <div className="submitmess">
                    <button onClick={handleSubmit} className="submit123" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="contact-info-left">
            <h2>CONTACT INFO</h2>
            <ul>
              <li>
                <p>
                  Address: ngõ 184, Hoa Bằng, Cầu Giấy, Hà Nội
                </p>
              </li>
              <li>
                <p>
                  Phone:+84 582158476
                </p>
              </li>
              <li>
                <p>
                  Email:tiennguyen151003@gmail.com

                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>




    </div>
  );
};

export default Contact;