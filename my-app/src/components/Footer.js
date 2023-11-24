import React from 'react';
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div  class="p-3 mb-2 bg-dark text-white">
      <div className="row gy-4">
      <div className="col-lg-5 col-md-12 footer-info">
        <a href="" className="logo d-flex align-items-center">
          <span>Health Unity</span>
        </a>
        <p>Health Unity offers numerous strategic business opportunities within the healthcare sector. It enhances patient care and outcomes, streamlines prescription fulfillment, and ensures robust data security through blockchain technology. Additional prospects include interoperability services, consulting, data analytics, market expansion, patient engagement solutions, compliance auditing, and telehealth integration. </p>
        {/* <div className="social-links d-flex mt-4">
          <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
          <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
          <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
          <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
        </div> */}
      </div>

      <div className="col-lg-2 col-6 footer-links">
        <h4>Useful Links</h4>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About us</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Terms of service</a></li>
          <li><a href="#">Privacy policy</a></li>
        </ul>
      </div>

      {/* <div className="col-lg-2 col-6 footer-links">
        <h4>Our Services</h4>
        <ul>
          <li><a href="#">Web Design</a></li>
          <li><a href="#">Web Development</a></li>
          <li><a href="#">Product Management</a></li>
          <li><a href="#">Marketing</a></li>
          <li><a href="#">Graphic Design</a></li>
        </ul>
      </div> */}

      <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
        <h4>Contact Us</h4>
        <p>
          A108 Adam Street <br />
          New York, NY 535022<br />
          United States <br /><br />
          <strong>Phone:</strong> +1 5589 55488 55<br />
          <strong>Email:</strong> info@example.com<br />
        </p>
      </div>
    </div>
      </div>

      
    </footer>
  );
};

export default Footer;
