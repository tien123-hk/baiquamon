import React from "react";
import '../CSS/Bot.css';
import { useState, useEffect } from 'react';
import Ins1 from '../assets/anh/ins1.jpg'
import Ins2 from '../assets/anh/ins2.jpg'
import Ins3 from '../assets/anh/ins3.jpg'
import Ins4 from '../assets/anh/ins4.jpg'
import Ins5 from '../assets/anh/ins5.jpg'
import Ins6 from '../assets/anh/ins6.jpg'
import Ins7 from '../assets/anh/ins7.jpg'
import Ins8 from '../assets/anh/ins8.jpg'
import Ins9 from '../assets/anh/ins9.jpg'
import Gallery8 from '../assets/anh/gallery8.jpg'
import Gallery11 from '../assets/anh/gallery11.jpg'
import Gallery12 from '../assets/anh/gallery12.jpg'
import Anh15 from '../assets/anh/15.jpg'
import Blog1 from '../assets/anh/blog1.jpg'
import Blog2 from '../assets/anh/blog2.jpg'
import Fb from '../assets/anh/fb.png'
import Insk from '../assets/anh/insk.png'
import Tw from '../assets/anh/twitter.png'

const Bot = () => {
  const images = [
    Ins1, Ins2, Ins3, Ins4, Ins5, Ins6, Ins7, Ins8, Ins9, Gallery11, Gallery12, Gallery8, Anh15, Blog1, Blog2
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const imagesPerPage = 5; // Hiển thị 5 ảnh mỗi lần

  const nextGroup = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + imagesPerPage >= images.length ? 0 : prevIndex + imagesPerPage
    );
  };

  const prevGroup = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - imagesPerPage < 0 ? images.length - imagesPerPage : prevIndex - imagesPerPage
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextGroup();
    }, 3000); // Chuyển đổi tự động sau 3 giây
    return () => clearInterval(interval); // Xóa interval khi component unmount
  }, []);

  return (
    <div className="bot" >
      <div className="image-container">
        {images
          .slice(currentIndex, currentIndex + imagesPerPage)
          .map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className="image"
            />
          ))}
      </div>
      <div className="controls">
        <button onClick={prevGroup}>⬅</button>
        <button onClick={nextGroup}>➡</button>
      </div>




      <footer>
        <div className="footer-main">
          <div className="container8">
            <div className="row8">
              <div className="c8">
                <div className="footer-top-box">
                  <h3>Business Time</h3>
                  <ul className="list-time">
                    <li>Monday - Friday: 08.00am to 05.00pm</li>
                    <li>Saturday: 10.00am to 08.00pm</li>
                    <li>
                      Sunday: <span>Closed</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="c8">
                <div className="footer-top-box">
                  <h3>Newsletter</h3>
                  <form className="newsletter-box">
                    <div className="form-group">
                      <input type="email" name="Email" placeholder="Email Address*" />
                      <i className="fa fa-envelope"></i>
                    </div>
                    <button className="btnhvr-hover3" type="submit">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
              <div className="c8">
                <div className="footer-top-box">
                  <h3>Social Media</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <ul>
                    <li>
                      <img src={Fb} />


                    </li>
                    <li>
                      <img src={Insk} />


                    </li>
                    <li>
                      <img src={Tw} />


                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
            <div className="row9">
              <div className="c9">
                <div className="footer-widget">
                  <h4>About HusGarden</h4>
                  <p>A store that brings good quality products to everyone</p>
                </div>
              </div>
              <div className="c9">
                <div className="footer-link">
                  <h4>Information</h4>
                  <ul>
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Customer Service</a>
                    </li>
                    <li>
                      <a href="#">Our Sitemap</a>
                    </li>
                    <li>
                      <a href="#">Terms &amp; Conditions</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                    <li>
                      <a href="#">Delivery Information</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="c9">
                <div className="footer-link-contact">
                  <h4>Contact Us</h4>
                  <ul>
                    <li>
                      <p>
                        <i className="fas fa-map-marker-alt"></i>Address: Ngõ 184, Hoa Bằng, Cầu Giấy, Hà Nội
                      </p>
                    </li>
                    <li>
                      <p>
                        <i className="fas fa-phone-square"></i>Phone:{" "}
                        <a href="tel:+84582158476">+84 582158476</a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <i className="fas fa-envelope"></i>Email:{" "}
                        <a href="mailto:tiennguyen151003@gmail.com">tiennguyen151003@gmail.com</a>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </div>





  );
};

export default Bot;
