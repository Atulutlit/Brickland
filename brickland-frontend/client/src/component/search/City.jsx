import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
const City = () => {
  const [properties, setProperties] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`https://brickland-backend-4.onrender.com/api/data`);
      const data = await response.json();
      setProperties(data);
      setFilteredProperties(data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching property data:", error);
    }
  };

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const searchProperties = () => {
    const searchQuery = searchInput.trim().toLowerCase();
    const filtered = properties.filter(
      (property) =>
        property.name.toLowerCase().includes(searchQuery) ||
        property.address.toLowerCase().includes(searchQuery) ||
        property.type.toLowerCase().includes(searchQuery)
    );
    setFilteredProperties(filtered);
  };

  useEffect(() => {
    searchProperties();
  }, [searchInput]);

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
        {filteredProperties && filteredProperties.length > 0 && (
          <div className="">
            <div className="flex flex-wrap gap-4">
              {filteredProperties.map((property) => (
                <Link key={property._id} to={`/listing/${property._id}`}>
                  <Card listing={property} key={property._id} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default City;
