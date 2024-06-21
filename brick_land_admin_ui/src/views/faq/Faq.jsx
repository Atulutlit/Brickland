import React, { useState } from 'react';
import { CButton, CCol, CForm, CFormLabel, CFormInput, CFormTextarea, CInputGroup } from '@coreui/react';
import axios from 'axios';
import { TESTIMONIALS_CREATE,UPLOAD_IMAGE } from '../../constant/Constant';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Faq = () => {
  // State to hold question and answer
  const [question,setQuestion]=useState("");
  const [answer,setAnswer]=useState("");
  // Handle form submission
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/faq/add`;
    const authKey = localStorage.getItem('token'); // Retrieve token from local storage

    try {
      const response = await axios.post(endpoint, {
        question,answer
      }, {
        headers: {
          authkey: authKey // Pass the token in request header
        }
      });

      // Handle response here, for example:
      console.log(response.data);
      setQuestion("");
      setAnswer("");
      toast.success(response.data.meta.msg);
    } catch (error) {
      console.error('Error submitting the testimonial:', error);
      toast.error('Failed to submit the testimonial.');
    }
  };

  
  return (
    <>
    <ToastContainer/>
    <CForm onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="titleInput">Question</CFormLabel>
        <CFormInput type="text" id="titleInput" placeholder="Enter Faq Question!!"
          value={question} onChange={(e) => setQuestion(e.target.value)} />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="descriptionTextarea">Answer</CFormLabel>
        <CFormTextarea id="descriptionTextarea" rows={3}
          value={answer} onChange={(e) => setAnswer(e.target.value)}></CFormTextarea>
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

export default Faq;
