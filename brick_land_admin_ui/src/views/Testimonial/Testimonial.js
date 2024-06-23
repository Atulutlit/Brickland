import React, { useState } from 'react';
import { CButton, CCol, CForm, CFormLabel, CFormInput, CFormTextarea, CInputGroup } from '@coreui/react';
import axios from 'axios';
import { TESTIMONIALS_CREATE,UPLOAD_IMAGE } from '../../constant/Constant';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Testimonial = () => {
  // State to hold form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [testimonialImg, setTestimonialImg] = useState('');
  const [link, setLink] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/testimonials/add`;
    const authKey = localStorage.getItem('token'); // Retrieve token from local storage

    try {
      const response = await axios.post(endpoint, {
        title,
        testimonialImg:link,
        description,
      }, {
        headers: {
          authkey: authKey // Pass the token in request header
        }
      });

      // Handle response here, for example:
      console.log(response.data);
      toast(response.data.meta.msg); // Alert message from the response
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Failed create testimonial:', error);
        toast.error('Failed to create testimonial.');
      }
    }
  };

  return (
    <>
    <ToastContainer/>
    <CForm onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="titleInput">Testimonial Title</CFormLabel>
        <CFormInput type="text" id="titleInput" placeholder="Enter testimonial title"
          value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="descriptionTextarea">Description</CFormLabel>
        <CFormTextarea id="descriptionTextarea" rows={3}
          value={description} onChange={(e) => setDescription(e.target.value)}></CFormTextarea>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="descriptionTextarea">YouTube Video Link</CFormLabel>
        <CFormInput type="text" id="titleInput" placeholder="Enter You Tube Video Link"
          value={link} onChange={(e) => setLink(e.target.value)} />
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

export default Testimonial;
