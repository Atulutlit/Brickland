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
  CFormSelect

} from '@coreui/react'
import axios from 'axios'
import { cilPencil, cilTrash } from '@coreui/icons'
import { TESTIMONIALS_LIST,TESTIMONIALS_DELETE,TESTIMONIALS_UPDATE } from '../../constant/Constant'
import Excel from '../excel/Excel'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Callback = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
  const [editData, setEditData] = useState({ name: '', email:'', mobile: '', city: '', message: '',pending:''})
  const [callback,setCallback]=useState([])
  const [selectedCallback,setSelectedCallback] = useState(null)
  const fetchCallback = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/callback/list`
    const authKey = localStorage.getItem('token')

    try {
      const response = await axios.get(endpoint, {
        headers: { authkey: authKey },
      })
      console.log(response,'response');
      if (response.data.meta.status) {
        setCallback(response.data.response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } else {
        toast.error(response.data.meta.msg);
      }
    } catch (error) {
      if(error?.response?.status===401)
      {
        navigate("/");
      }else{
        console.error('Error fetching testimonials:', error)
        toast.error('Failed to fetch Callback');
      }
      
    }
  }

  useEffect(() => {
    fetchCallback()
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
        toast.success('Callback Deleted Successfully!!');
        fetchCallback();
      } else {
        toast.error(response.data.meta.msg);
      }

      setConfirmDeleteVisible(false)
    } catch (error) {
      console.error('Error deleting callback:', error)
      // alert('Failed to delete callback.')
      toast.error('Failed to Delete Callback');
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
    console.log({
      _id:selectedCallback?._id,
      status:editData?.status
    },'edit detail');
    try {
      await axios.put(
        endpointDetails,
        {
          _id:selectedCallback?._id,
          status:editData?.status
        },
        { headers: { authkey: authKey } },
      )

      toast('Callback Updated Successfully');
      setModalVisible(false)
      fetchCallback();
    } catch (error) {
      console.error('Error updating callback:', error)
      toast('Failed to update callback');
    }
  }

  return (
    <>
    <ToastContainer/>
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
              <CTableHeaderCell>City</CTableHeaderCell>
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
                <CTableDataCell>{item?.comment}</CTableDataCell>
                <CTableDataCell>{item?.city}</CTableDataCell>
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
                name="name"
                disabled={true}
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
              <CFormSelect
                  value={editData.status}
                  onChange={handleInputChange}
                  name="status"
                >
                  <option value="RESOLVED">RESOLVED</option>
                  <option value="PENDING">PENDING</option>
                </CFormSelect>
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
    <div className='float-right'><Excel client={callback}/></div>
    </>
  )
}

export default Callback