import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CFormCheck, CFormSwitch
} from '@coreui/react';
import axios from 'axios';
import { cilPencil, cilTrash } from '@coreui/icons';

const CareerList = () => {
  const [Career,setCareer]=useState([])
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);

  const [role,setRole]=useState("");
  const [description,setDescription]=useState("");
  const [salary,setSalary]=useState("");
  const [type,setType]=useState("");
  const [status,setStatus]=useState("");
  const [location,setLocation]=useState("");
  const [link,setLink]=useState("");

  useEffect(() => {
    const fetchCareer = async () => {
      const endpoint = `${import.meta.env.VITE_ADMIN_URL}/career/list`;
      console.log(endpoint,'url')
      const authKey = localStorage.getItem('token');
      console.log(endpoint,authKey,'auth key and fetch Career');
      try {
        const response = await axios.get(endpoint, {
          headers: { authkey: authKey }
        });
        console.log(response,'response fetch Career')

        if (response.data.meta.status) {
          setCareer(response.data.data);
        } else {
          alert(response.data.meta.msg);
        }
      } catch (error) {
        console.error('Error fetching Career:', error);
        alert('Failed to fetch Career.');
      }
    };

    fetchCareer();
  }, []);


  const handleDeleteClick = (Career) => {
    setSelectedCareer(Career);
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/Career/delete/${selectedCareer._id}`;
    const authKey = localStorage.getItem('token');

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
        data: { _id: selectedCareer._id, status: selectedCareer.status }
      });

      if (response.data.meta.status) {
        alert("Banner deleted successfully.");
        setCareer(prevCareer => prevCareer.filter(b => b._id !== selectedCareer._id));
      } else {
        alert(response.data.meta.msg);
      }
      setConfirmDeleteVisible(false);
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner.');
    }
  };

  const AddCareer=async()=>{
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/career/add`;
    const authKey = localStorage.getItem('token');
    const data={"role":role,"description":description,"salary":salary,"type":type,"status":status,"location":location}

    try {
      const response = await axios.post(endpoint, {
        headers: { authkey: authKey },
        data: { _id: selectedCareer._id, status: selectedCareer.status }
      });

      if (response.data.meta.status) {
        alert("Banner deleted successfully.");
        setCareer(prevCareer => prevCareer.filter(b => b._id !== selectedCareer._id));
      } else {
        alert(response.data.meta.msg);
      }
      setConfirmDeleteVisible(false);
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner.');
    }
  }
  return (
    <CCard>
      <CCardHeader>Career List</CCardHeader>
      <CCardBody>
        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Position</CTableHeaderCell>
              <CTableHeaderCell>Image</CTableHeaderCell>
              <CTableHeaderCell>Message</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {Career.map((item, index) => (
              <CTableRow key={item._id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item.name}</CTableDataCell>
                <CTableDataCell>{item.position}</CTableDataCell>
                <CTableDataCell>
                  <img src={item.image} alt={item.name} style={{ width: '100px', height: 'auto' }} />
                </CTableDataCell>
                <CTableDataCell>{item.message}</CTableDataCell>

                <CTableDataCell className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="danger" onClick={() => handleDeleteClick(item)}>
                    <CIcon icon={cilTrash} className='text-white' />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        <div className='' onClick={()=>{setModalVisible(true);}}>Add Career Member</div>

        {/* Confirmation Modal for Deletion */}
        <CModal visible={confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)}>
          <CModalHeader onClose={() => setConfirmDeleteVisible(false)}>
            Confirm Deletion
          </CModalHeader>
          <CModalBody>
            Are you sure you want to delete this Career Member?
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" className='text-white' onClick={confirmDelete}>Delete</CButton>
            <CButton color="secondary" onClick={() => setConfirmDeleteVisible(false)}>Cancel</CButton>
          </CModalFooter>
        </CModal>

        {/* Add Career Modal */}
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CModalHeader onClose={() => setModalVisible(false)}>
            Add Career
          </CModalHeader>
          <CModalBody>
            <div>
              <label>Role</label>
              <CFormInput type="text" value={role} onChange={()=>{setRole(e.target.value);}} name="name" />
            </div>
            <div>
              <label>Description</label>
              <CFormInput type="text" value={description} onChange={()=>{setDescription(e.target.value);}} name="position" />
            </div>
            <div>
              <label>Salary</label>
              <CFormInput type="text" value={salary} onChange={()=>{setSalary(e.target.value);}} name="salary" />
            </div>
            <div>
              <label>Type</label>
              <CFormInput type="text" value={type} onChange={()=>{setType(e.target.value);}} name="workType" />
            </div>
            <div>
              <label>Status</label>
              <CFormInput type="text" value={status} onChange={()=>{setStatus(e.target.value);}} name="status" />
            </div>
            <div>
              <label>Location</label>
              <CFormInput type="text" value={location} onChange={()=>{setLocation(e.target.value);}} name="location" />
            </div>
            <div>
              <label>Google Form Link</label>
              <CFormInput type="text" value={link} onChange={()=>{setLink(e.target.value);}} name="link" />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={AddCareer}>Add</CButton>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default BannerList;
