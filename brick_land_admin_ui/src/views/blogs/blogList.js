import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CFormCheck
} from '@coreui/react';
import axios from 'axios';
import { cilPencil, cilTrash } from '@coreui/icons';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [editData, setEditData] = useState({ blogName: '', description: '', blogImg: '', status: '' });

  useEffect(() => {
    const fetchCategories = async () => {
      const endpoint = `${import.meta.env.VITE_ADMIN_URL}/blog/list`;
      const authKey = localStorage.getItem('token');

      try {
        const response = await axios.get(endpoint, {
          headers: { authkey: authKey }
        });

        if (response.data.meta.status) {
          setBlogs(response.data.data);
        } else {
          toast(response.data.meta.msg);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast('Failed to fetch categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleEditClick = (blogs) => {
    setSelectedBlog(blogs);
    setEditData({
      blogName: blogs.blogName,
      description: blogs.description,
      blogImg: blogs.blogImg,
      status: blogs.status
    });
    setModalVisible(true);
  };

  const handleDeleteClick = (blogs) => {
    setSelectedCategory(blogs);
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/blog/delete/${selectedBlog._id}`;
    const authKey = localStorage.getItem('token');

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
        data: { _id: selectedBlog._id, status: selectedBlog.status }
      });

      if (response.data.meta.status) {
        toast("Blog deleted successfully.");
        setCategories(prevCategories => prevCategories.filter(c => c._id !== selectedBlog._id));
      } else {
        toast(response.data.meta.msg);
      }
      setConfirmDeleteVisible(false);
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast('Failed to delete blog.');
    }
  };

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const updateBlog = async () => {
    const endpointDetails = `${import.meta.env.VITE_ADMIN_URL}/blog/update/${selectedBlog._id}`;
    const endpointStatus = `${import.meta.env.VITE_ADMIN_URL}/blog/status`;
    const authKey = localStorage.getItem('token');

    try {
      await axios.put(endpointDetails, {
        blogName: editData.blogName,
        description: editData.description,
        blogImg: editData.blogImg
      }, { headers: { authkey: authKey } });

      await axios.put(endpointStatus, {
        _id: selectedBlog._id,
        status: editData.status
      }, { headers: { authkey: authKey } });

      toast("Blog updated successfully.");
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating Blog:', error);
      toast('Failed to update Blog.');
    }
  };

  return (
    <>
    <ToastContainer/>
    <CCard>
      <CCardHeader>Blogs List</CCardHeader>
      <CCardBody>
        <CTable bordered>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Blog Name</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableHeaderCell>Image</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {blogs.map((blogs, index) => (
              <CTableRow key={blogs._id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{blogs.blogName}</CTableDataCell>
                <CTableDataCell>{blogs.description}</CTableDataCell>
                <CTableDataCell>
                  <img
                    src={blogs.blogImg}
                    alt={blogs.blogName}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </CTableDataCell>
                <CTableDataCell>{blogs.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="light" className='mx-3' onClick={() => handleEditClick(blogs)}>
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton color="danger" onClick={() => handleDeleteClick(blogs)}>
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
            Are you sure you want to delete this Blog?
          </CModalBody>
          <CModalFooter>
            <CButton color="danger" className='text-white' onClick={confirmDelete}>Delete</CButton>
            <CButton color="secondary" onClick={() => setConfirmDeleteVisible(false)}>Cancel</CButton>
          </CModalFooter>
        </CModal>

        {/* Edit Category Modal */}
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CModalHeader onClose={() => setModalVisible(false)}>
            Edit Blogs
          </CModalHeader>
          <CModalBody>
            <div>
              <label>Blog Name</label>
              <CFormInput type="text" value={editData.blogName} onChange={handleInputChange} name="blogName" />
            </div>
            <div>
              <label>Description</label>
              <CFormInput type="text" value={editData.description} onChange={handleInputChange} name="description" />
            </div>
            <div>
              <label>Image URL</label>
              <CFormInput type="text" value={editData.blogImg} onChange={handleInputChange} name="blogImg" />
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
            <CButton color="primary" onClick={updateBlog}>Save Changes</CButton>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
    </>
  );
};

export default BlogList;
