import React, { useState } from 'react';
import { CButton, CCol, CForm, CFormLabel, CFormInput, CFormTextarea, CInputGroup } from '@coreui/react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Blog = () => {
  // State to hold form inputs
  const [blogTitle, setBlogTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tag, setTag] = useState('');
  const [mainImg, setMainImg] = useState('');
  const [authorImg, setAuthorImg] = useState('');
  const [adminImg, setAdminImg] = useState('');
  const [relatedImg1, setRelatedImg1] = useState('');
  const [relatedImg2, setRelatedImg2] = useState('');
  const [conclusionTitle, setConclusionTitle] = useState('');
  const [conclusionInner, setConclusionInner] = useState('');
  const [features, setFeatures] = useState([{ title: '', paragraph: '' }]);
  const [tagList, setTagList] = useState([])

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/blog/add`;
    const authKey = localStorage.getItem('token'); // Retrieve token from local storage

    try {
      const response = await axios.post(endpoint, {
        blogTitle, content, author, tag, mainImg, authorImg, adminImg, relatedImg1, relatedImg2,
        conclusionTitle, conclusionInner, features
      }, {
        headers: { authkey: authKey } // pass the token in request
      });

      // Handle response here, for example:
      toast(response.data.meta.msg); // toast message from the response
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Error submitting the blog post:', error);
        toast('Failed to submit the blog post.');
      }
    }
  };

  // Handle image upload
  const handleImageUpload = async (e, setImage) => {
    const file = e.target.files[0];
    if (!file) return;

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/upload/image`;
    const authKey = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data', authkey: authKey, },
      });

      if (response.data.meta.status) {
        setImage(response.data.data);
        toast(response.data.meta.msg);
      } else {
        toast('Failed to upload image: ' + response.data.meta.msg);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Error uploading the image:', error)
        toast('Failed to upload the image.')
      }
    }
  };

  // Handle feature change
  const handleFeatureChange = (index, key, value) => {
    const updatedFeatures = [...features];
    updatedFeatures[index][key] = value;
    setFeatures(updatedFeatures);
  };

  // Add new feature
  const addFeature = () => {
    setFeatures([...features, { title: '', paragraph: '' }]);
  };

  return (
    <>
      <ToastContainer />
      <CForm onSubmit={handleSubmit}>
        <div className="mb-3">
          <CFormLabel htmlFor="blogTitleInput">Blog Title</CFormLabel>
          <CFormInput type="text" id="blogTitleInput" placeholder="Enter Blog title"
            value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="contentTextarea">Content</CFormLabel>
          <CFormTextarea id="contentTextarea" rows={3}
            value={content} onChange={(e) => setContent(e.target.value)}>
          </CFormTextarea>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="authorInput">Author</CFormLabel>
          <CFormInput type="text" id="authorInput" placeholder="Enter author name"
            value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="tagInput">Tag</CFormLabel>
          <CFormInput type="text" id="tagInput" placeholder="Enter tag"
            value={tag} onChange={(e) => setTag(e.target.value)} />
          <div className='' onClick={(e) => {
            tag == "" ? toast.warn("Fill Tag!!") : setTagList([...tagList, tag]);
            tag !== "" && setTag("");
          }}>Add</div>
          {
            tagList && tagList.map((item, key) => {
              return (
                <div className='' key={key}>{item}</div>
              )
            })
          }
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="mainImgInput">Main Image</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput type="file" id="mainImgInput" onChange={(e) => handleImageUpload(e, setMainImg)} />
          </CInputGroup>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="authorImgInput">Author Image</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput type="file" id="authorImgInput" onChange={(e) => handleImageUpload(e, setAuthorImg)} />
          </CInputGroup>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="adminImgInput">Admin Image</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput type="file" id="adminImgInput" onChange={(e) => handleImageUpload(e, setAdminImg)} />
          </CInputGroup>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="relatedImg1Input">Related Image 1</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput type="file" id="relatedImg1Input" onChange={(e) => handleImageUpload(e, setRelatedImg1)} />
          </CInputGroup>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="relatedImg2Input">Related Image 2</CFormLabel>
          <CInputGroup className="mb-3">
            <CFormInput type="file" id="relatedImg2Input" onChange={(e) => handleImageUpload(e, setRelatedImg2)} />
          </CInputGroup>
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="conclusionTitleInput">Conclusion Title</CFormLabel>
          <CFormInput type="text" id="conclusionTitleInput" placeholder="Enter conclusion title"
            value={conclusionTitle} onChange={(e) => setConclusionTitle(e.target.value)} />
        </div>
        <div className="mb-3">
          <CFormLabel htmlFor="conclusionInnerTextarea">Conclusion Inner</CFormLabel>
          <CFormTextarea id="conclusionInnerTextarea" rows={3}
            value={conclusionInner} onChange={(e) => setConclusionInner(e.target.value)}></CFormTextarea>
        </div>
        {features.map((feature, index) => (
          <div key={index} className="mb-3">
            <CFormLabel htmlFor={`featureTitle${index}`}>Feature Title</CFormLabel>
            <CFormInput type="text" id={`featureTitle${index}`} placeholder="Enter feature title"
              value={feature.title} onChange={(e) => handleFeatureChange(index, 'title', e.target.value)} />
            <CFormLabel htmlFor={`featureParagraph${index}`} className="mt-2">Feature Paragraph</CFormLabel>
            <CFormTextarea id={`featureParagraph${index}`} rows={3} placeholder="Enter feature paragraph"
              value={feature.paragraph} onChange={(e) => handleFeatureChange(index, 'paragraph', e.target.value)}></CFormTextarea>
          </div>
        ))}
        <CButton type="button" color="secondary" onClick={addFeature}>Add Feature</CButton>
        <CCol xs={12} className='mt-4'>
          <CButton color="primary" type="submit">
            Submit
          </CButton>
        </CCol>
      </CForm>
    </>
  );
};

export default Blog;
