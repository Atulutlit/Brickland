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
      alert(response.data.meta.msg) // Alert message from the response
    } catch (error) {
      console.error('Error uploading the image:', error)
      alert('Failed to upload the image.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/banner/add`
    const authKey = localStorage.getItem('token')

    try {
      const response = await axios.post(
        endpoint,
        {
          title,
          description,
          bannerImg: imageUrl,
        },
        {
          headers: {
            authkey: authKey,
          },
        }
      )

      console.log(response.data)
      alert(response.data.meta.msg)
    } catch (error) {
      console.error('Error submitting the banner:', error)
      alert('Failed to submit the banner.')
    }
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="titleInput">Title</CFormLabel>
        <CFormInput
          type="text"
          id="titleInput"
          placeholder="Banner Name"
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
          value={title}
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
  )
}

export default Banner
