import React, { useEffect, useState } from 'react';
import { CButton, CCol, CForm, CFormLabel, CFormInput, CFormTextarea, CInputGroup } from '@coreui/react';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactInfo = () => {
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
  //state 
  const [contactInfoId,setContactInfoId]=useState("");
  const [contactInformation,setContactInformation]=useState("");
  const [address,setAddress]=useState("");
  const [mobile,setMobile]=useState("");
  const [countryCode,setCountryCode]=useState("");
  const [email,setEmail]=useState("");
  const [website,setWebsite]=useState("");
  const [facebookLink,setFacebookLink]=useState("");
  const [twitterLink,setTwitterLink]=useState("");
  const [instagramLink,setInstagramLink]=useState("");
  const [linkedInLink,setLinkedInLink]=useState("")
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/contact/add`;
    const authKey = localStorage.getItem('token'); // Retrieve token from local storage
    console.log(contactInformation,
      address,
      countryCode,
      mobile,
      email,
      website,
      facebookLink,
      twitterLink,
      instagramLink,
      linkedInLink,)
    try {
      const response = await axios.post(endpoint, {
        contactInformation,
        address,
        countryCode,
        mobile,
        email,
        website,
        facebookLink,
        twitterLink,
        instagramLink,
        linkedInLink,
      }, {
        headers: {
          authkey: authKey // Pass the token in request header
        }
      });

      // Handle response here, for example:
      console.log(response.data.meta.msg);
      toast(response.data.meta.msg);
      // alert(response.data.meta.msg); // Alert message from the response
    } catch (error) {
      console.error('Error submitting the contact Info:', error);
      // alert('Failed to submit the contact Info.');
      toast('Failed to submit the code');
    }
  }; 

  const fetchContactDetail=async()=>{

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/contact/details`;
    const authKey = localStorage.getItem('token'); // Retrieve token from local storage
    try {
      const response = await axios.get(endpoint, {
        headers: { authkey: authKey }
      });
      console.log(response.data,'contact detail');
      if(response?.data?.data){
      const detail=response?.data?.data;
      setEmail(detail?.email);
      setAddress(detail?.address);
      setContactInformation(detail?.contactInformation);
      setCountryCode(detail?.countryCode);
      setFacebookLink(detail?.facebookLink);
      setInstagramLink(detail?.instagramLink);
      setLinkedInLink(detail?.linkedInLink);
      setMobile(detail?.mobile);
      setTwitterLink(detail?.twitterLink);
      setWebsite(detail?.website);
      }
    } catch (error) {
      console.error('Error submitting the contact Info:', error);
      alert('Failed to submit the contact Info.');
    }
  }
 useEffect(()=>{
 fetchContactDetail();
 },[])
  return (
    <>
    <CForm onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="blogTitleInput">Contact Information</CFormLabel>
        <CFormInput type="text" id="blogTitleInput" placeholder="Enter Contact Information"
          value={contactInformation} onChange={(e) => setContactInformation(e.target.value)} />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="mainImgInput">Email</CFormLabel>
        <CInputGroup className="mb-3">
          <CFormInput type="text" id="mainImgInput" placeholder="Enter Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
        </CInputGroup>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="contentTextarea">countryCode</CFormLabel>
        <CInputGroup className="mb-3">
          <CFormInput type="text" id="mainImgInput" value={countryCode} placeholder="Enter Country Code"  onChange={(e) => setCountryCode(e.target.value)} />
        </CInputGroup>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="tagInput">Mobile</CFormLabel>
        <CFormInput type="text" id="tagInput" placeholder="Enter Mobile Number"
          value={mobile} onChange={(e) => setMobile(e.target.value)} />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="authorInput">Address</CFormLabel>
        <CFormInput type="text" id="authorInput" placeholder="Enter Address"
          value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      
     
      <div className="mb-3">
        <CFormLabel htmlFor="authorImgInput">Website</CFormLabel>
        <CInputGroup className="mb-3">
          <CFormInput type="text" id="authorImgInput" placeholder="Enter Website Link" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </CInputGroup>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="authorImgInput">Facebook Link</CFormLabel>
        <CInputGroup className="mb-3">
          <CFormInput type="text" id="authorImgInput" placeholder="Enter Facebook Link" value={facebookLink} onChange={(e) => setFacebookLink(e.target.value)} />
        </CInputGroup>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="authorImgInput">Twitter Link</CFormLabel>
        <CInputGroup className="mb-3">
          <CFormInput type="text" id="twitter link" placeholder="Enter Twitter Link" value={twitterLink} onChange={(e) => setTwitterLink(e.target.value)} />
        </CInputGroup>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="authorImgInput">Instagram Link</CFormLabel>
        <CInputGroup className="mb-3">
          <CFormInput type="text" id="instagram Link" placeholder="Enter Instagram Link" value={instagramLink} onChange={(e) => setInstagramLink(e.target.value)} />
        </CInputGroup>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="conclusionTitleInput">LinkedIn Link</CFormLabel>
        <CFormInput type="text" id="conclusionTitleInput" placeholder="Enter LinkedIn Link"
          value={linkedInLink} onChange={(e) => setLinkedInLink(e.target.value)} />
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

export default ContactInfo;
