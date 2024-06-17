import React from 'react'
import team from './../assets/team.jpg'

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
  return (
    <div>
      <section className="space-ptb clearfix">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              {/* Our Review */}
              <div className="text-center text-2xl mt-5">
                <h2 className=" mb-5 font-bold text-4xl">Customer Review and Feedback</h2>
              </div>
              <div className="col-lg-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="justify-center">
                    <img
                      className="w-24 h-24 object-cover rounded-full flex text-center justify-center ml-10"
                      src={team}
                      alt="Client 1"
                    />
                    <div className="z-10 bg-white p-8 rounded-lg shadow-md">
                      <p className="text-lg text-gray-700 mb-4">
                        "Working with this real estate agency was a great
                        experience. Their team was knowledgeable and professional,
                        and helped us find our dream home quickly and easily."
                      </p>
                      <p className="text-gray-500">Mukesh Kumar, CEO</p>
                    </div>
                  </div>
                  <div className=" justify-center">
                    <img
                      className="w-24 h-24 object-cover rounded-full flex text-center justify-center ml-10"
                      src={team}
                      alt="Client 1"
                    />
                    <div className="z-10 bg-white p-8 rounded-lg shadow-md">
                      <p className="text-lg text-gray-700 mb-4">
                        "I was impressed with this agency's marketing strategy when
                        we were selling our home. They really went above and beyond
                        to showcase my home and attract potential buyers."
                      </p>
                      <p className="text-gray-500">Krishna Reddy, Director</p>
                    </div>
                  </div>
                  <div className="justify-center">
                    <img
                      className="w-24 h-24 object-cover rounded-full flex text-center justify-center ml-10"
                      src={team}
                      alt="Client 1"
                    />
                    <div className="z-10 bg-white p-8 rounded-lg shadow-md">
                      <p className="text-lg text-gray-700 mb-4">
                        "I've been working with this agency for several years now
                        for property management services, and they've been
                        fantastic. They handle everything really well."
                      </p>
                      <p className="text-gray-500">
                        Pritam Banerjee, Co-Founder
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Our Review End */}
              <div className="section-title text-center">
                <h2>
                  <span className="line"></span>
                  Customer's Testimonials
                  <span className="line"></span>
                </h2>
              </div>
            </div>
          </div>
          <div className="row">
            {testimonials.map((testimonial, index) => (
              <div className="col-lg-4 col-md-6 col-sm-12 mt-4" key={index}>
                <div className="blog-post">
                  <div className="blog-post-image">
                    <iframe
                      width="100%"
                      height="220"
                      src={testimonial.src}
                      title={testimonial.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="testimo">
                    <div className="testimo-details">
                      {testimonial.details}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Testimonial
