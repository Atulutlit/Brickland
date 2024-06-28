import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CFormCheck, CFormSwitch,CInputGroup
} from '@coreui/react';
import axios from 'axios';
import { cilPencil, cilTrash } from '@coreui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UPLOAD_IMAGE, } from '../../constant/Constant'

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [editData, setEditData] = useState({ title: '', description: '', bannerImg: '', status: '', headline: '' });
  const [imageUrl,setImageUrl]=useState("");

  const fetchBanners = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/banner/list`;
    console.log(endpoint, 'url')
    const authKey = localStorage.getItem('token');
    console.log(endpoint, authKey, 'auth key and fetch banners');
    try {
      const response = await axios.get(endpoint, {
        headers: { authkey: authKey }
      });
      console.log(response, 'response fetch banners')

      if (response.data.meta.status) {
        setBanners(response.data.data);
      } else {
        toast(response.data.meta.msg);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Error fetching banners:', error);
        toast('Failed to fetch banners.');
      }

    }
  };

  useEffect(() => {
    
    fetchBanners();
  }, []);

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
      toast(response.data.meta.msg) // toast message from the response
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Error uploading the image:', error)
        toast('Failed to upload the image.')
      }
    }
  }


  const handleEditClick = (banner) => {
    setSelectedBanner(banner);
    setEditData(banner);
    setModalVisible(true);
    setImageUrl(banner.bannerImg);
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
        toast('Banner status updated successfully.');
      } else {
        toast(response.data.meta.msg);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Error updating banner status:', error);
        toast('Failed to update banner status.');
      }
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
        toast("Banner deleted successfully.");
        setBanners(prevBanners => prevBanners.filter(b => b._id !== selectedBanner._id));
      } else {
        toast(response.data.meta.msg);
      }
      setConfirmDeleteVisible(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Error deleting banner:', error);
        toast('Failed to delete banner.');
      }

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
    const authKey = localStorage.getItem('token');

    try {
      await axios.put(endpointDetails, {
        title: editData.title,
        description: editData.description,
        bannerImg: editData.bannerImg,
        status : editData.status

      }, { headers: { authkey: authKey } });

      toast("Banner updated successfully.");
      fetchBanners();
      setModalVisible(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Error updating banner:', error);
        toast('Failed to update banner.');
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <CCard>
        <CCardHeader>Banner List</CCardHeader>
        <CCardBody>
          <CTable bordered>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Title</CTableHeaderCell>
                <CTableHeaderCell>Headline</CTableHeaderCell>
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
                  <CTableDataCell>{banner?.title}</CTableDataCell>
                  <CTableDataCell>{banner?.headline}</CTableDataCell>
                  <CTableDataCell>{banner?.description}</CTableDataCell>
                  <CTableDataCell>
                    <img src={banner?.bannerImg} alt={banner.title} style={{ width: '100px', height: 'auto' }} />
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
                <label>Headline</label>

                <CFormInput type="text" value={editData.headline} onChange={handleInputChange} name="headline" />
              </div>
              <div>
                <label>Description</label>
                <CFormInput type="text" value={editData.description} onChange={handleInputChange} name="description" />
              </div>
              <div>
                <label>Image</label>
                <div className=''>
                <img src={imageUrl} style={{height:"100px",width:"100px"}}/>
                <CInputGroup className="mb-3">
                  <CFormInput type="file" id="imageUpload" onChange={handleImageUpload} />
                </CInputGroup>
                </div>
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
    </>
  );
};

export default BannerList;
