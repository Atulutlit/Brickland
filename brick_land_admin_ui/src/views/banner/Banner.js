import React, { useState } from 'react'
import { CButton, CCol, CForm, CFormLabel, CFormInput, CFormTextarea, CInputGroup } from '@coreui/react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPLOAD_IMAGE, } from '../../constant/Constant'

const Banner = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [headline, setHeadline] = useState('')

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/upload/image`
    const authKey = localStorage.getItem('token')
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authkey: authKey,
        },
      })

      setImageUrl(response.data.data)
      toast(response.data.meta.msg) // toast message from the response
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Error uploading the image:', error)
        toast('Failed to upload the image.')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/banner/add`
    const authKey = localStorage.getItem('token')
    if(title=="" || description==""||headline=="")
    {
      toast.warn("Please fill all the detail");
      return;
    }
    try {
      const response = await axios.post(
        endpoint,
        {
          title,
          description,
          bannerImg: imageUrl,
          headline
        },
        {
          headers: {
            authkey: authKey,
          },
        }
      )

      console.log(response.data)
      toast(response.data.meta.msg)
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Error submitting the banner:', error)
        toast.error('Failed to submit the banner.')
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <CForm onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="titleInput">Title</CFormLabel>
          <CFormInput
            type="text"
            id="titleInput"
            placeholder="Title Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="titleInput">Headline</CFormLabel>
          <CFormInput
            type="text"
            id="titleInput"
            placeholder="Headline"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="descriptionTextarea">Description</CFormLabel>
          <CFormTextarea
            id="descriptionTextarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></CFormTextarea>
        </div>
        <CFormLabel htmlFor="imageUpload">Upload Image</CFormLabel>
        <CInputGroup className="mb-3">
          <CFormInput type="file" id="imageUpload" onChange={handleImageUpload} />
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

export default Banner
