import React, { useEffect, useState } from 'react'
import axios from 'axios'
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
  CFormSelect,
  CFormSwitch,
  CFormLabel
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPencil } from '@coreui/icons'
import { PRODUCT_LIST, PRODUCT_DELETE, PRODUCT_UPDATE, PRODUCT_STATUS } from '../../constant/Constant'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PropertyList = () => {
  const [products, setProducts] = useState([])
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [categories, setCategories] = useState([]);
  const [featureValue, setFeatureValue] = useState("");
  const [advantage, setAdvantage] = useState("");
  const [property, setProperty] = useState([]);

  const fetchProperty = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/property/list`
    const authKey = localStorage.getItem('token')

    try {
      const response = await axios.get(endpoint, { headers: { authkey: authKey } })
      console.log(response, "response")
      console.log(response.data.meta.status)
      if (response.data.meta.status) {
        setProperty(response.data.data)
      } else {
        toast.error(response.data.meta.msg)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Failed to fetch products.')
    }
  }

  useEffect(() => {
    fetchProperty()
  }, [])

  const handleEditClick = (product) => {
    setSelectedProperty(product)
    setEditModalVisible(true)
  }

  const handleDeleteClick = (product) => {
    setSelectedProperty(product)
    setConfirmDeleteVisible(true)
  }

  const confirmDelete = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/property/delete/${selectedProperty._id}`
    const authKey = localStorage.getItem('token')

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
        data: { _id: selectedProperty._id },
      })

      if (response.data.meta.status) {
        toast.success('Property deleted successfully.')
        setProducts(products.filter((p) => p._id !== selectedProperty._id))
      } else {
        toast.error(response.data.meta.msg)
      }
      setConfirmDeleteVisible(false)
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Failed to delete property:', error);
        toast.error('Failed to delete property.');
      }
    }
  }

  const handleEditSubmit = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/property/update/${selectedProperty._id}`
    const authKey = localStorage.getItem('token')

    // Construct the payload with only the desired fields
    const productData = {
      categoryId: selectedProperty.categoryId,
      productName: selectedProperty.productName,
      address: selectedProperty.address,
      description: selectedProperty.description,
      shortDescription: selectedProperty.shortDescription,
      productImg: selectedProperty.productImg,
      price: selectedProperty.price,
      specialPrice: selectedProperty.specialPrice,
      benefits: selectedProperty.benefits,
      isFurnished: selectedProperty.isFurnished,
      parking: selectedProperty.parking,
      bathrooms: selectedProperty.bathrooms,
      bedrooms: selectedProperty.bedrooms,
      locationbar: selectedProperty.locationAdvantage,
      features: selectedProperty.features,
      status: selectedProperty.status, // Add status to the payload
      state: selectedProperty.state, // Add state to the payload
    }

    try {
      const response = await axios.put(endpoint, productData, {
        headers: { authkey: authKey },
      })

      if (response.data.meta.status) {
        toast.success('Property updated successfully.')
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === selectedProperty._id ? selectedProperty : product
          )
        )
        setEditModalVisible(false)
        fetchProperty();
      } else {
        toast.error(response.data.meta.msg)
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        navigate("/");
      } else {
        console.error('Failed to update property:', error);
        toast.error('Failed to update property.');
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSelectedProperty((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }


  return (
    <>
      <ToastContainer />
      <CCard>
        <ToastContainer />
        <CCardHeader>Properties List</CCardHeader>
        <CCardBody className='overflow-x-scroll'>
          <CTable bordered className="text-center overflow-x-screen">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Id</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Category</CTableHeaderCell>
                <CTableHeaderCell>Type</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Accomadation</CTableHeaderCell>
                <CTableHeaderCell>State</CTableHeaderCell>
                <CTableHeaderCell>Furnished</CTableHeaderCell>
                <CTableHeaderCell>isBestSeller</CTableHeaderCell>
                <CTableHeaderCell>Description</CTableHeaderCell>
                <CTableHeaderCell>Address</CTableHeaderCell>
                <CTableHeaderCell>Images</CTableHeaderCell>
                <CTableHeaderCell>Regular_Price</CTableHeaderCell>
                <CTableHeaderCell>Discount_Price</CTableHeaderCell>
                <CTableHeaderCell>Parking</CTableHeaderCell>
                <CTableHeaderCell>Kitchen</CTableHeaderCell>
                <CTableHeaderCell>Bathrooms</CTableHeaderCell>
                <CTableHeaderCell>Bedrooms</CTableHeaderCell>
                <CTableHeaderCell>Features</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {property.map((item, index) => (
                <CTableRow key={item?._id} >
                  <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                  <CTableDataCell>{item?.propertyId}</CTableDataCell>
                  <CTableDataCell>{item?.propertyName}</CTableDataCell>
                  <CTableDataCell>{item?.category}</CTableDataCell>
                  <CTableDataCell>{item?.propertyType}</CTableDataCell>
                  <CTableDataCell>{item?.status}</CTableDataCell>
                  <CTableDataCell>{item?.accommodation}</CTableDataCell>
                  <CTableDataCell>{item?.state}</CTableDataCell>
                  <CTableDataCell>{`${item.isFurnished}`}</CTableDataCell>
                  <CTableDataCell>{`${item.isBestSeller}`}</CTableDataCell>
                  <CTableDataCell><div style={{ overflow: "auto", height: "100px" }}>{item?.description}</div></CTableDataCell>
                  <CTableDataCell>{item?.address}</CTableDataCell>
                  <CTableDataCell>{item?.propertyImg}</CTableDataCell>
                  <CTableDataCell>{`₹${item.price}`}</CTableDataCell>
                  <CTableDataCell>{`₹${item.specialPrice}`}</CTableDataCell>
                  <CTableDataCell>{item.parking}</CTableDataCell>
                  <CTableDataCell>{item.kitchen}</CTableDataCell>
                  <CTableDataCell>{item.bathrooms}</CTableDataCell>
                  <CTableDataCell>{item.bedrooms}</CTableDataCell>
                  <CTableDataCell>{`${JSON.stringify(item.features)}`}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="light" className="mx-3" onClick={() => handleEditClick(item)}>
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

          {/* Delete Box */}
          <CModal visible={confirmDeleteVisible} onClose={() => setConfirmDeleteVisible(false)}>
            <CModalHeader onClose={() => setConfirmDeleteVisible(false)}>
              Confirm Deletion
            </CModalHeader>
            <CModalBody>Are you sure you want to delete this property?</CModalBody>
            <CModalFooter>
              <CButton color="danger" onClick={confirmDelete}>
                Delete
              </CButton>
              <CButton color="secondary" onClick={() => setConfirmDeleteVisible(false)}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>

          {/* Edit Property Detail */}
          <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)} className="custom-modal-width"  // Apply custom class
          >
            <CModalHeader onClose={() => setEditModalVisible(false)}>Edit Product</CModalHeader>
            <CModalBody>
              {selectedProperty && (
                <>

                  {/* First Row */}
                  <div className='container'>
                    <div className='row'>
                      <div className="col-md-4">
                        <CFormLabel htmlFor="productIdInput">Property Id</CFormLabel>
                        <CFormInput
                          type="text"
                          id="productIdInput"
                          placeholder="Enter property Id"
                          value={selectedProperty.propertyId}
                          name="propertyId"
                        />
                      </div>
                      <div className="col-md-8">
                        <CFormLabel htmlFor="productNameInput">Property Name</CFormLabel>
                        <CFormInput
                          type="text"
                          id="productNameInput"
                          placeholder="Enter property name"
                          value={selectedProperty?.propertyName}
                          name="propertyName"
                        />
                      </div>
                    </div>
                  </div>


                  {/* Second Row */}
                  <div className='container'>
                    <div className='row p-2'>
                      <div className="col-md-6">
                        <CFormLabel htmlFor="categorySelect">Category</CFormLabel>
                        <CFormSelect
                          id="categorySelect"
                          value={selectedProperty?.category}
                        >
                          {categories && categories.map((category, key) => (
                            <option key={key} value={category}>
                              {category}
                            </option>
                          ))}
                        </CFormSelect>
                      </div>
                      <div className="col-md-6">
                        <CFormLabel htmlFor="categorySelect">Property Type</CFormLabel>
                        <CFormSelect
                          id="categorySelect"
                          value={selectedProperty?.propertyType}
                        >
                          <option value="TopSearch">Top Search</option>
                          <option value="exclusive">Exclusive</option>
                          <option value="Valuable">Valuable</option>
                        </CFormSelect>
                      </div>
                      <div className="col-md-6">
                        <CFormLabel htmlFor="categorySelect">Status</CFormLabel>
                        <CFormSelect
                          id="categorySelect"
                          value={selectedProperty?.status}
                        >
                          <option value="UNDER_CONSTRUCTION">UNDER CONSTRUCTION</option>
                          <option value="READY_TO_MOVE">READY TO MOVE</option>
                          <option value="NEW_LAUNCH">NEW TO LAUNCH</option>
                        </CFormSelect>
                      </div>

                      <div className="col-md-6">
                        <CFormLabel htmlFor="categorySelect">Accomodation</CFormLabel>
                        <CFormSelect
                          id="categorySelect"
                          value={selectedProperty?.accommodation}
                        >
                          <option value="SINGLE_FAMILY">Single Family</option>
                          <option value="MULTI_FAMILY">Multi Family</option>
                          <option value="APARTMENT">Apartment</option>
                          <option value="TOWNHOUSE">TownHouse</option>
                          <option value="COOPERATE">Co-operative</option>
                          <option value="BUNGALOW">Bungalow</option>
                          <option value="COTTAGE">Cottage</option>
                          <option value="VILLA">Villa</option>
                        </CFormSelect>
                      </div>
                    </div></div>

                  {/* third Row */}
                  <div className='container'>
                    <div className='row p-2'>
                      <div className="col-md-4">
                        <CFormLabel htmlFor="categorySelect">State</CFormLabel>
                        <CFormSelect
                          id="categorySelect"
                          value={selectedProperty?.state}
                        >
                          <option value={-1}>select state</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="PENDING">PENDING</option>
                          <option value="REJECTED">REJECTED</option>
                        </CFormSelect>
                      </div>
                      <div className="col-md-4">
                        <CFormLabel htmlFor="addressInput">Area</CFormLabel>
                        <CFormInput
                          type="text"
                          id="area"
                          placeholder="Enter area"
                          value={selectedProperty?.area}
                        />
                      </div>
                      <div className="col-md-4">
                        <CFormLabel htmlFor="addressInput">FloorPlan</CFormLabel>
                        <CFormInput
                          type="text"
                          id="addressInput"
                          placeholder="Enter Floor PLan "
                          value={selectedProperty?.floorPlan}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4th Row */}
                  {/* 4th Row */}
                  <div className='container'>
                    <div className='row'>
                      <div className="col-md-2">
                        <CFormLabel htmlFor="furnishedSwitch">Furnished</CFormLabel>
                        <CFormSwitch
                          id="furnishedSwitch"
                          color="info" // Change color as desired
                          labelOn="Yes"
                          labelOff="No"
                          checked={selectedProperty?.isFurnished} // Use the state value directly
                        />
                      </div>
                      <div className="col-md-2">
                        <CFormLabel htmlFor="furnishedSwitch">isBestSeller</CFormLabel>
                        <CFormSwitch
                          id="bestSeller"
                          color="info" // Change color as desired
                          labelOn="Yes"
                          labelOff="No"
                          checked={selectedProperty?.isBestSeller} // Use the state value directly
                        />
                      </div>
                      <div className="col-md-8">
                        <CFormLabel htmlFor="addressInput">Property</CFormLabel>
                        <CFormInput
                          type="text"
                          id="propertyInput"
                          placeholder="Enter property"
                          value={selectedProperty?.property}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5th Row */}

                  {/* 5th Row */}
                  <div className='container'>
                    <div className='row'>
                      <div className="mb-1 flex-item col-md-4">
                        <CFormLabel htmlFor="priceInput">Price</CFormLabel>
                        <CFormInput
                          type="text"
                          id="priceInput"
                          placeholder="Enter price"
                          value={selectedProperty?.price}
                        />
                      </div>
                      <div className="mb-1 flex-item col-md-4">
                        <CFormLabel htmlFor="specialPriceInput">Discounted Price</CFormLabel>
                        <CFormInput
                          type="text"
                          id="specialPriceInput"
                          placeholder="Discounted price"
                          value={selectedProperty?.specialPrice}
                        />
                      </div>
                      <div className="mb-1 flex-item col-md-4">
                        <CFormLabel htmlFor="kitchenInput">Parking</CFormLabel>
                        <CFormInput
                          type="text"
                          id="kitchenInput"
                          placeholder="No. Of Parking"
                          value={selectedProperty?.parking}
                        />
                      </div>
                      <div className="mb-1 flex-item col-md-4">
                        <CFormLabel htmlFor="kitchenInput">Kitchen</CFormLabel>
                        <CFormInput
                          type="number"
                          id="kitchenInput"
                          placeholder="No. Of kitchens"
                          value={selectedProperty?.kitchen}
                        />
                      </div>
                      <div className="mb-1 flex-item col-md-4">
                        <CFormLabel htmlFor="bathroomInput">Bathrooms</CFormLabel>
                        <CFormInput
                          type="number"
                          id="bathroomInput"
                          placeholder="No. Of Bathrooms"
                          value={selectedProperty?.bathrooms}
                        />
                      </div>
                      <div className="mb-1 flex-item col-md-4">
                        <CFormLabel htmlFor="bedroomInput">Bedrooms</CFormLabel>
                        <CFormInput
                          type="number"
                          id="bedroomInput"
                          placeholder="No. Of Bedrooms"
                          value={selectedProperty?.bedrooms}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 6th Row */}
                  <div>
                    <label>Description</label>
                    <CFormInput
                      type="text"
                      value={selectedProperty?.description}
                      onChange={handleInputChange}
                      name="description"
                    />
                  </div>
                  <div>
                    <label>Address</label>
                    <CFormInput
                      name="address"
                      value={selectedProperty?.address}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* <div>
                      <label>Property Images (comma separated)</label> */}
                  {/* <CFormInput
                    type="text"
                    value={selectedProperty.productImg.join(', ')}
                    onChange={(e) =>
                      setSelectedProperty((prevProduct) => ({
                        ...prevProduct,
                        productImg: e.target.value.split(',').map((img) => img.trim()),
                      }))
                    }
                    name="productImg"
                  /> */}
                  {/* </div> */}

                </>
              )}
            </CModalBody>
            <div className="m-1">
              <CFormLabel htmlFor="priceInput">Amenities</CFormLabel>
              <div className='grid grid-cols-5'>
                <div className="container">
                  <div className="row g-5">
                    {selectedProperty?.features && selectedProperty?.features.map((item, key) => (
                      <div key={key} className="col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="text-body">{item}</div>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                  setSelectedProperty((prev) => {
                                    const inputdata = { ...prev };
                                    const features = [...inputdata.features];
                                    features.splice(key, 1); // Remove the element at the specified index
                                    inputdata.features = features;
                                    return inputdata;
                                  });
                                }}
                              >
                                <i className="bi bi-trash"></i> {/* Bootstrap Icon */}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <CFormInput
                  type="text"
                  id="bedroomInput"
                  placeholder="Enter the Amenities"
                  value={featureValue}
                  onChange={(e) => setFeatureValue(e.target.value)}
                />
                {/* <div className='text-center rounded-md' onClick={()=>{setFeatures((prev)=>{return [...prev,featureValue]})}}>Add</div> */}
              </div>
              <div className='text-center my-2 py-1' style={{ backgroundColor: "red", borderRadius: 6, color: "white", cursor: "pointer" }} onClick={() => {
                setSelectedProperty((prev) => { const input = { ...prev }; let feature = [...input.features, featureValue]; input.features = feature; return input; });
                setFeatureValue("");
              }} >Add New Amenities</div>
            </div>
            {/* location advantage */}
            <div className="m-1">
              <CFormLabel htmlFor="priceInput">Location Advantage</CFormLabel>
              <div className='grid grid-cols-5'>
                <div className="container my-4">
                  <div className="row g-5">
                    {selectedProperty?.locationAdvantage && selectedProperty?.locationAdvantage.map((item, key) => (
                      <div key={key} className="col-md-4">
                        <div className="card border-0 shadow-sm h-100">
                          <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="text-body">{item}</div>
                              <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => {
                                  setSelectedProperty((prev) => {
                                    const inputdata = { ...prev };
                                    const advantage = [...inputdata.locationAdvantage];
                                    advantage.splice(key, 1); // Remove the element at the specified index
                                    inputdata.locationAdvantage = advantage;
                                    return inputdata;
                                  });
                                }}
                              >
                                <i className="bi bi-trash"></i> {/* Bootstrap Icon */}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <CFormInput
                  type="text"
                  id="locationAdvantage"
                  placeholder="Enter the LocationAdvantage"
                  value={advantage}
                  onChange={(e) => setAdvantage(e.target.value)}
                />
                {/* <div className='text-center rounded-md' onClick={()=>{setFeatures((prev)=>{return [...prev,featureValue]})}}>Add</div> */}
              </div>
              <div className='text-center my-2 py-1' style={{ backgroundColor: "red", borderRadius: 6, color: "white" }} onClick={() => {
                setSelectedProperty((prev) => { const input = { ...prev }; let advantage = [...input.locationAdvantage, advantage]; input.locationAdvantage = advantage; return input; });
                setAdvantage("");
              }} >Add Location Advantage</div>
            </div>
            <CModalFooter>
              <CButton color="primary" onClick={handleEditSubmit}>
                Save Changes
              </CButton>
              <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>
      </CCard>
    </>
  )
}

export default PropertyList;
