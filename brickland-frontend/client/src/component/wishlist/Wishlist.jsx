import { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export default function Property() {
  const [properties, setProperties] = useState([]);
  
  const fetchProperties = async () => {
   const property = JSON.parse(localStorage.getItem('property'));
   if(property){ console.log(property,'wishlist property');setProperties(property);}
  };
  useEffect(()=>{
    fetchProperties();
  },[])
  
  return (
    <div>
      <div className='flex flex-col gap-6 p-28 px-3
      max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl
        lg:text-6xl'>
           Find your next <span className='text-slate-500'>perfect </span>
           <br/>
           place with ease
        </h1>
       
      <div className='text-gray-400 text-xs sm:text-sm'>
           This Estate is the best place to find your next 
           perfect place to live.
           <br />
           We have a wide range of properties for you to choose
           from.           
      </div>
      <Link to={"/search"} className='sm:text-sm text-blue-800 font-bold text-3xl lg:text-6xl'> 
      Let's get started...
      </Link>
     </div>

     <div className='relative'>
            <div className='absolute bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20'/>
          <Carousel autoPlay infiniteLoop showStatus={false} showIndicators={false} showThumbs={false} interval={5000}>
              <div>
                  <img loading='lazy' src="https://firebasestorage.googleapis.com/v0/b/brickland-76c23.appspot.com/o/slide1.jpg.jpg?alt=media&token=893d1565-d036-4c0c-9c37-387fb0d4f101" alt="" className="h-80 sm:h-96" />
              </div>
              <div>
                  <img loading='lazy' src="https://firebasestorage.googleapis.com/v0/b/brickland-76c23.appspot.com/o/slide2.jpg.jpg?alt=media&token=63eff507-4c40-44d9-9660-455009624c4a" alt="" className="h-80 sm:h-96"/>
              </div>
              <div>
                  <img loading='lazy' src="https://firebasestorage.googleapis.com/v0/b/brickland-76c23.appspot.com/o/slide3.jpg.jpg?alt=media&token=a9be2a3c-3b8e-488d-a94e-daadb85894b0" alt="" className="h-80 sm:h-96" />
              </div>
              <div>
                  <img loading='lazy' src="https://firebasestorage.googleapis.com/v0/b/brickland-76c23.appspot.com/o/slide4.jpg.jpg?alt=media&token=e80aa984-0937-436e-8533-9638f0b74b7f" alt="" className="h-80 sm:h-96" />
              </div>
              <div>
                  <img loading='lazy' src="https://firebasestorage.googleapis.com/v0/b/brickland-76c23.appspot.com/o/slide5.jpg.jpg?alt=media&token=1b6bb28a-0bd5-45d5-91db-23fc5ad60ed7" alt="" className="h-80 sm:h-96" />
              </div>
          </Carousel>
            
        </div>
     <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
     <div className="properties-grid-box container">
  <div className="row justify-content-center align-items-center">
    <div className="col-lg-7 col-md-6">
      <p>Showing 1-8 Of 27 Results</p>
    </div>
    <div className="col-lg-5 col-md-6">
      <div className="d-flex align-items-center justify-content-end">
        <select className="form-select">
          <option selected="">Recommend</option>
          <option value={1}>Sort by newest</option>
          <option value={3}>Sort by latest</option>
          <option value={1}>Sort by popularity</option>
        </select>
      </div>
    </div>
  </div>
</div>

        {properties && properties.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {properties.map((property) => (
                <Link key={property.id} to={`/listing/${property._id}`}>
                   <PropertyCard listing={property} />
                </Link>
              ))}
            </div>
          </div>
        )}

    </div>
    </div>
  )
}