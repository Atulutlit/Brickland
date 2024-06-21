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
      console.error('Error submitting the category:', error);
      toast('Failed to submit the category.');
    }
  };


  return (
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
        {
          youTubeLink.map((item,key)=>{
            return(
              <a href={item} target='_blank'>Link</a>
            )
          })
        }
        <CFormInput type="text" id="typeInput" placeholder="Enter Link"
          value={link} onChange={(e) => setLink(e.target.value)} />
        <div className='' onClick={()=>{setYouTubeLink([...youTubeLink,link]);setLink("");}}>Add</div>
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
  );
};

export default Event;
