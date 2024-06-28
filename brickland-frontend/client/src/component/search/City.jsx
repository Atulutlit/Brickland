import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import {PROPERTY_LIST} from './../../constant/Constant'

const City = () => {
  const [properties, setProperties] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Pagination
  const [pageSize, setPageSize] = useState(5);
  const [NumberBox, setNumberBox] = useState([]);
  const [indexNumber, setIndexNumber] = useState(0);
  const [activeColor, setActiveColor] = useState(0);
  

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const url = PROPERTY_LIST;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data,'data');
      setProperties(data.data);
      setData(data.data);
      
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  // minimum function
  const min = (a, b) => {
    if (a < b) return a;
    else return b;
  }
  

  // all logic of pagination
  useEffect(() => {
    setNumberBox(Array(parseInt(properties.length / pageSize + 1)).fill(1))
    let data = properties.slice(parseInt(indexNumber) * parseInt(pageSize), min(parseInt(properties.length), (parseInt(indexNumber) + 1) * parseInt(pageSize)));
    setData(data);
  }, [JSON.stringify(properties), indexNumber])

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };
  
  // Search component
  const [data,setData]=useState("");
  
  const handleSearch = () => {
    console.log(searchInput,'search input')
    if (!searchInput || searchInput=="") {
      properties.length>0 && setData(properties);
    } else {
      const lowerCaseQuery = searchInput.toLowerCase();
      const filteredItems = properties.filter(item =>
        Object.keys(item).some(key =>
          item[key] && item[key].toString().toLowerCase().includes(lowerCaseQuery)
        )
      );
      setData(filteredItems);
    }
  };
  

    

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          We have a wide variety of{" "}
          <span className="text-slate-600">latest property </span>
          in the Town.
        </h1>

        <div className="text-gray-400 text-xl">
          <br />
          You can Search the Property here
        </div>
      </div>
      <form
        className="max-w-lg mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex justify-center">
          <div className="relative md:w-auto">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 font-semibold w-full lg:w-[38rem] md:w-96 mb-4 z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-black dark:text-white dark:focus:border-blue-500"
              placeholder="Search by City, Location, Project, Type"
              required=""
              style={{
                border: "0.0625rem solid black", 
              }}
              onChange={handleSearchInput}
              value={searchInput}
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{
                borderTopWidth: "0.0625rem",
                borderBottomWidth: "0.0625rem",
                width: "3rem",
                height: "2.6rem",
                paddingBottom: "0.625rem",
                left: "98%",
                borderLeftWidth: "0.125rem",
              }}
              onClick={handleSearch}
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      


      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {data && data.length > 0 && (
          <div className="">
            <div className="flex flex-wrap gap-4">
              {data.map((property) => (
                <Link key={property._id} to={`/listing/${property._id}`}>
                  <Card listing={property} key={property._id} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

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
  );
};

export default City;
