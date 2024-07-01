import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CInputGroup,
  CFormSelect
} from '@coreui/react'
import axios from 'axios'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Career = () => {
  const [Career,setCareer]=useState([])
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const [role,setRole]=useState("");
  const [description,setDescription]=useState("");
  const [salary,setSalary]=useState("");
  const [type,setType]=useState("");
  const [status,setStatus]=useState(-1);
  const [location,setLocation]=useState("");
  const [link,setLink]=useState("");
  const [workType,setWorkType] = useState(-1);

  const navigate = useNavigate();


  const handleSubmit=async(event)=>{
    event.preventDefault();
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/career/add`;
    const authKey = localStorage.getItem('token');
    const data={"role":role,"description":description,"salary":salary,"type":workType,"status":true,"location":location,"link":link}
    console.log(data,'data')
    try {
      const response = await axios.post(endpoint,data, {
        headers: { authkey: authKey },
      });
       console.log(response,'response');
      if (response?.data?.meta?.status) {
        toast.success("Career Added Successfully.");
        setCareer(prevCareer => prevCareer.filter(b => b._id !== selectedCareer._id));
      } else {
        toast.success(response.data.meta.msg);
      }
      setConfirmDeleteVisible(false);
    } catch (error) {
      if(error?.response?.status===401)
      {
        navigate("/");
      }else{
        console.error('Error at Add Career:', error);
        toast.error('Failed to Add Career.');
      }
      
    }
  }


  return (
    <>
    <ToastContainer/>
    <CForm onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="titleInput">Role</CFormLabel>
        <CFormInput
          type="text"
          id="titleInput"
          placeholder="Role Name"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="titleInput">Salary</CFormLabel>
        <CFormInput
          type="text"
          id="titleInput"
          placeholder="Salary Range"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
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
      <div className="mb-3">
        <CFormLabel htmlFor="titleInput">Work Type</CFormLabel>
        <CFormSelect type="text" value={workType} onChange={(e)=>{setWorkType(e.target.value);}} name="type" >
        <option value={-1}>select work type</option>
          <option value="WFH">WFH</option>
          <option value="OFFICE">OFFICE</option>
        </CFormSelect>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="titleInput">Status</CFormLabel>
        <CFormSelect type="text" value={status} onChange={(e)=>{setStatus(e.target.value);}} name="type" >
        <option value={-1}>select status</option>
          <option value={true}>Active</option>
          <option value={false}>Inactive</option>
        </CFormSelect>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="titleInput">Google Form Link</CFormLabel>
        <CFormInput
          type="text"
          id="titleInput"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="titleInput">Location</CFormLabel>
        <CFormInput
          type="text"
          id="titleInput"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <CCol xs={12} className="mt-4">
        <CButton color="primary" type="submit">
          Submit
        </CButton>
      </CCol>
    </CForm>
    </>
  );
};

export default Career;
