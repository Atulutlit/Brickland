import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CFormCheck,
  CFormSelect,
  CFormSwitch,
  CInputGroup
} from '@coreui/react'
import axios from 'axios'
import { PRODUCT_CREATE,UPLOAD_IMAGES } from '../../constant/Constant' 

const Product = () => {
  // {"_id":{"$oid":"6662986c3db589eb7f6f27d2"},"propertyId":"PROP-1717737580981",
  // "url":"penthouse-apartment","propertyName":"Penthouse Apartment",
  // "propertyImg":"https://example.com/image.jpg","propertyType":"Apartment",
  // "description":"A beautiful apartment in the city center.","shortDescription":"City center apartment","price":{"$numberInt":"250000"},
  // "specialPrice":{"$numberInt":"230000"},"features":["Balcony","Pool"],"isBestSeller":true,"bedrooms":{"$numberInt":"2"},"bathrooms":{"$numberInt":"1"},
  // "kitchen":{"$numberInt":"1"},"parking":{"$numberInt":"1"},"address":"123 Main Street, City","area":"1200","isFurnished":true,
  // "accomdation":"Single Family","status":"ACTIVE","state":"APPROVED",
  // "createdAt":{"$date":{"$numberLong":"1717737580987"}},"updatedAt":{"$date":{"$numberLong":"1717737756922"}},"__v":{"$numberInt":"0"}}
  
  const [propertyId,setPropertyId]=useState("");
  const [url,setUrl]=useState("");
  const [propertyName, setPropertyName] = useState('')
  const [propertyImg, setPropertyImg] = useState("")
  const [type,setType]=useState('');
  const [categories, setCategories] = useState(['Residential','Commercial','Plot'])
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('')
  const [shortDescription,setShortDescription] = useState('')
  const [price, setPrice] = useState('')
  const [specialPrice, setSpecialPrice] = useState('');
  
  const [features,setFeatures]=useState([])
  const [featureValue,setFeatureValue]=useState("")
  const [isBestSeller,setIsBestSeller]=useState("")
  const [bedroom, setBedroom] = useState('')
  const [bathroom, setBathrooms] = useState('')
  const [kitchen,setKitchen]=useState(0);
  const [parking,setParking]=useState(0)
  const [address, setAddress] = useState('')
  const [isFurnished, setIsFurnished] = useState(false);
  const [accomdation,setAccomadation]=useState('Single Family');
  const [status,setStatus]=useState('ACTIVE');
  const [state,setState]=useState("APPROVED");  
  

  const handleProductImgChange = async (e) => {
    const files = Array.from(e.target.files)
    const imageUrls = []
    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/upload/image`
    const authKey = localStorage.getItem('token')

    for (const file of files) {
      const formData = new FormData()
      formData.append('image', file)

      try {
        const response = await axios.post(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authkey: authKey,
          },
        })

        if (response.data.meta.status) {
          imageUrls.push(response.data.data)
        } else {
          alert('Failed to upload image: ' + response.data.meta.msg)
        }
      } catch (error) {
        console.error('Error uploading image:', error)
        alert('Failed to upload image.')
      }
    }

    setPropertyImg(imageUrls)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const endpoint = `${import.meta.env.VITE_ADMIN_URL}/property/add`
    const authKey = localStorage.getItem('token')
    const productData = {
      propertyId,
      url,
      propertyName,
      propertyImg,type,categories,category,description,shortDescription,price,specialPrice,
      features,isBestSeller,bedroom,bathroom,kitchen,parking,address,isFurnished,accomdation,status,state
    }
console.log(productData,"productData")
    try {
      const response = await axios.post(endpoint, productData, {
        headers: {
          authkey: authKey,
        },
      })

      console.log(response.data,'successfully saved data')
      alert(response.data.meta.msg)
    } catch (error) {
      console.error('Error submitting the product:', error)
      alert('Failed to submit the product.')
    }
  }

  return (
    <CForm onSubmit={handleSubmit}>
      <div className="mb-3">
        <CFormLabel htmlFor="productIdInput">Property Id</CFormLabel>
        <CFormInput
          type="text"
          id="productIdInput"
          placeholder="Enter property Id"
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="productNameInput">Property Name</CFormLabel>
        <CFormInput
          type="text"
          id="productNameInput"
          placeholder="Enter property name"
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="categorySelect">Category</CFormLabel>
        <CFormSelect
          id="categorySelect"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >          <option value="">Select Category</option>

          {categories.map((category,key) => (
            
            <option key={key} value={category}>
              {category}
            </option>
          ))}
        </CFormSelect>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="categorySelect">Property Type</CFormLabel>
        <CFormSelect
          id="categorySelect"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="TopSearch">Top Search</option>
          <option value="exclusive">Exclusive</option>
          <option value="Valuable">Valuable</option>
        </CFormSelect>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="categorySelect">Status</CFormLabel>
        <CFormSelect
          id="categorySelect"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="ACTIVE">ACTIVE</option>
          <option value="SOLD">SOLD</option>
        </CFormSelect>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="categorySelect">accomadation</CFormLabel>
        <CFormSelect
          id="categorySelect"
          value={accomdation}
          onChange={(e) => setAccomadation(e.target.value)}
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
      <div className="mb-3">
        <CFormLabel htmlFor="categorySelect">State</CFormLabel>
        <CFormSelect
          id="categorySelect"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="APPROVED">APPROVED</option>
          <option value="APPROVED">NOT APPROVED</option>
        </CFormSelect>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="furnishedSwitch">Furnished</CFormLabel>
        <CFormSwitch
          id="furnishedSwitch"
          color="info" // Change color as desired
          labelOn="Yes"
          labelOff="No"
          checked={isFurnished} // Use the state value directly
          onChange={() => setIsFurnished(!isFurnished)} // Toggle the state value
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="furnishedSwitch">isBestSeller</CFormLabel>
        <CFormSwitch
          id="bestSeller"
          color="info" // Change color as desired
          labelOn="Yes"
          labelOff="No"
          checked={isBestSeller} // Use the state value directly
          onChange={() => setIsBestSeller(!isBestSeller)} // Toggle the state value
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="descriptionTextarea">Description</CFormLabel>
        <CFormTextarea
          id="descriptionTextarea"
          placeholder="Enter property description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="descriptionTextarea">shortDescription</CFormLabel>
        <CFormTextarea
          id="descriptionTextarea"
          placeholder="Enter short property description"
          rows={1}
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="addressInput">Address</CFormLabel>
        <CFormInput
          type="text"
          id="addressInput"
          placeholder="Enter address "
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="productImgInput">Property Images</CFormLabel>
        <CInputGroup className="mb-3">
          <CFormInput type="file" id="productImgInput" multiple onChange={handleProductImgChange} />
        </CInputGroup>
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="priceInput">Price</CFormLabel>
        <CFormInput
          type="number"
          id="priceInput"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="specialPriceInput">Discounted Price</CFormLabel>
        <CFormInput
          type="number"
          id="specialPriceInput"
          placeholder="Enter Discounted price"
          value={specialPrice}
          onChange={(e) => setSpecialPrice(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="kitchenInput">Parking</CFormLabel>
        <CFormInput
          type="number"
          id="kitchenInput"
          placeholder="Enter number of kitchen"
          value={parking}
          onChange={(e) => setParking(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="kitchenInput">Kitchen</CFormLabel>
        <CFormInput
          type="number"
          id="kitchenInput"
          placeholder="Enter number of kitchen"
          value={kitchen}
          onChange={(e) => setKitchen(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="bathroomInput">Bathrooms</CFormLabel>
        <CFormInput
          type="number"
          id="bathroomInput"
          placeholder="Enter number of bathrooms"
          value={bathroom}
          onChange={(e) => setBathrooms(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="priceInput">Bedrooms</CFormLabel>
        <CFormInput
          type="number"
          id="bedroomInput"
          placeholder="Enter number of Bedrooms"
          value={bedroom}
          onChange={(e) => setBedroom(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="priceInput">Features</CFormLabel>
        <div className='grid grid-cols-5'>
        {
          features.map((item,key)=>{
            return(
             <div className='flex flex-row border-2'>
              <div className=''>{item}</div>
              <div className='' style={{fontSize:28,color:"red"}} onClick={()=>{setFeatures((prev)=>{
                const inputdata=[...prev];
                inputdata.splice(key,1);
                return inputdata;
              })}}>Delete</div>
             </div>
            )
          })
        }
         <CFormInput
          type="text"
          id="bedroomInput"
          placeholder="Enter the Features"
          value={featureValue}
          onChange={(e) => setFeatureValue(e.target.value)}
        />
        {/* <div className='text-center rounded-md' onClick={()=>{setFeatures((prev)=>{return [...prev,featureValue]})}}>Add</div> */}
        </div>
        <div className='text-center my-2 py-1' style={{backgroundColor:"red",borderRadius:6,color:"white"}} onClick={()=>{setFeatures((prev)=>{return [...prev,featureValue]})}} >Add New Feature</div>

      </div>
      <CCol xs={12} className="mt-4">   
        <CButton color="primary" type="submit">
          Submit
        </CButton>
      </CCol>
    </CForm>
  )
}

export default Product
