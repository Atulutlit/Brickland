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
  CFormSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilTrash, cilPencil } from '@coreui/icons'
import { PRODUCT_LIST, BLOG_CATEGORY_LIST, PRODUCT_DELETE, PRODUCT_UPDATE, PRODUCT_STATUS } from '../../constant/Constant'

const PropertyList = () => {
  const [products, setProducts] = useState([])
  const [confirmDeleteVisible, setConfirmDeleteVisible] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [categories, setCategories] = useState([])

  // 
  const [property, setProperty] = useState([]);

  useEffect(() => {
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
          alert(response.data.meta.msg)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        alert('Failed to fetch products.')
      }
    }
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
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/product/delete/${selectedProperty._id}`
    const authKey = localStorage.getItem('token')

    try {
      const response = await axios.delete(endpoint, {
        headers: { authkey: authKey },
        data: { _id: selectedProperty._id },
      })

      if (response.data.meta.status) {
        alert('Product deleted successfully.')
        setProducts(products.filter((p) => p._id !== selectedProperty._id))
      } else {
        alert(response.data.meta.msg)
      }
      setConfirmDeleteVisible(false)
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product.')
    }
  }

  const handleEditSubmit = async () => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/product/update/${selectedProperty._id}`
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

      status: selectedProperty.status, // Add status to the payload
      state: selectedProperty.state, // Add state to the payload
    }

    try {
      const response = await axios.put(endpoint, productData, {
        headers: { authkey: authKey },
      })

      if (response.data.meta.status) {
        alert('Product updated successfully.')
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === selectedProperty._id ? selectedProperty : product
          )
        )
        setEditModalVisible(false)
      } else {
        alert(response.data.meta.msg)
      }
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Failed to update product.')
    }
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setSelectedProperty((prevProduct) => ({
      ...prevProduct,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleStatusChange = async (productId, currentStatus) => {
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/product/status`
    const authKey = localStorage.getItem('token')
    const newStatus = currentStatus === 'ACTIVE' ? 'DEACTIVE' : 'ACTIVE'

    try {
      const response = await axios.put(endpoint, {
        _id: productId,
        status: newStatus
      }, {
        headers: { authkey: authKey }
      })

      if (response.data.meta.status) {
        setProducts(products.map(product =>
          product._id === productId ? { ...product, status: newStatus } : product
        ))
        alert('Product status updated successfully.')
      } else {
        alert(response.data.meta.msg)
      }
    } catch (error) {
      console.error('Error updating product status:', error)
      alert('Failed to update product status.')
    }
  }

  return (
    <CCard>
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
              <CTableHeaderCell>Notes</CTableHeaderCell>
              <CTableHeaderCell>Address</CTableHeaderCell>
              <CTableHeaderCell>Images</CTableHeaderCell>
              <CTableHeaderCell>Reg-Price</CTableHeaderCell>
              <CTableHeaderCell>Dis-Price</CTableHeaderCell>
              <CTableHeaderCell>Parking</CTableHeaderCell>
              <CTableHeaderCell>Kitchen</CTableHeaderCell>
              <CTableHeaderCell>Bathrooms</CTableHeaderCell>
              <CTableHeaderCell>Bedrooms</CTableHeaderCell>
              <CTableHeaderCell>Actions</CTableHeaderCell>
              <CTableHeaderCell>Features</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {property.map((item, index) => (
              <CTableRow key={item?._id} >
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>{item?.propertyId}</CTableDataCell>
                <CTableDataCell>{item?.propertyName}</CTableDataCell>
                <CTableDataCell>{item?.Category}</CTableDataCell>
                <CTableDataCell>{item?.propertyType}</CTableDataCell>
                <CTableDataCell>{item?.status}</CTableDataCell>
                <CTableDataCell>{item?.accomdation}</CTableDataCell>
                <CTableDataCell>{item?.state}</CTableDataCell>
                <CTableDataCell>{`₹${item.isFurnished}`}</CTableDataCell>
                <CTableDataCell>{`₹${item.isBestSeller}`}</CTableDataCell>

                <CTableDataCell>{item?.description}</CTableDataCell>
                <CTableDataCell>{item?.shortDescription}</CTableDataCell>
                <CTableDataCell>{item?.address}</CTableDataCell>
                <CTableDataCell>{item?.propertyImg}</CTableDataCell>

                {/* <CTableDataCell> */}
                {/* {product.productImg.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`product-img-${i}`}
                      style={{ width: '50px', height: '50px', margin: '2px' }}
                    />
                  ))} */}
                {/* </CTableDataCell> */}
                <CTableDataCell>{`₹${item.price}`}</CTableDataCell>
                <CTableDataCell>{`₹${item.specialPrice}`}</CTableDataCell>

                <CTableDataCell>{item.parking}</CTableDataCell>
                <CTableDataCell>{item.kitchen}</CTableDataCell>
                <CTableDataCell>{item.bathrooms}</CTableDataCell>
                <CTableDataCell>{item.bedrooms}</CTableDataCell>


                <CTableDataCell>{`₹${JSON.stringify(item.features)}`}</CTableDataCell>

                <CTableDataCell>
                  {/* <CFormSwitch
                    id={`statusSwitch-${product._id}`}
                    color="info"
                    labelOn="ACTIVE"
                    labelOff="DEACTIVE"
                    checked={product.status === 'ACTIVE'}
                    onChange={() => handleStatusChange(product._id, product.status)}
                  /> */}
                </CTableDataCell>
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
        <CModal visible={editModalVisible} onClose={() => setEditModalVisible(false)}>
          <CModalHeader onClose={() => setEditModalVisible(false)}>Edit Product</CModalHeader>
          <CModalBody>
            {selectedProperty && (
              <>
                <div>
                  <label>Property Name</label>
                  <CFormInput
                    type="text"
                    value={selectedProperty.productName}
                    onChange={handleInputChange}
                    name="productName"
                  />
                </div>
                <div>
                  <label>Description</label>
                  <CFormInput
                    type="text"
                    value={selectedProperty.description}
                    onChange={handleInputChange}
                    name="description"
                  />
                </div>
                <div>
                  <label>Address</label>
                  <CFormInput
                    name="address"
                    value={selectedProperty.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>Bathrooms</label>
                  <CFormInput
                    type="text"
                    value={selectedProperty.bathrooms}
                    onChange={handleInputChange}
                    name="bathrooms"
                  />
                  <div>
                    <label>Bedrooms</label>
                    <CFormInput
                      type="text"
                      value={selectedProperty.bedrooms}
                      onChange={handleInputChange}
                      name="bedrooms"
                    />
                  </div>
                  <div>
                    <label>Property Images (comma separated)</label>
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
                  </div>
                  <div>
                    <label>Price</label>
                    <CFormInput
                      type="number"
                      value={selectedProperty.price}
                      onChange={handleInputChange}
                      name="price"
                    />
                  </div>
                  <div>
                    <label>Discounted Price</label>
                    <CFormInput
                      type="number"
                      value={selectedProperty.specialPrice}
                      onChange={handleInputChange}
                      name="specialPrice"
                    />
                  </div>
                </div>

                <div>
                  <CFormCheck
                    id="isFurnished"
                    label="Furnished"
                    name="isFurnished"
                    checked={selectedProperty.isFurnished}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <CFormCheck
                    id="Parking"
                    label="Parking"
                    name="Parking"
                    checked={selectedProperty.parking}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
          </CModalBody>
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
  )
}

export default PropertyList;
