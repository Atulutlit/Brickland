import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import axios from 'axios';
import '../contact/ContactUs.css'
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from "react-icons/fa";
import { PROPERTY_DETAIL, ADD_CALLBACK, PROPERTY_LIST } from "../../constant/Constant";
import { Link } from "react-router-dom";
import Card from "../search/Card";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRupeeSign } from 'react-icons/fa';


export default function Listing() {
  const { listingId } = useParams();

  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();
  const [properties, setProperties] = useState([]);
  const [data, setData] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState();
  const [message, setMessage] = useState('');

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDisplayText = () => {
    if (!listing?.description) {
      return '';
    }

    return showFullDescription ? listing.description : listing.description.slice(0, 1000);
  };


  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const url = `${PROPERTY_DETAIL}/${listingId}`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data.data);
        console.log(data.data, 'data');
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);


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
      toast.success('Message Sent Successfully!!');
      setName(""); setEmail(""); setCity(""); setMobile(""); setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  const fetchProperties = async () => {
    try {
      const url = PROPERTY_LIST;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data, 'data');
      setProperties(data.data);
      setData(data.data.slice(0, 3));

    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };


  useEffect(() => {
    fetchProperties();
  }, []);


  return (
    // new code 
    <>
      <ToastContainer />
      <div className="property-details-area ptb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="property-details-desc">
              <div className="property-details-content">
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-7 col-md-12">
                    <div className="left-content">
                      <div className="title">
                        <h2>{listing?.propertyName}</h2>
                      </div>
                      <span className="address">
                        {listing?.address}
                      </span>
                      <ul className="info-list">
                        <li>
                          <div className="icon">
                            <img
                              src="../bed.svg"
                              alt="bed"
                            />
                          </div>
                          <span>{listing?.bedrooms} Bedroom</span>
                        </li>
                        <li>
                          <div className="icon">
                            <img
                              src="../bathroom.svg"
                              alt="bathroom"
                            />
                          </div>
                          <span>{listing?.bathrooms} Bathroom</span>
                        </li>
                        <li>
                          <div className="icon">
                            <img
                              src="../parking.svg"
                              alt="parking"
                            />
                          </div>
                          <span>{listing?.parking} Parking</span>
                        </li>
                        <li>
                          <div className="icon">
                            <img
                              src="../area.svg"
                              alt="area"
                            />
                          </div>
                          <span>{listing?.area} Area</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-12">
                    <div className="right-content">
                      <div className="price">{listing?.price} Rupee</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="property-details-image">
                <div className="row justify-content-center align-items-center">
                  <div className="col-lg-4 col-md-12">
                    <div className="row justify-content-center">
                      <div className="col-lg-6 col-sm-6">
                        <div className="block-image">
                          <img
                            src={listing?.propertyImg[0]}
                            alt="image"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="block-image">
                          <img
                            src={listing?.propertyImg[0]}
                            alt="image"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="block-image">
                          <img
                            src={listing?.propertyImg[0]}
                            alt="image"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-sm-6">
                        <div className="block-image">
                          <img
                            src={listing?.propertyImg[0]}
                            alt="image"
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-12">
                    <div className="block-image">
                      <img
                        src={listing?.propertyImg[0]}
                        alt="image"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="property-details-inner-content">
                <div className="row justify-content-center">
                  <div className="col-xl-8 col-md-12">
                    <div className="description">
                      <h3>Property Description</h3>
                      <p>
                        {getDisplayText()}
                        {listing?.description && listing.description.length > 1000 && (
                          <span>...</span>
                        )}
                      </p>
                      {listing?.description && listing.description.length > 1000 && (
                        <button onClick={toggleDescription}>
                          {showFullDescription ? 'Show Less' : 'Show More'}
                        </button>
                      )}

                    </div>
                    <div className="overview">
                      <h3>Property Overview</h3>
                      <ul className="overview-list">
                        <li>
                          <img src="../bed2.svg" alt="bed2" />
                          <h4>Bedrooms</h4>
                          <span>{listing?.bedrooms} Bedrooms / {listing?.bathrooms} Guestroom</span>
                        </li>
                        <li>
                          <img src="../bathroom2.svg" alt="bathroom2" />
                          <h4>Bedrooms</h4>
                          <span>{listing?.bedrooms} Bedrooms / 1 Guestroom</span>
                        </li>
                        <li>
                          <img src="../parking2.svg" alt="parking2" />
                          <h4>Parking</h4>
                          <span>Free Parking for 4 Cars</span>
                        </li>
                        <li>
                          <img src="../area2.svg" alt="area2" />
                          <h4>Accommodation</h4>
                          <span>6 Guest / 2980 Sq Ft</span>
                        </li>
                        <li>
                          <img src="../home.svg" alt="home" />
                          <h4>Property Type</h4>
                          <span>Entire Place / Apartment</span>
                        </li>
                      </ul>
                    </div>
                    <div className="features">
                      <h3>Facts And Features</h3>
                      <div className="row justify-content-center">
                        <div className="row">
                          {listing?.features.map((item, key) => {
                            return (
                              <li>
                                <i className="ri-check-double-fill" />
                                {item}
                              </li>
                            )
                          })}

                        </div>
                      </div>
                    </div>
                    <div className="text-xl font-semibold m-1">Related Property</div>
                    <div className="grid grid-cols-3 gap-2">
                      {
                        data.map((property) => (
                          <Link key={property._id} to={`/listing/${property._id}`}>
                            <Card listing={property} key={property._id} />
                          </Link>
                        ))
                      }

                    </div>
                  </div>
                  <div className="col-xl-4 col-md-12">
                    <div className="property-details-sidebar">
                      <div className="booking">
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              type="text"
                              placeholder="Your name"
                              className="form-control"
                              value={name}
                              onChange={(e) => { setName(e.target.value); }}
                            />
                            <div className="icon">
                              <i className="ri-user-3-line" />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Email</label>
                            <input
                              type="text"
                              placeholder="Your email"
                              className="form-control"
                              value={email}
                              onChange={(e) => { setEmail(e.target.value); }}
                            />
                            <div className="icon">
                              <i className="ri-mail-send-line" />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>Phone No</label>
                            <input
                              type="text"
                              placeholder={+12345678}
                              className="form-control"
                              value={mobile}
                              onChange={(e) => { setMobile(e.target.value); }}
                            />
                            <div className="icon">
                              <i className="ri-phone-line" />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>City</label>
                            <input
                              type="text"
                              placeholder={"Your City"}
                              className="form-control"
                              value={city}
                              onChange={(e) => { setCity(e.target.value); }}
                            />
                            <div className="icon">
                              <i className="ri-building-line" />
                            </div>
                          </div>
                          <div className="form-group extra-top">
                            <label>Description</label>
                            <textarea
                              className="form-control"
                              placeholder="I'm interested in this property......."
                              rows={5}
                              defaultValue={""}
                              value={message}
                              onChange={(e) => { setMessage(e.target.value); }}
                            />
                            <div className="icon">
                              <i className="ri-pencil-line" />
                            </div>
                          </div>
                          <button type="submit" className="default-btn">
                            Submit Request
                          </button>
                        </form>
                      </div>
                      <div className="contact-details">
                        <h3>Contact Details</h3>
                        <ul className="list">
                          <li>
                            <span>Email:</span>
                            <a href="mailto:contact@hello.com">contact@hello.com</a>
                          </li>
                          <li>
                            <span>Phone:</span>
                            <a href="tel:01234567890">0123 456 7890</a>
                          </li>
                          <li>
                            <span>Location:</span>
                            New York, USA
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* existing code  */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 px-4 sm:px-6 lg:px-8">
      <div className="mt-10">
        <div className="container mx-auto max-w-[700px]">
          <main className="container">
            {loading && (
              <p className="text-center my-7 text-2xl">Loading...</p>
            )}
            {error && (
              <p className="text-center my-7 text-2xl">
                Something went wrong!
              </p>
            )}
            {listing && !loading && !error && (
              
              <div>
                <Swiper navigation>
                  {listing.imageUrls.map((url) => (
                    <SwiperSlide key={url}>
                      <div
                        className="h-[300px] w-full"
                        style={{
                          background: `url(${url}) center no-repeat`,
                          backgroundSize: "cover",
                        }}
                      ></div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
                  <FaShare
                    className="text-slate-500"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 2000);
                    }}
                  />
                </div>
                {copied && (
                  <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
                    Link copied!
                  </p>
                )}
                <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
                  <p className="text-xl font-semibold">
                    {listing.name} - flats starting from ₹{" "}
                    {listing.offer
                      ? listing.discountPrice.toLocaleString("en-IN")
                      : listing.regularPrice.toLocaleString("en-IN")}
                    {listing.type === "rent" && " / month"}
                  </p>
                  <p className="flex items-center mt-4 gap-2 text-slate-600 text-sm">
                    <FaMapMarkerAlt className="text-green-700" />
                    {listing.address}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                      {listing.type === "rent" ? "For Rent" : "For Sale"}
                    </p>
                    {listing.offer && (
                      <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                       From ₹ {+listing.discountPrice/10000000} Cr
                      </p>
                    )}
                  </div>
                  <p className="text-slate-800">
                    <span className="font-semibold text-black">
                      Description -{" "}
                    </span>
                    {listing.description}
                  </p>
                  <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaBed className="text-lg" />
                      {listing.bedrooms > 1
                        ? `${listing.bedrooms} beds `
                        : `${listing.bedrooms} bed `}
                    </li>
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaBath className="text-lg" />
                      {listing.bathrooms > 1
                        ? `${listing.bathrooms} baths `
                        : `${listing.bathrooms} bath `}
                    </li>
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaParking className="text-lg" />
                      {listing.parking ? "Parking spot" : "No Parking"}
                    </li>
                    <li className="flex items-center gap-1 whitespace-nowrap ">
                      <FaChair className="text-lg" />
                      {listing.furnished ? "Furnished" : "Unfurnished"}
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      <div className="mb-4 mt-10">
        <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 lg:text-left">Pricing Available on Inquiry</h2>
        <div className="bg-slate-900 rounded-lg shadow-lg p-8 max-w-md w-full">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                required="true"
                value={name}
                className="mt-1 block w-full h-8 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                required="true"
                value={email}
                className="mt-1 block w-full h-8 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-300">
                City
              </label>
              <input
                type="text"
                id="city"  
                value={city}
                className="mt-1 block w-full h-8 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-300">
                Mobile
              </label>
              <input
                type="number"
                id="mobile"
                required="true"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="mt-1 block w-full h-8 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                id="description"
                required="true"
                className="mt-1 block w-full h-40 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div className="text-center lg:text-right">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div> */}
    </>
  );

}
