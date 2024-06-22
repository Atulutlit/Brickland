// import React, {useEffect, useState} from 'react';
// import { Link } from 'react-router-dom';
// import { MdLocationOn } from "react-icons/md";
// import { listItemAvatarClasses } from '@mui/material';

// export default function PropertyCard({ listing }) {
//   console.log(listing,'listing');
//   const [likedCount, setLikedCount] = useState(0);
//   const [liked,setLiked]=useState(false);

//   const handleLike = (item) => {
//     // Retrieve wishlist and property from localStorage
//     let wishlist = JSON.parse(localStorage.getItem('wishlist')) || {}; // Parse JSON and handle null case
//     let property = JSON.parse(localStorage.getItem('property')) || []; // Parse JSON and handle null case
    
//     // Logging for debugging (optional)
//     console.log('Existing Wishlist:', wishlist);
//     console.log('Existing Property:', property);
  
//     // Check if item is already in wishlist
//     if (wishlist[item?._id]) {
//       // Remove item from wishlist
//       wishlist[item._id] = false;
//       localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Update localStorage wishlist
//       setLiked(false);
//     } else {
//       // Add item to wishlist
//       wishlist[item._id] = true;
//       localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Update localStorage wishlist
  
//       // Add item to property list
//       property.push(item);
//       localStorage.setItem('property', JSON.stringify(property)); // Update localStorage property
//     }
  
//     // Set liked state (assuming setLiked function exists)
//     setLiked(true);
//   };
  
//  useEffect(()=>{
//   handleLike(listing);
//  },[])
//   return (
//     <div className='bg-white shadow-md hover:shadow-lg
//     transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] h-[460px]'>
//         <img src={listing?.imageUrls[1]}
//           alt="listings"
//           className='h-[320px] sm:h-[220px] w-full
//          object-cover hover:scale-105 transition-scale duration-300'
//         />

//         <div className='p-3 flex flex-col gap-2 w-full'>
//           <div className="listss d-flex justify-between align-middle">

//           <p className='truncate capitalize text-lg font-semibold
//            text-slate-700'>{listing?.name}</p>
//           <div className="font-bold fs-2">
//               <div className='cursor-pointer' onClick={()=>{handleLike(listing);}}>
//                 <i className={`ri-heart-line ${liked ? 'text-red-500' : ''}`} />
//               </div>
//             </div>
//           </div>
//           <div className='flex items-center gap-1'>
//             <MdLocationOn className='h-4 w-4 text-green-700' />
//             <p className='text-sm text-grey-600 truncate w-full'>{listing?.address}</p>
//           </div>
//           <p className='text-sm text-gray-600 line-clamp-2'>
//             {listing.description} </p>
//           <p className='text-slate-500 mt-2 font-semibold'>
//             ₹{' '}
//             {listing?.offer ? listing?.discountPrice.toLocaleString('en-in') :
//               listing?.regularPrice.toLocaleString('en-in')}
//             {listing?.type === 'rent' && '/month'}
//           </p>
//           <div className='text-slate-700 flex  gap-4 '>
//             <div className='font-bold text-xs'>
//               {listing?.bedrooms > 1 ? `${listing?.bedrooms} beds`
//                 : `${listing?.bedrooms} bed`}


//             </div>
//             <div className='font-bold text-xs'>
//               {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms`
//                 : `${listing.bathrooms} bathroom`}
//             </div>
           
//           </div>

//         </div>
//     </div>
//   )
// }

// Edited By Atul Kesharwani

import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from "react-icons/md";
import { listItemAvatarClasses } from '@mui/material';

export default function PropertyCard({ listing }) {
  console.log(listing,'listing');
  const [likedCount, setLikedCount] = useState(0);
  const [liked,setLiked]=useState(false);

  const handleLike = (item) => {
    // Retrieve wishlist and property from localStorage
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || {}; // Parse JSON and handle null case
    let property = JSON.parse(localStorage.getItem('property')) || []; // Parse JSON and handle null case
    
    // Logging for debugging (optional)
    console.log('Existing Wishlist:', wishlist);
    console.log('Existing Property:', property);
  
    // Check if item is already in wishlist
    if (wishlist[item?._id]) {
      // Remove item from wishlist
      wishlist[item._id] = false;
      localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Update localStorage wishlist
      setLiked(false);
    } else {
      // Add item to wishlist
      wishlist[item._id] = true;
      localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Update localStorage wishlist
  
      // Add item to property list
      property.push(item);
      localStorage.setItem('property', JSON.stringify(property)); // Update localStorage property
    }
  
    // Set liked state (assuming setLiked function exists)
    setLiked(true);
  };
  
 useEffect(()=>{
  handleLike(listing);
 },[])
  return (
    <div className='bg-white shadow-md hover:shadow-lg
    transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px] h-[460px]'>
        <img src={listing?.propertyImg[0]}
          alt="listings"
          className='h-[320px] sm:h-[220px] w-full
         object-cover hover:scale-105 transition-scale duration-300'
        />

        <div className='p-3 flex flex-col gap-2 w-full'>
          <div className="listss d-flex justify-between align-middle">

          <p className='truncate capitalize text-lg font-semibold
           text-slate-700'>{listing?.propertyName}</p>
          <div className="font-bold fs-2">
              <div className='cursor-pointer' onClick={()=>{handleLike(listing);}}>
                <i className={`ri-heart-line ${liked ? 'text-red-500' : ''}`} />
              </div>
            </div>
          </div>
          <div className='flex items-center gap-1'>
            <MdLocationOn className='h-4 w-4 text-green-700' />
            <p className='text-sm text-grey-600 truncate w-full'>{listing?.address}</p>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description} </p>
          <p className='text-slate-500 mt-2 font-semibold'>
            ₹{' '}
            {listing?.offer ? listing?.discountPrice?.toLocaleString('en-in') :
              listing?.regularPrice?.toLocaleString('en-in')}
            {listing?.type === 'rent' && '/month'}
          </p>
          <div className='text-slate-700 flex  gap-4 '>
            <div className='font-bold text-xs'>
              {listing?.bedrooms > 1 ? `${listing?.bedrooms} beds`
                : `${listing?.bedrooms} bed`}


            </div>
            <div className='font-bold text-xs'>
              {listing.bathrooms > 1 ? `${listing.bathrooms} bathrooms`
                : `${listing.bathrooms} bathroom`}
            </div>
           
          </div>

        </div>
    </div>
  )
}