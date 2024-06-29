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
import { BLOG_LIST } from '../../constant/Constant';
import { useNavigate } from 'react-router-dom';
import './comment.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false);
  const [editData, setEditData] = useState({ blogName: '', description: '', blogImg: '', status: '',comments:[] });
  const [selectedCategory, setSelectedCategory] = useState(false)
  const navigate = useNavigate();

  const fetchBlogList = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/blog/list`;
    const authKey = localStorage.getItem('token');

    try {
      const response = await axios.get(endpoint, {
        headers: { authkey: authKey },
      });
      console.log(response, 'data')
      if (response.data.meta.status) {
        setBlogs(response.data.data);
      } else {
        toast(response.data.meta.msg);
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.log(error);
        toast('Failed to fetch blog.');
      }
    }
  }
  useEffect(() => {
    fetchBlogList();
  }, [])

  const handleEditClick = (blogs) => {
    setSelectedBlog(blogs);
    setEditData(blogs);
    setModalVisible(true);
  };

  const handleDeleteClick = (blogs) => {
    setSelectedBlog(blogs);
    setConfirmDeleteVisible(true);
  };

  const confirmDelete = async () => {
    console.log(selectedBlog, "kullu")
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/blog/delete/${selectedBlog}`;
    console.log(endpoint, "endpoint")
    const authKey = localStorage.getItem('token');

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
        data: { _id: selectedBlog._id, status: selectedBlog.status }
      });
      console.log(response, 'response');
      if (response.data.meta.status) {
        toast("Blog deleted successfully.");
        setBlogs(prevCategories => prevCategories.filter(c => c._id !== selectedBlog));
      } else {
        toast(response.data.meta.msg);
      }
      setConfirmDeleteVisible(false);
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.log(error);
        toast('Failed to delete blog.');
      }
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
    const authKey = localStorage.getItem('token');

    try {
      const response = await axios.put(endpointDetails, editData, { headers: { authkey: authKey } });
      console.log(response, 'response');
      toast("Blog updated successfully.");
      setModalVisible(false);
      fetchBlogList();
    } catch (error) {
      console.error('Error updating Blog:', error);
      toast('Failed to update Blog.');
    }
  };

  return (
    <>
      <ToastContainer />
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
                <CTableHeaderCell>Author</CTableHeaderCell>
                <CTableHeaderCell>Comment</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {blogs.map((blogs, index) => (
                <CTableRow key={blogs._id}>
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{blogs.blogTitle}</CTableDataCell>
                  <CTableDataCell>{blogs.content}</CTableDataCell>
                  <CTableDataCell>
                    <img src={blogs.mainImg} alt={blogs.mainImg} style={{ width: '100px', height: 'auto' }} />
                  </CTableDataCell>
                  <CTableDataCell>{blogs.author}</CTableDataCell>
                  <CTableDataCell style={{ height: "100px" }}>
                    {blogs?.comments && blogs.comments.map((item, key) => (
                      <div className="comment-box" key={key}>
                        <div className="comment-name">Name: {item?.name}</div>
                        <div className="comment-message">Message: {item?.message}</div>
                      </div>
                    ))}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton color="light" className='mx-3' onClick={() => handleEditClick(blogs)}>
                      <CIcon icon={cilPencil} />
                    </CButton>
                    <CButton color="danger" onClick={() => handleDeleteClick(blogs._id)}>
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
              <CButton color="danger" className='text-white' onClick={() => confirmDelete(blogs._id)}>Delete</CButton>
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
                <label>Blog Title</label>
                <CFormInput type="text" value={editData.blogTitle} onChange={handleInputChange} name="blogTitle" />
              </div>
              <div>
                <label>Content</label>
                <CFormInput type="text" value={editData.content} onChange={handleInputChange} name="content" />
              </div>
              <div>
                <label>conclusion Title</label>
                <CFormInput type="text" value={editData.conclusionTitle} onChange={handleInputChange} name="conclusionTitle" />
              </div>
              <div>
                <label>conclusionInner</label>
                <CFormInput type="text" value={editData.conclusionInner} onChange={handleInputChange} name="conclusionInner" />
              </div>
              <div>
                <label>Author</label>
                <CFormInput type="text" value={editData.author} onChange={handleInputChange} name="author" />
              </div>
              <div>
                <label>Comment</label>
                {editData.comments && editData.comments.map((item, key) => (
                  <div className="comment-box" key={key}>
                    <div className="comment-name">Name: {item?.name}</div>
                    <div className="comment-message">Message: {item?.message}</div>
                    <CIcon icon={cilTrash} className='text-black' style={{ cursor: "pointer" }}
                      onClick={() => {
                        setEditData((prev) => {
                          const inputdata = { ...prev };
                          const comments = [...inputdata.comments];
                          comments.splice(key, 1); // Remove the element at the specified index
                          inputdata.comments = comments;
                          return inputdata;
                        });
                      }}
                    /></div>
                ))}
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
