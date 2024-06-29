import React, { useState,useEffect } from 'react';
import { CButton, CCol, CForm, CFormLabel, CFormInput, CFormTextarea, CInputGroup, CFormSelect } from '@coreui/react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Event = () => {
  // State to hold 
  const [eventLocations,setEventCategories]=useState(['DELHI_NCR','NOIDA','GURUGRAM'])
  const [categoryId,setCategoryId]=useState("")
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [location,setLocation]=useState("-1");
  const [link,setLink]=useState([]);
  const [eventDate,setEventDate]=useState("")
  const [youTubeLink,setYouTubeLink]=useState([]);

  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/event/add`;
    const authKey = localStorage.getItem('token'); // Retrieve token from local storage
    if(title=="" || location =="" || link=="" || youTubeLink=="" || eventDate==""){
      toast.warn("Please fill all the detail");
      return;
    }
    try {
      const response = await axios.post(endpoint, {
        title,description,location,link:youTubeLink,eventDate
      }, {
        headers: { authkey: authKey } //pass the token
      });

      // Handle response here, for example:
      console.log(response.data);
      toast(response.data.meta.msg); // toast message from the response
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('failed to create the event',error);
        toast('Failed to create the event.');
      }
     
    }
  };


  return (
    <>
    <ToastContainer/>
    <CForm onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="title">Title</CFormLabel>
        <CFormInput type="text" id="title" placeholder="Enter Title"
          value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="descriptionTextarea">Description</CFormLabel>
        <CFormTextarea id="descriptionTextarea" rows={3}
          value={description} onChange={(e) => setDescription(e.target.value)}></CFormTextarea>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="location">Location</CFormLabel>
        <CInputGroup className="mb-3">
        <CFormSelect
        id="location-select"
        value={location}
        onChange={(e) => {console.log(e.target.value); setLocation(e.target.value);}}
        aria-label="Select a location"
      > 
      <option value={-1}>Select Location</option>
        {eventLocations.map((loc,id) => (
          <option key={id} value={loc}>
            {loc}
          </option>
        ))}
      </CFormSelect>       </CInputGroup>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="typeInput">Link</CFormLabel>
        <div className="container my-5">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {youTubeLink.map((item, key) => (
          <div key={key} className="col">
            <a
              href={item}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <div className="card h-100 border-0 shadow-sm p-3 d-flex flex-column align-items-center justify-content-center bg-primary text-white">
                <h4 className="mb-2">Video {key + 1}</h4>
                <p className="card-text">Click to watch</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>

        <CFormInput type="text" id="typeInput" placeholder="Enter Link"
          value={link} onChange={(e) => setLink(e.target.value)} />
        <CButton color="primary" className='py-2 mt-2' onClick={()=>{link==""?toast.warn("Please add the link"):setYouTubeLink([...youTubeLink,link]);setLink("");}}>Add</CButton>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="typeInput">Event Date</CFormLabel>
        <CFormInput type="date" id="typeInput" placeholder="Enter Event Date"
          value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
      </div>
      <CCol xs={12} className='mt-4'>
        <CButton color="primary" type="submit">
          Submit
        </CButton>
      </CCol>
    </CForm>
    </>
  );
};

export default Event;
