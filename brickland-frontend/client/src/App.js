import "./App.css";
import { useState } from "react";
import Navbar from "./component/navbar/Navbar";
import Home from "./component/home/Home";
import Footer from "./component/footer/Footer";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Wishlist from "./component/wishlist/Wishlist";
import City from "./component/search/City";
import Blog from "./component/Blogs/Blog";
import ContactUs from "./component/contact/ContactUs";
import Privacy from "./component/Privacy/Privacy";
import AboutUs from "./component/About/AboutUs";
import Signin from "./component/Admin/Signin";
import CreateListings from "./component/Admin/CreateListings";
import Listing from "./component/Pages/Listing";
import BlogDetails from "./component/Blogs/BlogDetails";
import Testimonial from "./Testimonial/Testimonial";
import Event from "./component/Event/Event";
import Page_404 from "./component/Layout/Page_404";
import Career from "./component/Career/Career";
import ScrollToTop from "./ScrollToTop";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <BrowserRouter>
        <ScrollToTop/>
        <Navbar />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route exact path="/blog" element={<Blog/>} />
          <Route path="/blog/:id" element={<BlogDetails/>} />

          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/event" element={<Event />} />
          <Route path="/testimonial" element={<Testimonial />} />
          <Route path="/search" element={<City />} />
          <Route path="/career" element={<Career/>}/>

          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/admin" element={<Signin setIsLoggedIn={setIsLoggedIn} />}/>
          <Route path="/listings" element={isLoggedIn ? <CreateListings setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/admin" />}/>
          <Route path="/listing/:listingId" element={<Listing />} />
          <Route path="*" element={<Page_404/>}/>

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
