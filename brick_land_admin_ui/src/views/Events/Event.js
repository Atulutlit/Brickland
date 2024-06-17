import React, { useState,useEffect } from 'react';
import { CButton, CCol, CForm, CFormLabel, CFormInput, CFormTextarea, CInputGroup } from '@coreui/react';
import axios from 'axios';

const Event = () => {
  // State to hold 
  const [eventCategories,setEventCategories]=useState(['DELHI_NCR','NOIDA','GURUGRAM'])
  const [categoryId,setCategoryId]=useState("")
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [location,setLocation]=useState("");
  const [link,setLink]=useState("");
  const [eventDate,setEventDate]=useState("")
  
  useEffect(() => {
    const fetchCategories = async () => {
      const endpoint = `${import.meta.env.VITE_ADMIN_URL}/event/category/list`;
      const authKey = localStorage.getItem('token');

      try {
        const response = await axios.get(endpoint, {
          headers: { authkey: authKey }
        });

        if (response.data.meta.status) {
          console.log(response.data.data,'response data data');
          setEventCategories(response.data.data);
          setCategoryId(response.data.data[0]._id);
        } else {
          alert(response.data.meta.msg);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        alert('Failed to fetch categories.');
      }
    };

    fetchCategories();
  }, []);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/event/add`;
    const authKey = localStorage.getItem('token'); // Retrieve token from local storage

    try {
      const response = await axios.post(endpoint, {
        categoryId,
        title,
        description,
        location,
        link,
        eventDate
      }, {
        headers: {
          authkey: authKey // Pass the token in request header
        }
      });

      // Handle response here, for example:
      console.log(response.data);
      alert(response.data.meta.msg); // Alert message from the response
    } catch (error) {
      console.error('Error submitting the category:', error);
      alert('Failed to submit the category.');
    }
  };

  // // Handle image upload
  // const handleImageUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const endpoint = `${import.meta.env.VITE_ADMIN_URL}/upload/image`;
  //   const authKey = localStorage.getItem('token');
  //   const formData = new FormData();
  //   formData.append('image', file);

  //   try {
  //     const response = await axios.post(endpoint, formData, {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         authkey: authKey,
  //       },
  //     });

  //     if (response.data.meta.status) {
  //       setCategoryImg(response.data.data);
  //       alert(response.data.meta.msg);
  //     } else {
  //       alert('Failed to upload image: ' + response.data.meta.msg);
  //     }
  //   } catch (error) {
  //     console.error('Error uploading image:', error);
  //     alert('Failed to upload image.');
  //   }
  // };

  return (
    <CForm onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="categoryId">Category Id</CFormLabel>
        {/* <CFormInput type="select" id="categoryId" placeholder="Enter category Id"
          >
            {
              eventCategories.map((item,key)=>{
                return(
                  <option value={item}>{item}</option>
                )
              })
            }
        </CFormInput> */}
      </div>
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
        <CFormInput type="text" id="location" placeholder="Enter location name"
          value={location} onChange={(e) => setLocation(e.target.value)} />        </CInputGroup>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="typeInput">Link</CFormLabel>
        <CFormInput type="text" id="typeInput" placeholder="Enter Link"
          value={link} onChange={(e) => setLink(e.target.value)} />
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
