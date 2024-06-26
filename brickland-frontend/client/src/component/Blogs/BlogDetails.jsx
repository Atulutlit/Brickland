import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import { blogItem } from '../../assets/items';
import { Link } from 'react-router-dom';
import { BLOG_DETAIL,BLOG_LIST,ADD_COMMENT,GET_CONTACT_INFO } from '../../constant/Constant';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import avatar from './../../assets/avatar.webp'


const BlogDetails = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const [post,setPost]=useState(null);
  const [blog,setBlog]=useState([]);

  // comment
  const [name,setName]=useState("");
  const [message,setMessage]=useState("");

  const handleSubmit= async(e) => {
    e.preventDefault();
    try {
      const url = `${ADD_COMMENT}/${id}`;
      if(name=="")
      {
        toast.warn("Enter the Name");
        return;
      }else if(message==""){
        toast.warn("Enter the message");
        return;
      }
      const data ={"name":name,"message":message};
      const response = await axios.post(url,data);
      console.log(response,'data comment added successfully')
      toast.success("comment added successfully!!");
      fetchBlog();
    } catch (error) {
      toast.error("Try Again Later");
      console.error('Error fetching properties:', error);
    }

  }
  const [comments,setComments]=useState([])
  const fetchBlog = async () => {
    try {
      const url = BLOG_LIST;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data,'data')
      setBlog(data.data);
    
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(()=>{
  },[])

  
  const fetchBlogDetail=async()=>{
    try {
      const url = `${BLOG_DETAIL}/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data,'data')
      setComments(data.data['comments']);
      data.data['comments']=[]
      setPost(data?.data);
      console.log(data?.data,'blog detail')
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  }

  useEffect(()=>{
    fetchBlog();
    fetchBlogDetail();
  },[])

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
    <ToastContainer/>
    <div>
      <div className="blog-details-area ptb-120">
        <div className="container">
          <div className="blog-details-desc" >
            <div className="article-content">
              <div className="image">
                <img src={post?.mainImg} alt="Main" />
              </div>
              <div className="contentss">
                <p className="tag-btn">
                  {post?.tag.map((item,key)=>{
                    return(
                      <div className='' key={key}>
                        {item}
                      </div>
                    )
                  })}
                </p>
                <ul className="meta">
                  <li>
                    <div className="info">
                      <img src={post?.authorImg} alt="Author" />
                      <span>By <a>Admin</a></span>
                    </div>
                  </li>
                  <li>
                    <i className="ri-calendar-2-line" />
                    {post?.createdAt}
                  </li>
                  <li>
                    <i className="ri-message-2-line" />
                    {post?.comments} Comments
                  </li>
                  <li>
                    <i className="ri-message-2-line" />
                    {post?.author} 
                  </li>
                </ul>
                <h2>
                  {post?.blogTitle}
                </h2>
                <p>
                  {post?.content}
                </p>
              </div>
            </div>
              <div className="article-inner-content">
              {post?.features.map((feature, index) => (
                <div className="item" key={index}>
                  <h4 className="fs-4 fw-bold my-3">{feature?.title}</h4>
                  <p>{feature?.paragraph}</p>
                </div>
              ))}
              </div>

            <div
              className="article-block"
            >
              <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6">
                  <div className="block-image">
                    <img src={post?.relatedImg1} alt="image" />
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="block-image">
                    <img src={post?.relatedImg2} alt="image" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="article-inner-content"
            >
              <div className="item">
                <h4 className='fs-4 fw-bold'>{post?.conclusionTitle}</h4>
                <p>
                 {post?.conclusionInner}
                </p>
              </div>
            </div>



            <div
              className="article-footer">
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-7 col-md-7">
                  <ul className="tags">
                    <li>
                      <span>Tags:</span>
                    </li>
                    <li>
                      <a>{post?.tag}</a>
                    </li>
                    
                  </ul>
                </div>
                <div className="col-lg-5 col-md-5">
                  <ul className="social">
                    <li>
                      <span>Social Share:</span>
                    </li>
                    <li>
                      <a href={contactInfo?.facebookLink} target="_blank">
                        <i className="ri-facebook-fill" />
                      </a>
                      <a href={contactInfo?.twitterLink}  target="_blank">
                        <i className="ri-twitter-fill" />
                      </a>
                      <a href={contactInfo?.instagramLink}  target="_blank">
                        <i className="ri-instagram-line" />
                      </a>
                      <a href={contactInfo?.linkedInLink}  target="_blank">
                        <i className="ri-youtube-fill" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="article-comment">
              <h3>Comment ({comments?.length})</h3>
              {comments && comments?.map((item,key)=>{
                return(
                <div className="comment-list">
                <img class="avatar-img" src={avatar} alt="avatar"/>
                <h4>{item?.name}</h4>
                <span>{item?.createdAt.slice(0,10)}</span>
                <p>
                 {item?.message}
                </p>
              </div>
                )
              })}
              
              
            </div>
            <div className="article-reply">
              <h3>Leave A Comment</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value);}}
                  />
                  <div className="icon">
                    <i className="ri-user-3-line" />
                  </div>
                </div>
             
                <div className="form-group extra-top">
                  <label>Your Message</label>
                  <textarea
                    className="form-control"
                    placeholder="Your comment here"
                    value={message}
                    onChange={(e)=>{setMessage(e.target.value);}}
                  />
                  <div className="icon">
                    <i className="ri-message-2-line" />
                  </div>
                </div>
                <button type="submit" className="default-btn cursor-pointer">
                  Post A Comment
                </button>
              </form>
            </div>
            {/* -------------related blog--------------------- */}
            <div className=''>Related Blog</div>

            <div className='grid grid-cols-3 row justify-center'>
            {blog.map(post => (
            <div className="w-full" key={post._id}>
              <div className="blog-card">
                <div className="blog-image">
                  <Link to={`/blog/${post?._id}`}>
                    <img src={post.mainImg} alt="Blog post" />
                  </Link>
                  <Link to={`/blog/${post._id}`} className="tag-btn">Real Estate</Link>
                  <Link to={`/blog/${post._id}`} className="author-btn">
                    <img src={post.authorImg} alt="Author" />
                  </Link>
                </div>
                <div className="blog-content">
                  <ul className="meta">
                    <li><i className="ri-calendar-2-line" />{post?.blogTitle}</li>
                  </ul>
                  <h3>
                    {/* <Link to={`/blog/${post.id}`}>{post.blog_title}</Link> */}
                  </h3>
                  {/* <p className='text-sm'>{post.short_para}</p> */}
                </div>
              </div>
            </div>
          ))}
            </div>
            {/* --------------related blog end------------------- */}

          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default BlogDetails;
