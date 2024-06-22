import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CInputGroup,
} from '@coreui/react'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPLOAD_VIDEO } from '../../constant/Constant'

const Video = () => {
 const [homeVideoUpload,setHomeVideoUpload]=useState(null);
 const [aboutVideoUpload,setAboutVideoUpload]=useState(null);
 
 const handleSubmit=()=>{

 }
 
 const handleVideoUpload= async (req, res)=>{
    try {
        if (req.file && req.file.location) {
        return res.json({
            meta: { msg: "Video uploaded successfully.", status: true },
            data: req.file.location,
        });
        } else {
        return res.json({
            meta: { msg: "Something went wrong", status: false },
        });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        meta: { msg: error.message, status: false },
        });
    } 
 }

  return (
    <>
    {/* Home Page Video Upload */}
    <CForm onSubmit={handleSubmit}>
      <CFormLabel htmlFor="imageUpload">Upload Video</CFormLabel>
      <CInputGroup className="mb-3">
        <CFormInput type="file" id="imageUpload" onChange={handleVideoUpload} />
      </CInputGroup>
      <CCol xs={12} className="mt-4">
        <CButton color="primary" type="submit">
          Submit
        </CButton>
      </CCol>
    </CForm>

    {/* About Page Upload */}
    <CForm onSubmit={handleSubmit}>
      <CFormLabel htmlFor="imageUpload">Upload Video</CFormLabel>
      <CInputGroup className="mb-3">
        <CFormInput type="file" id="imageUpload" onChange={handleVideoUpload} />
      </CInputGroup>
      <CCol xs={12} className="mt-4">
        <CButton color="primary" type="submit">
          Submit
        </CButton>
      </CCol>
    </CForm>

    </>
  )
}

export default Video
