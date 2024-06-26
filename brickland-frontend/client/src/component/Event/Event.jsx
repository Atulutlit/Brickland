import React, { useState, useEffect } from 'react'
import { EVENT_LIST } from '../../constant/Constant';
import axios from 'axios';

const Event = () => {
  const blogPosts = [
    {
      videoSrc: "https://www.youtube.com/embed/sJox3eID3fU",
      title: "Republic Day Celebration at EON",
      description: "EON Site Office, Sec-140A, Noida Expressway. Republic Day Spirit and the Special Showcase of Retail Spaces & Lockable IT Offices at the Prime Location of Noida.",
      date: "26 Jan 2022",
      location: "Sector 140A, Noida Expressway"
    },
    {
      videoSrc: "https://www.youtube.com/embed/XGrP3Vn1fL8",
      title: "THE RECREATIONAL RHYTHM at EON Sec-140A, Noida - Christmas 2021",
      description: "FAIRFOX presents 'THE RECREATIONAL RHYTHM' exclusively marketed by INVESTORS CLINIC. A musical event held on the occasion of Christmas, at EON Site Office, Sector-140A, Noida Expressway.",
      date: "25 Dec 2021",
      location: "Sector-140A, Noida"
    },
    {
      videoSrc: "https://www.youtube.com/embed/XGrP3Vn1fL8",
      title: "THE RECREATIONAL RHYTHM at EON Sec-140A, Noida - Christmas 2021",
      description: "FAIRFOX presents 'THE RECREATIONAL RHYTHM' exclusively marketed by INVESTORS CLINIC. A musical event held on the occasion of Christmas, at EON Site Office, Sector-140A, Noida Expressway.",
      date: "25 Dec 2021",
      location: "Sector-140A, Noida"
    },
    {
      videoSrc: "https://www.youtube.com/embed/XGrP3Vn1fL8",
      title: "THE RECREATIONAL RHYTHM at EON Sec-140A, Noida - Christmas 2021",
      description: "FAIRFOX presents 'THE RECREATIONAL RHYTHM' exclusively marketed by INVESTORS CLINIC. A musical event held on the occasion of Christmas, at EON Site Office, Sector-140A, Noida Expressway.",
      date: "25 Dec 2021",
      location: "Sector-140A, Noida"
    },

  ];
  const sidebarWidgets = [
    {
      title: "Search",
      type: "search",
      action: "https://investorsclinic.in/events/search",
      token: "3eHVJ8VaY709cmOGHbuhyer5HqXsTffu9kJd77kV"
    },
    {
      title: "Categories",
      type: "categories",
      items: [
        {
          className: "instagram",
          label: "Delhi NCR",
          href: "https://investorsclinic.in/events/search/Delhi NCR",
          iconClass: ""
        },
        {
          className: "instagram",
          label: "Gurugram",
          href: "https://investorsclinic.in/events/search/Gurugram",
          iconClass: "",
          style: { marginLeft: 15 }
        },
        {
          className: "instagram",
          label: "Noida",
          href: "https://investorsclinic.in/events/search/Noida",
          iconClass: "",
          style: { marginLeft: 15 }
        }
      ]
    },
    {
      title: "Subscribe & Follow",
      type: "follow",
      items: [
        {
          className: "facebook",
          label: "Facebook",
          href: "facebook link ",
          iconClass: "ri-facebook-fill me-3",
          followHref: "facebook link ",
          followLabel: "Like"

        },
        {
          className: "twitter",
          label: "Twitter",
          href: "twitter link here",
          iconClass: "ri-twitter-x-line me-3",
          followHref: "twitter link here",
          followLabel: "Follow"
        },
        {
          className: "youtube",
          label: "YouTube",
          href: "youtube link here ",
          iconClass: "ri-youtube-line me-3",
          followHref: "youtube link here ",
          followLabel: "Subscribe"
        },
        {
          className: "instagram",
          label: "Instagram",
          href: "instagram here",
          iconClass: "ri-instagram-fill me-3",
          followHref: "instagram here",
          followLabel: "Follow"
        },
        {
          className: "linkedIn",
          label: "LinkedIn",
          href: "linked in link here",
          iconClass: "ri-linkedin-fill me-3",
          followHref: "linked in link here",
          followLabel: "Follow"
        }
      ]
    }
  ];
  const [data, setData] = useState([])
  const [searchInput, setSearchInput] = useState("");
  const [eventList, setEventList] = useState([])
  const fetchEvent = async () => {
    try {
      const url = EVENT_LIST;
      const response = await axios.get(url);
      console.log(response, 'response');
      setEventList(response.data.data);
      setData(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetch testimonial:", error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [])



  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchInput, 'search input')
    if (!searchInput) {
      eventList.length > 0 && setData(eventList);
    } else {
      const lowerCaseQuery = searchInput.toLowerCase();
      const filteredItems = eventList.filter(item =>
        Object.keys(item).some(key =>
          item[key] && item[key].toString().toLowerCase().includes(lowerCaseQuery)
        )
      );
      setData(filteredItems);
    }
  };

  return (
    <div>
      <section className="">
        <h1 style={{ display: "none" }}>
          Find the best property by Investors Clinic
        </h1>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-title">Events</div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
              {data.map((post, index) => (
                <div className="blog-post mt-5" key={index}>
                  <div className="blog-post-image">
                    <iframe
                      width={"100%"}
                      height={429}
                      src={post?.link?.length > 0 && post?.link[0]}
                      title={post.title}
                      frameBorder={0}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen=""
                    />
                  </div>
                  <div className="blog-post-content">
                    <div className="blog-post-details">
                      <div className="blog-post-title">
                        <h5>{post?.title}</h5>
                      </div>
                      <div className="blog-post-description">
                        <p className="mb-0" />
                        <p>{post?.description}</p>
                        {/* You can add more paragraphs here if needed */}
                        <p />
                      </div>
                    </div>
                    <div className="blog-post-footer">
                      <div className="blog-post-time">
                        <i className="far fa-clock" />
                        {post.date}
                      </div>
                      <div className="blog-post-author">
                        <span>Location At <strong>{post.location}</strong></span>
                      </div>
                    </div>
                  </div>
                  <div className='grid grid-cols-5 gap-4'>
                    {
                      post.link.slice(0, 4).map((item, key) => {
                        return (
                          <div className="blog-post-image">
                            <iframe
                              width={"100%"}
                              height={49}
                              src={post?.link?.length > 0 && post?.link[0]}
                              title={post.title}
                              frameBorder={0}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen=""
                            />
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              ))}
              <div className="row">
                <div className="col-lg-12 col-md-12 py-5">
                  <div className="pagination-area">
                    <div className="nav-links">
                      <a href="#" className="prev page-numbers">
                        <i className="ri-arrow-left-s-line" />
                      </a>
                      <span className="page-numbers current">1</span>
                      <a href="#" className="page-numbers">
                        2
                      </a>
                      <a href="#" className="page-numbers">
                        3
                      </a>
                      <a href="#" className="next page-numbers">
                        <i className="ri-arrow-right-s-line" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-lg-4 mt-4 mt-lg-0 py-4">
              <div className="blog-sidebar property-details-sidebar">
                {sidebarWidgets.map((widget, index) => (
                  <div className="widget mt-4" key={index}>
                    <div className="widget-title">
                      <h6>{widget.title}</h6>
                    </div>
                    {widget.type === "search" ? (
                      <form className="max-w-md mx-auto">
                        <label
                          htmlFor="default-search"
                          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                        >
                          Search
                        </label>
                        <div className="relative">

                          <input
                            type="search"
                            id="default-search"
                            className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search ..."
                            required=""
                            value={searchInput}
                            onChange={(e) => { setSearchInput(e.target.value); }}
                          />
                          <button
                            type="submit"
                            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={handleSearch}
                          >
                            Search
                          </button>
                        </div>
                      </form>

                    ) : (
                      <ul className="list-unstyled list-style mb-0 ">
                        {widget.items.map((item, idx) => (
                          <li key={idx} className={`${item.className} d-flex justify-between`} >
                            <a className="text-uppercase" href={item.href} target="_blank">
                              <i className={item.iconClass} />
                              {item.label}
                            </a>
                            <a className="text-uppercase" href={item.href} target="_blank" >
                              {item.followLabel}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

export default Event
