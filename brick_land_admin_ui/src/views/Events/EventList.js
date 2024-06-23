import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CFormCheck
} from '@coreui/react';
import axios from 'axios';
import { cilPencil, cilTrash } from '@coreui/icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventList = () => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [editData, setEditData] = useState({ categoryName: '', description: '', categoryImg: '', status: '' });

  useEffect(() => {
    const fetchCategories = async () => {
      const endpoint = `${import.meta.env.VITE_ADMIN_URL}/event/list`;
      const authKey = localStorage.getItem('token');

      try {
        const response = await axios.get(endpoint, {
          headers: { authkey: authKey }
        });
        console.log(response, 'events');
        if (response.data.meta.status) {
          setEvents(response.data.data);
        } else {
          toast.error(response.data.meta.msg);
        }
      } catch (error) {
        if (error?.response?.status === 401) {
          navigate("/");
        } else {
          console.error('Failed to fetch event:', error);
          toast.error('Failed to fetch event.');
        }
      }
    };

    fetchCategories();
  }, []);

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setEditData({
      categoryName: category.categoryName,
      description: category.description,
      categoryImg: category.categoryImg,
      status: category.status
    });
    setModalVisible(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/event/delete/${selectedCategory._id}`;
    const authKey = localStorage.getItem('token');

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
      });

      if (response.data.meta.status) {
        toast.success("Category deleted successfully.");
        setEvents(prevCategories => prevCategories.filter(c => c._id !== selectedCategory._id));
      } else {
        toast.error(response.data.meta.msg);
      }
      setConfirmDeleteVisible(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Failed to delete event:', error);
        toast.error('Failed to delete event.');
      }
    }
  };

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const updateCategory = async () => {
    const endpointDetails = `${import.meta.env.VITE_ADMIN_URL}/category/update/${selectedCategory._id}`;
    const endpointStatus = `${import.meta.env.VITE_ADMIN_URL}/category/status`;
    const authKey = localStorage.getItem('token');

    try {
      await axios.put(endpointDetails, {
        categoryName: editData.categoryName,
        description: editData.description,
        categoryImg: editData.categoryImg
      }, { headers: { authkey: authKey } });

      await axios.put(endpointStatus, {
        _id: selectedCategory._id,
        status: editData.status
      }, { headers: { authkey: authKey } });

      toast.success("Event updated successfully.");
      setModalVisible(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Failed to update event:', error);
        toast.error('Failed to update event.');
      }

    }
  };

  return (
    <CCard>
      <CCardHeader>Category List</CCardHeader>
      <CCardBody>
        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableHeaderCell>Location</CTableHeaderCell>
              <CTableHeaderCell>Link</CTableHeaderCell>
              <CTableHeaderCell>EventDate</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {events.map((item, index) => (
              <CTableRow key={item._id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item.title}</CTableDataCell>
                <CTableDataCell>{item.description}</CTableDataCell>
                <CTableDataCell>{item.location}</CTableDataCell>
                <CTableDataCell>{item.link}</CTableDataCell>
                <CTableDataCell>{item.eventDate}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="light" className='mx-3' onClick={() => handleEditClick(item)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton color="danger" onClick={() => handleDeleteClick(item)}>
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
            Are you sure you want to delete this category?
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" className='text-white' onClick={confirmDelete}>Delete</CButton>
            <CButton color="secondary" onClick={() => setConfirmDeleteVisible(false)}>Cancel</CButton>
          </CModalFooter>
        </CModal>

        {/* Edit Category Modal */}
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CModalHeader onClose={() => setModalVisible(false)}>
            Edit Category
          </CModalHeader>
          <CModalBody>
            <div>
              <label>Category Name</label>
              <CFormInput type="text" value={editData.categoryName} onChange={handleInputChange} name="categoryName" />
            </div>
            <div>
              <label>Description</label>
              <CFormInput type="text" value={editData.description} onChange={handleInputChange} name="description" />
            </div>
            <div>
              <label>Image URL</label>
              <CFormInput type="text" value={editData.categoryImg} onChange={handleInputChange} name="categoryImg" />
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
            <CButton color="primary" onClick={updateCategory}>Save Changes</CButton>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  );
};

export default EventList;
