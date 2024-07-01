import React, { useEffect, useState } from 'react';
import CIcon from '@coreui/icons-react';
import {
  CCard, CCardHeader, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CFormCheck, CFormSelect,CFormLabel
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

  const [link,setLink]=useState("");
  const fetchEvents = async () => {
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
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEditClick = (event) => {
    setSelectedCategory(event);
    setEditData(event);
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
    const endpointDetails = `${import.meta.env.VITE_ADMIN_URL}/event/update/${selectedCategory._id}`;
    const authKey = localStorage.getItem('token');

    try {
      const response = await axios.put(endpointDetails,editData, { headers: { authkey: authKey } });
      console.log(response,'response');
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
    <>
    <ToastContainer/>
    <CCard>
      <CCardHeader>Event List</CCardHeader>
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
                <CTableDataCell>{item.link.map((temp,key)=>{
                  return(
                    <div style={{margin:"10px"}}><a href={temp} target="_blank">Link</a></div>
                  )
                })}</CTableDataCell>
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
            Edit Events
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
              <label>Location</label>
              <CFormSelect type="text" value={editData.location} onChange={handleInputChange} name="location" >
              <option value="DELHI_NCR">DELHI_NCR</option>
              <option value="NOIDA">NOIDA</option>
              <option value="GURGAON">GURGAON</option>
              </CFormSelect>
            </div>
            <div className="mb-3">
        <CFormLabel htmlFor="typeInput">Event Date</CFormLabel>
        <CFormInput type="date" id="typeInput" placeholder="Enter Event Date"
          value={editData.eventDate} onChange={(e) => setEditData((prev)=>{
            const data={...prev};
            data.eventDate = e.target.value;
            return data;            
          })} />
      </div>
      <div>
         <label>You Tube Link</label>
         <CFormInput type="text" value={link} onChange={(e)=>{setLink(e.target.value);}} name="title" />
         <div className='' onClick={()=>{setEditData((prev)=>{
           const inputData={...prev};const youTubeLink=inputData.link;inputData.link=[...youTubeLink,link];
           return inputData;
         })}}>Add</div>
             {editData?.link?.map((item,key)=>{
              return( <div className='bg-blue-300 p-1'>
                <a href={item} target="_blank">Link</a>
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={()=>{setEditData((prev)=>{
                    const data={...editData};
                    const link=data.link;
                    link.splice(key,1);
                    data.link=link;
                    return data;
                  })}}
                >
                  <i class="cis-delete"></i> Delete {/* Bootstrap Icon */}
                </button>
              </div>); })}
            </div>
          </CModalBody>
          <CModalFooter>
            <CButton color="primary" onClick={updateCategory}>Save Changes</CButton>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
          </CModalFooter>
        </CModal>
      </CCardBody>
    </CCard>
    </>
  );
};

export default EventList;
