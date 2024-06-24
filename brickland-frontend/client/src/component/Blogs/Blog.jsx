import React,{useState,useEffect} from "react";
import "swiper/css/bundle";
import { blogItem } from "../../assets/items";
import { Link } from "react-router-dom";
import { BLOG_LIST } from "../../constant/Constant";

export default function Blog() {
  
  const [blog,setBlog]=useState([])
  const fetchBlog = async () => {
    try {
      const url = BLOG_LIST;
      // const url = 'https://brickland-backend-4.onrender.com/api/data/'
      const response = await fetch(url);
      const data = await response.json();
      console.log(data,'data')
      setBlog(data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };
  useEffect(()=>{
   fetchBlog();
  },[])
  
    return (
    <div className="blog-area ptb-120">
      <div className="container">
        <div className="row justify-content-center">
        {blog.map(post => (
            <div className="col-xl-4 col-md-6" key={post.id}>
              <div className="blog-card">
                <div className="blog-image">
                  <Link to={`/blog/${post._id}`}>
                    <img src={post.mainImg} alt="Blog post" />
                  </Link>
                  <Link to={`/blog/${post._id}`} className="tag-btn">Real Estate</Link>
                  <Link to={`/blog/${post._id}`} className="author-btn">
                    <img src={post.authorImg} alt="Author" />
                  </Link>
                </div>
                <div className="blog-content">
                  <ul className="meta">
                    <li><i className="ri-calendar-2-line" />{post?.createdAt?.slice(0,12)}</li>
                  </ul>
                  <h3>
                    <Link to={`/blog/${post?._id}`}>{post?.blogTitle}</Link>
                  </h3>
                  <p>{post?.conclusionInner}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="col-lg-12 col-md-12">
            <div className="pagination-area">
              <div className="nav-links">
                <a href="#" className="prev page-numbers">
                  <i className="ri-arrow-left-s-line" />
                </a>
                <span className="page-numbers current">1</span>
                <a href="#" className="page-numbers">2</a>
                <a href="#" className="page-numbers">3</a>
                <a href="#" className="next page-numbers">
                  <i className="ri-arrow-right-s-line" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
