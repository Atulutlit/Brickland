import React, { useState } from 'react';
import { CButton, CCol, CForm, CFormLabel, CFormInput, CFormTextarea, CInputGroup } from '@coreui/react';
import axios from 'axios';

const Category = () => {
  // State to hold form inputs
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryImg, setCategoryImg] = useState('');
  const [type, setType] = useState('ROOT');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/property/category/add`;
    const authKey = localStorage.getItem('token'); // Retrieve token from local storage

    try {
      const response = await axios.post(endpoint, {
        type,
        categoryName,
        categoryImg,
        description,
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

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/upload/image`;
    const authKey = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authkey: authKey,
        },
      });

      if (response.data.meta.status) {
        setCategoryImg(response.data.data);
        alert(response.data.meta.msg);
      } else {
        alert('Failed to upload image: ' + response.data.meta.msg);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image.');
    }
  };

  return (
    <CForm onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="categoryNameInput">Category Name</CFormLabel>
        <CFormInput type="text" id="categoryNameInput" placeholder="Enter category name"
          value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="descriptionTextarea">Description</CFormLabel>
        <CFormTextarea id="descriptionTextarea" rows={3}
          value={description} onChange={(e) => setDescription(e.target.value)}></CFormTextarea>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="categoryImgInput">Upload Image</CFormLabel>
        <CInputGroup className="mb-3">
          <CFormInput type="file" id="categoryImgInput" onChange={handleImageUpload} />
        </CInputGroup>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="typeInput">Category Type</CFormLabel>
        <CFormInput type="text" id="typeInput" placeholder="Enter category type (e.g., ROOT)"
          value={type} onChange={(e) => setType(e.target.value)} />
      </div>
      <CCol xs={12} className='mt-4'>
        <CButton color="primary" type="submit">
          Submit
        </CButton>
      </CCol>
    </CForm>
  );
};

export default Category;
