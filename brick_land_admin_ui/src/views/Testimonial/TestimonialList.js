import React, { useEffect, useState } from 'react'
import CIcon from '@coreui/icons-react'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormCheck,
} from '@coreui/react'
import axios from 'axios'
import { cilPencil, cilTrash } from '@coreui/icons'
import { TESTIMONIALS_LIST,TESTIMONIALS_DELETE,TESTIMONIALS_UPDATE } from '../../constant/Constant'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TestimonialList = () => {
  const [testimonials, setTestimonials] = useState([])
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    testimonialImg: '',
    status: '',
  })

  useEffect(() => {
    const fetchTestimonials = async () => {
      const endpoint = `${import.meta.env.VITE_ADMIN_URL}/testimonials/list`
      const authKey = localStorage.getItem('token')

      try {
        const response = await axios.get(endpoint, {
          headers: { authkey: authKey },
        })

        if (response.data.meta.status) {
          setTestimonials(response.data.data)
        } else {
          toast(response.data.meta.msg)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        toast('Failed to fetch testimonials.')
      }
    }

    fetchTestimonials()
  }, [])

  const handleEditClick = (testimonial) => {
    setSelectedTestimonial(testimonial)
    setEditData({
      title: testimonial.title,
      description: testimonial.description,
      testimonialImg: testimonial.testimonialImg,
      status: testimonial.status,
    })
    setModalVisible(true)
  }

  const handleDeleteClick = (testimonial) => {
    setSelectedTestimonial(testimonial)
    setConfirmDeleteVisible(true)
  }

  const confirmDelete = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/testimonials/delete/${selectedTestimonial._id}`
    const authKey = localStorage.getItem('token')

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
        data: { _id: selectedTestimonial._id, status: selectedTestimonial.status },
      })

      if (response.data.meta.status) {
        toast.success('Testimonial deleted successfully.')
        setTestimonials((prevTestimonials) =>
          prevTestimonials.filter((t) => t._id !== selectedTestimonial._id),
        )
      } else {
        toast.error(response.data.meta.msg)
      }
      setConfirmDeleteVisible(false)
    } catch (error) {
      console.error('Error deleting testimonial:', error)
      toast.error('Failed to delete testimonial.')
    }
  }

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    })
  }

  const updateTestimonial = async () => {
    const endpointDetails = `${import.meta.env.VITE_ADMIN_URL}/testimonials/update/${selectedTestimonial._id}`
    const endpointStatus = `${import.meta.env.VITE_ADMIN_URL}/testimonials/status`
    const authKey = localStorage.getItem('token')

    try {
      await axios.put(
        endpointDetails,
        {
          title: editData.title,
          description: editData.description,
          testimonialImg: editData.testimonialImg,
        },
        { headers: { authkey: authKey } },
      )

      await axios.put(
        endpointStatus,
        {
          _id: selectedTestimonial._id,
          status: editData.status,
        },
        { headers: { authkey: authKey } },
      )

      toast.success('Testimonial updated successfully.')
      setModalVisible(false)
      setTestimonials((prevTestimonials) =>
        prevTestimonials.map((testimonial) =>
          testimonial._id === selectedTestimonial._id
            ? { ...testimonial, ...editData }
            : testimonial,
        ),
      )
    } catch (error) {
      console.error('Error updating testimonial:', error)
      toast('Failed to update testimonial.')
    }
  }

  return (
    <>
    <ToastContainer/>
    <CCard>
      <CCardHeader>Testimonial List</CCardHeader>
      <CCardBody>
        <CTable bordered className='text-center'>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Title</CTableHeaderCell>
              <CTableHeaderCell>Description</CTableHeaderCell>
              <CTableHeaderCell>YouTube</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {testimonials.map((testimonial, index) => (
              <CTableRow key={testimonial._id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{testimonial.title}</CTableDataCell>
                <CTableDataCell>{testimonial.description}</CTableDataCell>
                <CTableDataCell>
                  <a href={testimonial.testimonialImg}>Link</a>
                </CTableDataCell>
                <CTableDataCell>{testimonial.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="light"
                    className="mx-3"
                    onClick={() => handleEditClick(testimonial)}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton color="danger" onClick={() => handleDeleteClick(testimonial)}>
                    <CIcon icon={cilTrash} className="text-white" />
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
          <CModalBody>Are you sure you want to delete this testimonial?</CModalBody>
          <CModalFooter>
            <CButton color="danger" className="text-white" onClick={confirmDelete}>
              Delete
            </CButton>
            <CButton color="secondary" onClick={() => setConfirmDeleteVisible(false)}>
              Cancel
            </CButton>
          </CModalFooter>
        </CModal>

        {/* Edit Testimonial Modal */}
        <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
          <CModalHeader onClose={() => setModalVisible(false)}>Edit Testimonial</CModalHeader>
          <CModalBody>
            <div>
              <label>Title</label>
              <CFormInput
                type="text"
                value={editData.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>
            <div>
              <label>Description</label>
              <CFormInput
                type="text"
                value={editData.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
            <div>
              <label>YouTube URL</label>
              <CFormInput
                type="text"
                value={editData.testimonialImg}
                onChange={handleInputChange}
                name="testimonialImg"
              />
            </div>
            <div>
              <label>Status</label>
              <CFormCheck
                type="radio"
                name="status"
                label="Active"
                value="ACTIVE"
                checked={editData.status === 'ACTIVE'}
                onChange={handleInputChange}
              />
              <CFormCheck
                type="radio"
                name="status"
                label="Deactive"
                value="DEACTIVE"
                checked={editData.status === 'DEACTIVE'}
                onChange={handleInputChange}
              />
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={updateTestimonial}>
              Save Changes
            </CButton>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
    </>
  )
}

export default TestimonialList
