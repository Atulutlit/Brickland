import React,{useState,useEffect} from "react";
import "swiper/css/bundle";
import { blogItem } from "../../assets/items";
import { Link } from "react-router-dom";
import { BLOG_LIST } from "../../constant/Constant";

export default function Blog() {
  
  const [blog,setBlog]=useState([])
  const [data,setData]=useState([])
  const fetchBlog = async () => {
    try {
      const url = BLOG_LIST;
      // const url = 'https://brickland-backend-4.onrender.com/api/data/'
      const response = await fetch(url);
      const data = await response.json();
      console.log(data,'data')
      setBlog(data.data);
      setData(data.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };
  useEffect(()=>{
   fetchBlog();
  },[])

  // minimum function
  const min = (a, b) => {
    if (a < b) return a;
    else return b;
  }

  
  // Pagination
  const [pageSize, setPageSize] = useState(5);
  const [NumberBox, setNumberBox] = useState([]);
  const [indexNumber, setIndexNumber] = useState(0);
  const [activeColor, setActiveColor] = useState(0);

  // all logic of pagination
  useEffect(() => {
    setNumberBox(Array(parseInt(blog.length / pageSize + 1)).fill(1))
    let data = blog.slice(parseInt(indexNumber) * parseInt(pageSize), min(parseInt(blog.length), (parseInt(indexNumber) + 1) * parseInt(pageSize)));
    setData(data);
  }, [JSON.stringify(blog), indexNumber])
  
    return (
    <div className="blog-area ptb-120">
      <div className="container">
        <div className="row justify-content-center">
        {data.map(post => (
            <div className="col-xl-4 col-md-6" key={post.id}>
              <div className="blog-card">
                <div className="blog-image">
                  <Link to={`/blog/${post._id}`}>
                    <img src={post.mainImg} alt="Blog post" className="h-60"/>
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
                  {/* <p>{post?.conclusionInner}</p> */}
                </div>
              </div>
            </div>
          ))}
           {/* Pagination */}
      <div className="col-lg-12 col-md-12 mb-5">
            <div className="pagination-area">
              <div className="nav-links">
              <div className="prev page-numbers cursor-pointer" onClick={() => { if (indexNumber - 1 >= 0) setIndexNumber(indexNumber - 1); }}>
                  <i className="ri-arrow-left-s-line" />
                </div>
                <div className="flex flex-row gap-4">
                {NumberBox.map((item,key)=>{
                  return(
                    <div className="rounded-full text-xl w-10 h-10 p-2 cursor-pointer border-[1px]" style={{backgroundColor:activeColor===key?'blue':'white'}} onClick={()=>{setIndexNumber(key);setActiveColor(key)}}>{key+1}</div>
                  )
                })}
                </div>
                <div className="next page-numbers cursor-pointer" onClick={()=>{(indexNumber+1)<NumberBox.length && setIndexNumber(indexNumber+1);}}>
                  <i className="ri-arrow-right-s-line" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
