import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ContactUs.css";
import { ADD_CALLBACK, GET_CONTACT_INFO } from "../../constant/Constant";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  function validateForm(name, email, city, mobile, comment) {
    const errors = {};

    // Name validation
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return { "status": false, "errors": 'Name is required and must be a non-empty string.' }
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      return { "status": false, "errors": 'A valid email address is required.' }
    }

    // City validation
    if (!city || typeof city !== 'string' || city.trim() === '') {
      return { "status": false, "errors": 'City is required and must be a non-empty string.' }
    }

    // Mobile validation
    const mobilePattern = /^\d{10}$/;
    if (!mobile || !mobilePattern.test(mobile)) {
      return { "status": false, "errors": 'A valid 10-digit mobile number is required.' }
    }

    // Comment validation
    if (!comment || typeof comment !== 'string' || comment.trim() === '') {
      return { "status": false, "errors": 'Comment is required and must be a non-empty string.' }
    }

    return { "status": true, "errors": "" }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = ADD_CALLBACK;
      const response = validateForm(name, email, city, mobile, message)
      if (!response.status) {
        toast.warn(response.errors);
        return;
      }
      await axios.post(url, { name, email, city, mobile, comment: message, });
      toast.success('Message Sent Successfully!!')
      setName(""); setEmail(""); setCity(""); setMobile(""); setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  const [contactInfo, setContactInfo] = useState(null);

  const fetchContactInfo = async (e) => {
    try {
      const url = GET_CONTACT_INFO;
      const response = await axios.get(url);
      console.log(response, 'response');
      setContactInfo(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetch contactInformation:", error);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, [])

  return (
    <>
      <ToastContainer />
      {/* new data  */}
      <div className="contact-area ptb-120">

        <div className="container">
          <div
            className="row justify-content-center"
          >
            <div
              className="col-lg-4 col-md-5"

            >
              <div className="contact-info-box">
                <div className="box">
                  <div className="icon">
                    <i className="ri-map-pin-line" />
                  </div>
                  <div className="info">
                    <h4>Our Location</h4>
                    <span>
                      {contactInfo?.address}</span>
                  </div>
                </div>
                <div className="box">
                  <div className="icon">
                    <i className="ri-phone-line" />
                  </div>
                  <div className="info">
                    <h4>Phone Number</h4>
                    <span>
                      <a href="tel:8869003900">+{contactInfo?.countryCode}&nbsp;{contactInfo?.contactInformation}</a>
                    </span>
                    <span>
                      <a href="tel:8869003900">+91 {contactInfo?.mobile}</a>
                    </span>
                  </div>
                </div>
                <div className="box">
                  <div className="icon">
                    <i className="ri-mail-send-line" />
                  </div>
                  <div className="info">
                    <h4>Our Email</h4>
                    <span>
                      <a href="mailto:info@bricklandindia.com">
                        {contactInfo?.email}
                      </a>
                    </span>
                    <span>
                      <a href="mailto:info@bricklandindia.com">info@bricklandindia.com</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-8 col-md-7"
              data-cue="slideInUp"
              data-show="true"

            >
              <div className="contact-wrap-form">
                <h3>Get In Touch</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      value={name}
                      required="true"
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div className="icon">
                      <i className="ri-user-3-line" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email address"
                      required="true"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="icon">
                      <i className="ri-mail-line" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Your Phone</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter your phone"
                      name="IN"
                      required="true"
                      title="Enter a valid number"
                      pattern="[1-9]{1}[0-9]{9}"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                    <div className="icon">
                      <i className="ri-phone-line" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Your City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                    <div className="icon">
                      <i className="ri-building-line" />
                    </div>
                  </div>
                  <div className="form-group extra-top">
                    <label>Your Message</label>
                    <textarea
                      className="form-control"
                      placeholder="Your message here"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="icon">
                      <i className="ri-message-2-line" />
                    </div>
                  </div>
                  <div className="contact-btn">
                    <button type="submit" className="default-btn">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* old-data  */}

      <div className="flex flex-col md:flex-row">
        <div className="investors-clinic-info md:w-1/2 md:mr-10">
          <h2>BRICKLAND CONSULTING AT A GLANCE</h2>
          <p>
            Brickland Consulting, A Certified Real Estate Company is a Paramount
            in the real estate realm with an Experience of 10+ years. Brickland
            Consulting has managed to Build Stronger Connections in the
            Industry.
          </p>
          <p>
            We specialise in proffering Proficient Consultation Services
            Professionally & Independently to Investors World widely.
          </p>
          <p>
            Brickland Consulting is committed to offer Advanced and New-Fangled
            approach with Technical Strategies to help out Our Customers with
            Satisfactory Investments. Today Investors Clinic stands tall with
            1.5 Lacs Customers and 100+ Leading Developers with whom we have
            reached Bigger Milestones of Success.
          </p>
        </div>
        <div
          className="relative md:w-1/2 mt-5 md:mt-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <a
              href="https://maps.app.goo.gl/s7FzrkiF3j2kmGa1A"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg md:text-xl"
            >
              Open Map
            </a>
          )}
          <img
            src="https://firebasestorage.googleapis.com/v0/b/brickland-76c23.appspot.com/o/map.png?alt=media&token=abf06135-c351-4249-a8a2-564f01749d07"
            alt="Map Image"
            className="w-full h-auto"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ContactForm;
