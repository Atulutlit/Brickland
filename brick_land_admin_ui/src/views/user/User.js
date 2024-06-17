import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormSwitch
} from '@coreui/react';
import axios from 'axios';
import { cilInfo } from '@coreui/icons';

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    const fetchUsers = async () => {
      const endpoint = `${import.meta.env.VITE_ADMIN_URL}/user/list`;
      console.log(endpoint,'endpoint')
      const authKey = localStorage.getItem('token');

      try {
        const response = await axios.get(endpoint, {
          headers: { authkey: authKey }
        });

        if (response.data.meta.status) {
          setUsers(response.data.data);
        } else {
          alert(response.data.meta.msg);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Failed to fetch users.');
      }
    };

    fetchUsers();
  }, []);

  const fetchUserDetails = async (userId) => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/user/details/${userId}`;
    const authKey = localStorage.getItem('token');

    try {
      const response = await axios.get(endpoint, {
        headers: { authkey: authKey }
      });

      if (response.data.meta.status) {
        setSelectedUser(response.data.data);
      } else {
        alert(response.data.meta.msg);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      alert('Failed to fetch user details.');
    }
  };

  const handleInfoClick = (user) => {
    fetchUserDetails(user._id);
    setModalVisible(true);
  };

  const handleStatusChange = async (userId, currentStatus) => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/user/status`;
    const authKey = localStorage.getItem('token');
    const newStatus = currentStatus === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE';

    try {
      const response = await axios.put(endpoint, {
        _id: userId,
        status: newStatus
      }, {
        headers: { authkey: authKey }
      });

      if (response.data.meta.status) {
        setUsers(users.map(user => 
          user._id === userId ? { ...user, status: newStatus } : user
        ));
        alert('User status updated successfully.');
      } else {
        alert(response.data.meta.msg);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status.');
    }
  };

  return (
    <CCard>
      <CCardHeader>User List</CCardHeader>
      <CCardBody>
        <CTable bordered className='text-center'>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Mobile</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user, index) => (
              <CTableRow key={user._id}>
                <CTableHeaderCell scope="row">{index + 1}.</CTableHeaderCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.mobile}</CTableDataCell>
                <CTableDataCell style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CFormSwitch
                    id={`statusSwitch-${user._id}`}
                    color="info"
                    labelOn="ACTIVE"
                    labelOff="DEACTIVE"
                    checked={user.status === 'ACTIVE'}
                    onChange={() => handleStatusChange(user._id, user.status)}
                  />
                  <span style={{ marginLeft: '10px' }}>{user.status}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="light" className='mx-3' onClick={() => handleInfoClick(user)}>
                    <CIcon icon={cilInfo} />
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CModalHeader onClose={() => setModalVisible(false)}>
            User Information
          </CModalHeader>
          <CModalBody>
            {selectedUser && (
              <>
                <div>
                  <label>Address: {selectedUser.address}</label>
                </div>
                <div>
                  <label>City: {selectedUser.city}</label>
                </div>
                <div>
                  <label>Country: {selectedUser.country}</label>
                </div>
                <div>
                  <label>District: {selectedUser.district}</label>
                </div>
                <div>
                  <label>Pincode: {selectedUser.pincode}</label>
                </div>
                <div>
                  <label>State: {selectedUser.state}</label>
                </div>
              </>
            )}
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default User;
