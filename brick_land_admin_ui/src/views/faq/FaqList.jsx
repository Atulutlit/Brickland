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

const FaqList = () => {
  const [faq, setFaq] = useState([])
  const [selectedFaq, setSelectedFaq] = useState(null)
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
      const endpoint = `${import.meta.env.VITE_ADMIN_URL}/faq/list`
      const authKey = localStorage.getItem('token')

      try {
        const response = await axios.get(endpoint, {
          headers: { authkey: authKey },
        })
        console.log(response,"response faq");
        if (response.data.meta.status) {
          setFaq(response.data.data)
        } else {
          alert(response.data.meta.msg)
        }
      } catch (error) {
        console.error('Error fetching faq:', error)
        alert('Failed to fetch testimonials.')
      }
    }

    fetchTestimonials()
  }, [])

  const handleEditClick = (faq) => {
    setSelectedFaq(faq)
    setEditData({
      question: faq.question,
      answer:faq.answer
    })
    setModalVisible(true)
  }

  const handleDeleteClick = (item) => {
    setSelectedFaq(item);
    setConfirmDeleteVisible(true)
  }

  const confirmDelete = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/faq/delete/${selectedFaq._id}`
    const authKey = localStorage.getItem('token')

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
      })

      if (response.data.meta.status) {
        alert('faq deleted successfully.')
        setFaq((prevFaq) =>
          prevFaq.filter((t) => t._id !== selectedFaq._id),
        )
      } else {
        alert(response.data.meta.msg)
      }
      setConfirmDeleteVisible(false)
    } catch (error) {
      console.error('Error deleting faq:', error)
      alert('Failed to delete faq.')
    }
  }

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    })
  }

  const updateFaq = async () => {
    const endpointDetails = `${import.meta.env.VITE_ADMIN_URL}/faq/update/${faq._id}`
    const authKey = localStorage.getItem('token')

    try {
      await axios.put(
        endpointDetails,
        {
          question: editData.question,
          answer: editData.answer,
        },
        { headers: { authkey: authKey } },
      )

      alert('Faq updated successfully.')
      setModalVisible(false)
      setFaq((prevFaq) =>
        prevFaq.map((faq) =>
          faq._id === selectedFaq._id
            ? { ...faq, ...editData }
            : faq,
        ),
      )
    } catch (error) {
      console.error('Error updating faq:', error)
      alert('Failed to update faq.')
    }
  }

  return (
    <CCard>
      <CCardHeader>Faq List</CCardHeader>
      <CCardBody>
        <CTable bordered className='text-center'>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Question</CTableHeaderCell>
              <CTableHeaderCell>Answer</CTableHeaderCell>
              <CTableHeaderCell>Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {faq && faq.map((item, index) => (
              <CTableRow key={item._id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item.question}</CTableDataCell>
                <CTableDataCell>{item.answer}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="light"
                    className="mx-3"
                    onClick={() => handleEditClick(item)}
                  >
                    <CIcon icon={cilPencil} />
                  </CButton>
                  <CButton color="danger" onClick={() => handleDeleteClick(item)}>
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
          <CModalBody>Are you sure you want to delete this faq?</CModalBody>
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
          <CModalHeader onClose={() => setModalVisible(false)}>Edit Faq</CModalHeader>
          <CModalBody>
            <div>
              <label>Question</label>
              <CFormInput
                type="text"
                value={editData.question}
                onChange={handleInputChange}
                name="question"
              />
            </div>
            <div>
              <label>Answer</label>
              <CFormInput
                type="text"
                value={editData.answer}
                onChange={handleInputChange}
                name="answer"
              />
            </div>

          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={updateFaq}>
              Save Changes
            </CButton>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
  )
}

export default FaqList
