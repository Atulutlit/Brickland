import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CFormCheck, CFormSwitch, CFormLabel, CInputGroup
} from '@coreui/react';
import axios from 'axios';
import { cilPencil, cilTrash } from '@coreui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@coreui/coreui';

const Team = () => {
  const [team, setTeam] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState('')
  const [message, setMessage] = useState("");

  const fetchTeam = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/team/list`;
    console.log(endpoint, 'url')
    const authKey = localStorage.getItem('token');
    console.log(endpoint, authKey, 'auth key and fetch team');
    try {
      const response = await axios.get(endpoint, {
        headers: { authkey: authKey }
      });
      console.log(response, 'response fetch team')

      if (response.data.meta.status) {
        setTeam(response.data.data);
        console.log(response.data.data);
      } else {
        toast(response.data.meta.msg);
      }
    } catch (error) {
      console.error('Error fetching team:', error);
      toast('Failed to fetch team.');
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);


  const handleDeleteClick = (team) => {
    setSelectedTeam(team);
    setConfirmDeleteVisible(true);
  };


  const confirmDelete = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/team/delete/${selectedTeam._id}`;
    const authKey = localStorage.getItem('token');

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
        data: { _id: selectedTeam._id, status: selectedTeam.status }
      });

      if (response.data.meta.status) {
        toast.success("Team Member deleted successfully.");
        setTeam(prevteam => prevteam.filter(b => b?._id !== selectedTeam._id));
      } else {
        toast.error(response.data.meta.msg);
      }
      setConfirmDeleteVisible(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Failed to delete team member:', error);
        toast.error('Failed to delete team member.');
      }
    }
  };


  const AddTeamMember = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/team/add`;
    const authKey = localStorage.getItem('token');
    const data = { name, position, img: imageUrl, message }
    console.log(data, 'data', imageUrl, image);
    try {
      const response = await axios.post(endpoint, data, {
        headers: { authkey: authKey },
      });

      if (response.data.meta.status) {
        setTeam([...team, data]);
        toast.success('Team Member Added Successfully')
      } else {
        toast.error(response.data.meta.msg);
      }
      setModalVisible(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Failed to add team member:', error);
        toast.error('Failed to add team member.');
      }
      console.error('Error deleting team member:', error);
      toast('Failed to add team member.');
    }
  }

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
      toast(response.data.meta.msg) // Alert message from the response
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Failed to upload image:', error);
        toast.error('Failed to upload image.');
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <CCard>
        <CCardHeader>Team List</CCardHeader>
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
              {team.map((item, index) => (
                <CTableRow key={item._id}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{item.name}</CTableDataCell>
                  <CTableDataCell>{item.position}</CTableDataCell>
                  <CTableDataCell>
                    <img src={item.image} alt={item.name} style={{ width: '100px', height: 'auto' }} />
                  </CTableDataCell>
                  <CTableDataCell>{item.message}</CTableDataCell>

                  <CTableDataCell>
                    <CButton color="danger" onClick={() => handleDeleteClick(item)}>
                      <CIcon icon={cilTrash} className='text-white' />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          <button size="md" color="primary" style={{ "backgroundColor": "blue", "color": "white", "cursor": "pointer", padding: "5px", width: "200px", borderRadius: "10px" }} onClick={() => { setModalVisible(true); }}>Add Team Member</button>

          {/* Confirmation Modal for Deletion */}
          <CModal visible={confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)}>
            <CModalHeader onClose={() => setConfirmDeleteVisible(false)}>
              Confirm Deletion
            </CModalHeader>
            <CModalBody>
              Are you sure you want to delete this Team Member?
            </CModalBody>
            <CModalFooter>
              <CButton color="danger" className='text-white' onClick={confirmDelete}>Delete</CButton>
              <CButton color="secondary" onClick={() => setConfirmDeleteVisible(false)}>Cancel</CButton>
            </CModalFooter>
          </CModal>

          {/* Add Team Modal */}
          <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
            <CModalHeader onClose={() => setModalVisible(false)}>
              Add Team Member
            </CModalHeader>
            <CModalBody>
              <div>
                <label>Name</label>
                <CFormInput type="text" value={name} onChange={(e) => { setName(e.target.value); }} name="name" />
              </div>
              <div>
                <label>Position</label>
                <CFormInput type="text" value={position} onChange={(e) => { setPosition(e.target.value); }} name="position" />
              </div>
              <div>
                <CFormLabel htmlFor="imageUpload">Upload Image</CFormLabel>
                <CInputGroup className="mb-3">
                  <CFormInput type="file" id="imageUpload" onChange={handleImageUpload} />
                </CInputGroup>
              </div>
              <div>
                <label>Message</label>
                <CFormInput type="text" value={message} onChange={(e) => { setMessage(e.target.value); }} name="Team MemberImg" />
              </div>
            </CModalBody>
            <CModalFooter>
              <CButton color="primary" onClick={AddTeamMember}>Add Member</CButton>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Team;
