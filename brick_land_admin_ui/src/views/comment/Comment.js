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
import Excel from '../excel/Excel'

const Comment = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    email:'',
    mobile: '',
    city: '',
    message: '',
    pending:''
  })
  const [callback,setCallback]=useState([])
  const [selectedCallback,setSelectedCallback] = useState(null)
  useEffect(() => {
    const fetchTestimonials = async () => {
      const endpoint = `${import.meta.env.VITE_ADMIN_URL}/callback/list`
      const authKey = localStorage.getItem('token')

      try {
        const response = await axios.get(endpoint, {
          headers: { authkey: authKey },
        })
        console.log(response,'response');
        if (response.data.meta.status) {
          setCallback(response.data.response)
        } else {
          alert(response.data.meta.msg)
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        alert('Failed to fetch testimonials.')
      }
    }

    fetchTestimonials()
  }, [])

  const handleEditClick = (item) => {
    setSelectedCallback(item)
    setEditData({
      name: item?.name,
      mobile: item?.mobile,
      city: item?.city,
      comment: item?.comment,
      status:item?.status,
      email:item?.email
    })
    setModalVisible(true)
  }

  const handleDeleteClick = (item) => {
    setSelectedCallback(item);
    setConfirmDeleteVisible(true)
  }

  const confirmDelete = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/callback/delete/${selectedCallback._id}`
    const authKey = localStorage.getItem('token')

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
        data: { _id: selectedCallback._id, status: selectedCallback.status },
      })

      if (response.data.meta.status) {
        alert('Callback deleted successfully.')
        setCallback((prevTestimonials) =>
          prevTestimonials.filter((t) => t._id !== selectedCallback._id),
        )
      } else {
        alert(response.data.meta.msg)
      }
      setConfirmDeleteVisible(false)
    } catch (error) {
      console.error('Error deleting callback:', error)
      alert('Failed to delete callback.')
    }
  }

  const handleInputChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    })
  }

  const updateCallback = async () => {
    const endpointDetails = `${import.meta.env.VITE_ADMIN_URL}/callback/status`
    const authKey = localStorage.getItem('token')
  
    try {
      await axios.put(
        endpointDetails,
        {
          _id:selectedCallback?._id,
          status:editData?.status
        },
        { headers: { authkey: authKey } },
      )

      alert('callback updated successfully.')
      setModalVisible(false)
      setCallback((prevCallback) =>
        prevCallback.map((item) =>
          item._id === selectedCallback._id
            ? { ...callback, ...editData }
            : callback,
        ),
      )
    } catch (error) {
      console.error('Error updating callback:', error)
      alert('Failed to update callback.')
    }
  }

  return (
    <>
    <CCard>
      <CCardHeader>Callback List</CCardHeader>
      <CCardBody>
        <CTable bordered className='text-center'>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Mobil</CTableHeaderCell>
              <CTableHeaderCell>Message</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {callback && callback.map((item, index) => (
              <CTableRow key={item._id}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item?.name}</CTableDataCell>
                <CTableDataCell>{item?.email}</CTableDataCell>
                <CTableDataCell>{item?.mobile}</CTableDataCell>
                <CTableDataCell>{item?.message}</CTableDataCell>
                <CTableDataCell>{item?.status}</CTableDataCell>

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
          <CModalBody>Are you sure you want to delete this Callback?</CModalBody>
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
          <CModalHeader onClose={() => setModalVisible(false)}>Edit Callback</CModalHeader>
          <CModalBody>
            <div>
              <label>Name</label>
              <CFormInput
                type="text"
                value={editData.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
            <div>
              <label>Email</label>
              <CFormInput
                type="text"
                value={editData.email}
                onChange={handleInputChange}
                name="email"
              />
            </div>
            <div>
              <label>Status</label>
              <CFormInput
                type="text"
                value={editData.status}
                onChange={handleInputChange}
                name="status"
              />
            </div>  
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={updateCallback}>
              Save Changes
            </CButton>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
    <div className=''><Excel client={callback}/></div>
    </>
  )
}

export default Comment