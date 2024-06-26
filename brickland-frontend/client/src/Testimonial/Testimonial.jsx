import React, { useState, useEffect } from 'react'
import team from './../assets/team.jpg'
import axios from 'axios';
import { FAQ, GET_TESTIMONIAL } from '../constant/Constant';
import { Accordion, Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';


const Testimonial = () => {
  const testimonials = [
    {
      src: "https://www.youtube.com/embed/_Ewqnj4MK7w",
      title: "YouTube video player",
      details: "Mr. Tushar Paprikar bought 3 properties with the guidance of Investors Clinic and had an amazing experience."
    },
    {
      src: "https://www.youtube.com/embed/NjI8SDL_9V4",
      title: "YouTube video player",
      details: "Sanjeev K. Khullar, a Delhi based working professional was very worried when his hard earned money was stuck in a project."
    },
    {
      src: "https://www.youtube.com/embed/3KdhMmiWPcU",
      title: "YouTube video player",
      details: "Debjyoti Mal, made an investment in a Project but his money got stuck because neither the construction was beginning nor were responding properly."
    },
    {
      src: "https://www.youtube.com/embed/3KdhMmiWPcU",
      title: "YouTube video player",
      details: "Debjyoti Mal, made an investment in a Project but his money got stuck because neither the construction was beginning nor were responding properly."
    },
    {
      src: "https://www.youtube.com/embed/3KdhMmiWPcU",
      title: "YouTube video player",
      details: "Debjyoti Mal, made an investment in a Project but his money got stuck because neither the construction was beginning nor were responding properly."
    },
    {
      src: "https://www.youtube.com/embed/3KdhMmiWPcU",
      title: "YouTube video player",
      details: "Debjyoti Mal, made an investment in a Project but his money got stuck because neither the construction was beginning nor were responding properly."
    },
    {
      src: "https://www.youtube.com/embed/3KdhMmiWPcU",
      title: "YouTube video player",
      details: "Debjyoti Mal, made an investment in a Project but his money got stuck because neither the construction was beginning nor were responding properly."
    },
    {
      src: "https://www.youtube.com/embed/3KdhMmiWPcU",
      title: "YouTube video player",
      details: "Debjyoti Mal, made an investment in a Project but his money got stuck because neither the construction was beginning nor were responding properly."
    },
    {
      src: "https://www.youtube.com/embed/3KdhMmiWPcU",
      title: "YouTube video player",
      details: "Debjyoti Mal, made an investment in a Project but his money got stuck because neither the construction was beginning nor were responding properly."
    },

  ];

  // Replace with actual paths to avatars or avatar data
  const avatars = [
    { name: 'Mukesh Kumar', title: 'CEO', color: 'blue' },
    { name: 'Krishna Reddy', title: 'Director', color: 'green' },
    { name: 'Pritam Banerjee', title: 'Co-Founder', color: 'red' },
  ];

  const reviews = [
    {
      text: "Working with this real estate agency was a great experience. Their team was knowledgeable and professional, and helped us find our dream home quickly and easily.",
      author: "Mukesh Kumar, CEO",
    },
    {
      text: "I was impressed with this agency's marketing strategy when we were selling our home. They really went above and beyond to showcase my home and attract potential buyers.",
      author: "Krishna Reddy, Director",
    },
    {
      text: "I've been working with this agency for several years now for property management services, and they've been fantastic. They handle everything really well.",
      author: "Pritam Banerjee, Co-Founder",
    }
  ];



  const [testimonial, setTestimonial] = useState([])
  const [faq, setFaq] = useState([]);

  const fetchFaq = async () => {
    try {
      const url = FAQ;
      const response = await axios.get(url);
      console.log(response, 'response');
      setFaq(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetch FAQ:", error);
    }
  };

  const fetchTestimonial = async () => {
    try {
      const url = GET_TESTIMONIAL;
      const response = await axios.get(url);
      console.log(response, 'response');
      setTestimonial(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetch testimonial:", error);
    }
  };

  useEffect(() => {
    fetchFaq();
    fetchTestimonial();
  }, [])
  return (
    <div>
      <section className="space-ptb clearfix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">

              <div className=" text-center text-2xl font-semibold">
                <h2>
                  <span className="line text-2xl font-semibol"></span>
                  Customer's Testimonials
                  <span className="line"></span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {testimonial && testimonial.map((item, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mt-4" key={index}>
                <div className="blog-post">
                  <div className="blog-post-image">
                    <iframe
                      width="100%"
                      height="220"
                      src={item.testimonialImg}
                      title={item.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="testimo">
                    <div className="testimo-details">
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Review */}
      <div className="container mx-auto my-10 px-4">
        <div className="text-center text-2xl mt-5">
          <h2 className="mb-5 font-semibold text-3xl">Customer Review and Feedback</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {
            reviews.map((review, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  className="w-24 h-24 object-cover rounded-full flex text-center justify-center ml-10"
                  src={team}
                  alt="Client 1"
                />
                <div className="z-10 bg-white p-6 rounded-lg shadow-md mt-4 w-full">
                  <p className="text-lg text-gray-700 mb-4">
                    "{review.text}"
                  </p>
                  <p className="text-gray-500 font-semibold">{review.author}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      {/* Our Review End */}

      {/* Frequently asked question */}
      <div className="container mx-auto my-5 px-4">
        <h2 className="text-3xl text-center mb-8 font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {
            faq && faq.map((item, key) => (
              <div key={key} className="p-6 border border-gray-200 rounded-lg bg-white shadow hover:shadow-lg transition-shadow">
                <div className="text-lg font-medium mb-2 flex items-center">
                  <span className="mr-2 text-blue-500">&#x1F4AC;</span> {/* Speech bubble icon */}
                  <span>Question {key + 1}: {item.question}</span>
                </div>
                <div className="text-base text-gray-700 flex items-center">
                  <span className="mr-2 text-green-500">&#x2705;</span> {/* Check mark icon */}
                  <span>Answer: {item.answer}</span>
                </div>
              </div>
            ))
          }
        </div>
      </div>


    </div>
  )
}

export default Testimonial
