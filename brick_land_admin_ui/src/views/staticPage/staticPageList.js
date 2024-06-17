import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CFormCheck, CFormSwitch
} from '@coreui/react';
import axios from 'axios';
import { cilPencil, cilTrash } from '@coreui/icons';

const StaticPageList = () => {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [editData, setEditData] = useState({ title: '', description: '', bannerImg: '', status: '' });

  useEffect(() => {
    const fetchBanners = async () => {
      const endpoint = `${import.meta.env.VITE_ADMIN_URL}/banner/list`;
      const authKey = localStorage.getItem('token');
      console.log(endpoint,authKey,'auth key and fetch banners');
      try {
        const response = await axios.get(endpoint, {
          headers: { authkey: authKey }
        });
        console.log(response,'response fetch banners')

        // if (response.data.meta.status) {
        //   setBanners(response.data.data);
        // } else {
        //   alert(response.data.meta.msg);
        // }
      } catch (error) {
        console.error('Error fetching banners:', error);
        alert('Failed to fetch banners.');
      }
    };

    fetchBanners();
  }, []);

  const handleEditClick = (banner) => {
    setSelectedBanner(banner);
    setEditData({
      title: banner.title,
      description: banner.description,
      bannerImg: banner.bannerImg,
      status: banner.status
    });
    setModalVisible(true);
  };
  const handleStatusChange = async (bannerId, currentStatus) => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/banner/status`;
    const authKey = localStorage.getItem('token');
    const newStatus = currentStatus === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE';

    try {
      const response = await axios.put(endpoint, {
        _id: bannerId,
        status: newStatus
      }, {
        headers: { authkey: authKey }
      });

      if (response.data.meta.status) {
        setBanners(banners.map(banner =>
          banner._id === bannerId ? { ...banner, status: newStatus } : banner
        ));
        alert('Banner status updated successfully.');
      } else {
        alert(response.data.meta.msg);
      }
    } catch (error) {
      console.error('Error updating banner status:', error);
      alert('Failed to update banner status.');
    }
  };

  const handleDeleteClick = (banner) => {
    setSelectedBanner(banner);
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/banner/delete/${selectedBanner._id}`;
    const authKey = localStorage.getItem('token');

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
        data: { _id: selectedBanner._id, status: selectedBanner.status }
      });

      if (response.data.meta.status) {
        alert("Banner deleted successfully.");
        setBanners(prevBanners => prevBanners.filter(b => b._id !== selectedBanner._id));
      } else {
        alert(response.data.meta.msg);
      }
      setConfirmDeleteVisible(false);
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner.');
    }
  };

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const updateBanner = async () => {
    const endpointDetails = `${import.meta.env.VITE_ADMIN_URL}/banner/update/${selectedBanner._id}`;
    const endpointStatus = `${import.meta.env.VITE_ADMIN_URL}/banner/status`;
    const authKey = localStorage.getItem('token');

    try {
      await axios.put(endpointDetails, {
        title: editData.title,
        description: editData.description,
        bannerImg: editData.bannerImg
      }, { headers: { authkey: authKey } });

      await axios.put(endpointStatus, {
        _id: selectedBanner._id,
        status: editData.status
      }, { headers: { authkey: authKey } });

      alert("Banner updated successfully.");
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating banner:', error);
      alert('Failed to update banner.');
    }
  };

  return (
    <CCard>
      <CCardHeader>Banner List</CCardHeader>
      <CCardBody>
        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableHeaderCell>Image</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {banners.map((banner, index) => (
              <CTableRow key={banner._id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{banner.title}</CTableDataCell>
                <CTableDataCell>{banner.description}</CTableDataCell>
                <CTableDataCell>
                  <img src={banner.bannerImg} alt={banner.title} style={{ width: '100px', height: 'auto' }} />
                </CTableDataCell>
                <CTableDataCell className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CFormSwitch
                    id={`statusSwitch-${banner._id}`}
                    color="info"
                    labelOn="ACTIVE"
                    labelOff="DEACTIVE"
                    checked={banner.status === 'ACTIVE'}
                    onChange={() => handleStatusChange(banner._id, banner.status)}
                  />
                  <span style={{ marginLeft: '10px' }}>{banner.status}</span>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton color="light" className='mx-3' onClick={() => handleEditClick(banner)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton color="danger" onClick={() => handleDeleteClick(banner)}>
                    <CIcon icon={cilTrash} className='text-white' />
                  </CButton>
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
            Are you sure you want to delete this banner?
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" className='text-white' onClick={confirmDelete}>Delete</CButton>
            <CButton color="secondary" onClick={() => setConfirmDeleteVisible(false)}>Cancel</CButton>
          </CModalFooter>
        </CModal>

        {/* Edit Banner Modal */}
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CModalHeader onClose={() => setModalVisible(false)}>
            Edit Banner
          </CModalHeader>
          <CModalBody>
            <div>
              <label>Title</label>
              <CFormInput type="text" value={editData.title} onChange={handleInputChange} name="title" />
            </div>
            <div>
              <label>Description</label>
              <CFormInput type="text" value={editData.description} onChange={handleInputChange} name="description" />
            </div>
            <div>
              <label>Image</label>
              <CFormInput type="text" value={editData.bannerImg} onChange={handleInputChange} name="bannerImg" />
            </div>
            <div>
              <label>Status</label>
              <CFormCheck
                type="radio"
                name="status"
                label="Active"
                value="ACTIVE"
                checked={editData.status === "ACTIVE"}
                onChange={handleInputChange}
              />
              <CFormCheck
                type="radio"
                name="status"
                label="Deactive"
                value="DEACTIVE"
                checked={editData.status === "DEACTIVE"}
                onChange={handleInputChange}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={updateBanner}>Save Changes</CButton>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default StaticPageList;
