import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CFormCheck, CFormSwitch
} from '@coreui/react';
import axios from 'axios';
import { cilPencil, cilTrash } from '@coreui/icons';

const Team = () => {
  const [team,setTeam]=useState([])
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [name,setName]=useState("");
  const [position,setPosition]=useState("");
  const [image,setImage]=useState("");
  const [message,setMessage]=useState("");

  useEffect(() => {
    const fetchTeam = async () => {
      const endpoint = `${import.meta.env.VITE_ADMIN_URL}/team/list`;
      console.log(endpoint,'url')
      const authKey = localStorage.getItem('token');
      console.log(endpoint,authKey,'auth key and fetch team');
      try {
        const response = await axios.get(endpoint, {
          headers: { authkey: authKey }
        });
        console.log(response,'response fetch team')

        if (response.data.meta.status) {
          setTeam(response.data.data);
        } else {
          alert(response.data.meta.msg);
        }
      } catch (error) {
        console.error('Error fetching team:', error);
        alert('Failed to fetch team.');
      }
    };

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
        alert("Banner deleted successfully.");
        setTeam(prevteam => prevteam.filter(b => b?._id !== selectedTeam._id));
      } else {
        alert(response.data.meta.msg);
      }
      setConfirmDeleteVisible(false);
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner.');
    }
  };

  const AddTeamMember=async()=>{
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/team/add`;
    const authKey = localStorage.getItem('token');
    const data={"name":name,"position":position,"image":image,"message":message}
console.log(data,"data")
    try {
      const response = await axios.post(endpoint, {
        headers: { authkey: authKey },
        data: data
      });atu

      if (response.data.meta.status) {
        setTeam(prevteam => prevteam.filter(b => b._id !== selectedTeam._id));
      } else {
        alert(response.data.meta.msg);
      }
      setModalVisible(false);
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner.');
    }
  }
  return (
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

        <div className='' style={{"backgroundColor":"blue" ,"color":"white","cursor":"pointer"}} onClick={()=>{setModalVisible(true);}}>Add Team Member</div>

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
              <CFormInput type="text" value={name} onChange={(e)=>{setName(e.target.value);}} name="name" />
            </div>
            <div>
              <label>Position</label>
              <CFormInput type="text" value={position} onChange={(e)=>{setPosition(e.target.value);}} name="position" />
            </div>
            <div>
              {/* <label>Image</label> */}
              {/* <CFormInput type="file"  name="bannerImg" /> */}

            </div>
            <div>
              <label>Message</label>
              <CFormInput type="text" value={message} onChange={(e)=>{setMessage(e.target.value);}} name="bannerImg" />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={AddTeamMember}>Add Member</CButton>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default Team;
