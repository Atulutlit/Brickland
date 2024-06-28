import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CFormCheck, CFormSwitch, CFormSelect
} from '@coreui/react';
import axios from 'axios';
import { cilPencil, cilTrash } from '@coreui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CareerList = () => {
  const [Career, setCareer] = useState([])
  const [selectedCareer, setSelectedCareer] = useState(-1);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [editData, setEditData] = useState(null)

  const fetchCareer = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/career/list`;
    console.log(endpoint, 'url')
    const authKey = localStorage.getItem('token');
    console.log(endpoint, authKey, 'auth key and fetch Career');
    try {
      const response = await axios.get(endpoint, {
        headers: { authkey: authKey }
      });
      console.log(response, 'response fetch Career')

      if (response.data.meta.status) {
        setCareer(response.data.data);
      } else {
        alert(response.data.meta.msg);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Error fetching Career:', error);
        alert('Failed to fetch Career.');
      }
    }
  };

  useEffect(() => {
    fetchCareer();
  }, []);


  const handleDeleteClick = (Career) => {
    setSelectedCareer(Career);
    setConfirmDeleteVisible(true);
  };


  const confirmDelete = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/career/delete/${selectedCareer._id}`;
    const authKey = localStorage.getItem('token');

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
      });

      if (response.data.meta.status) {
        toast.success("Career deleted successfully.");
        setCareer(prevCareer => prevCareer.filter(b => b._id !== selectedCareer._id));
      } else {
        toast.error(response.data.meta.msg);
      }
      setConfirmDeleteVisible(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Error deleting banner:', error);
        toast.error('Failed to delete banner.');
      }

    }
  };

  const handleInputChange = (e) => {
    const inputData = { ...editData };
    inputData[e.target.name] = e.target.value;
    setEditData(inputData);
  }

  const EditCareer = async() => {
    console.log(editData,'data')
    const endpointDetails = `${import.meta.env.VITE_ADMIN_URL}/career/update/${editData._id}`
    const authKey = localStorage.getItem('token')

    try {
      await axios.put( endpointDetails,editData,
        { headers: { authkey: authKey } },
      )

      toast.success('Career Detail updated successfully.')
      setModalVisible(false)
      fetchCareer();
    } catch (error) {
      console.error('Error updating Career:', error)
      toast.error('Failed to update Career.')
    }
  }

  return (
    <>
      <ToastContainer />
      <CCard>
        <CCardHeader>Career List</CCardHeader>
        <CCardBody>
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Role</CTableHeaderCell>
                <CTableHeaderCell>Salary</CTableHeaderCell>
                <CTableHeaderCell>WorkType</CTableHeaderCell>
                <CTableHeaderCell>Location</CTableHeaderCell>
                <CTableHeaderCell>Description</CTableHeaderCell>
                <CTableHeaderCell>Link</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {Career.map((item, index) => (
                <CTableRow key={item._id}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{item.role}</CTableDataCell>
                  <CTableDataCell>{item.salary}</CTableDataCell>
                  <CTableDataCell>{item.type}</CTableDataCell>
                  <CTableDataCell>{item.location}</CTableDataCell>
                  <CTableDataCell>{item.description}</CTableDataCell>
                  <CTableDataCell><a href={item.link} target="_blank">Link</a></CTableDataCell>
                  <CTableDataCell>{item.status ? 'Active' : 'DEACTIVATE'}</CTableDataCell>
                  <CTableDataCell>
                    <div className='container'>
                      <CButton color="danger m-2" onClick={() => handleDeleteClick(item)}>
                        <CIcon icon={cilTrash} className='text-white' />
                      </CButton>
                      <CButton color="primary  m-2" onClick={() => { setEditData(item); setModalVisible(true); }}>
                        <CIcon icon={cilPencil} className='text-white' />
                      </CButton>
                    </div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>


          {/* Confirmation Modal for Deletion */}
          <CModal visible={confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)}>
            <CModalHeader onClose={() => setConfirmDeleteVisible(false)}>
              Confirm Deletion
            </CModalHeader>
            <CModalBody>
              Are you sure you want to delete this Career?
            </CModalBody>
            <CModalFooter>
              <CButton color="danger" className='text-white' onClick={confirmDelete}>Delete</CButton>
              <CButton color="secondary" onClick={() => setConfirmDeleteVisible(false)}>Cancel</CButton>
            </CModalFooter>
          </CModal>

          {/* Edit Career Modal */}
          <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader onClose={() => setModalVisible(false)}>
              Edit Career
            </CModalHeader>
            <CModalBody>
              <div>
                <label>Role</label>
                <CFormInput type="text" value={editData?.role} onChange={handleInputChange} name="role" />
              </div>
              <div>
                <label>Description</label>
                <CFormInput type="text" value={editData?.description} onChange={handleInputChange} name="position" />
              </div>
              <div>
                <label>Salary</label>
                <CFormInput type="text" value={editData?.salary} onChange={handleInputChange} name="salary" />
              </div>
              <div>
                <label>WorkType</label>
                <CFormSelect type="text" value={editData?.type} onChange={handleInputChange} name="type" >
                  <option value="WFH">WFH</option>
                  <option value="OFFICE">OFFICE</option>
                </CFormSelect>
              </div>
              <div>
                <label>Status</label>
                <CFormSelect type="text" value={editData?.status} onChange={handleInputChange} name="status" >
                  <option value={true}>true</option>
                  <option value={false}>false</option>
                </CFormSelect>
              </div>
              <div>
                <label>Location</label>
                <CFormInput type="text" value={editData?.location} onChange={handleInputChange} name="location" />
              </div>
              <div>
                <label>Google Form Link</label>
                <CFormInput type="text" value={editData?.link} onChange={handleInputChange} name="link" />
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={EditCareer}>Edit</CButton>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>
      </CCard>
    </>
  );
};

export default CareerList;
