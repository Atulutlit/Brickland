import React from "react";
import "swiper/css/bundle";
import { blogItem } from "../../assets/items";
import { Link } from "react-router-dom";

export default function Blog() {
    return (
    <div className="blog-area ptb-120">
      <div className="container">
        <div className="row justify-content-center">
        {blogItem.map(post => (
            <div className="col-xl-4 col-md-6" key={post.id}>
              <div className="blog-card">
                <div className="blog-image">
                  <Link to={`/blog/${post.id}`}>
                    <img src={post.imageUrl} alt="Blog post" />
                  </Link>
                  <Link to={`/blog/${post.id}`} className="tag-btn">Real Estate</Link>
                  <Link to={`/blog/${post.id}`} className="author-btn">
                    <img src={post.authorImageUrl} alt="Author" />
                  </Link>
                </div>
                <div className="blog-content">
                  <ul className="meta">
                    <li><i className="ri-calendar-2-line" />{post.date}</li>
                  </ul>
                  <h3>
                    <Link to={`/blog/${post.id}`}>{post.blog_title}</Link>
                  </h3>
                  <p>{post.short_para}</p>
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
