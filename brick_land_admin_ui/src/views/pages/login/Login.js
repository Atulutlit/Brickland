import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Import useNavigate for redirection
import axios from 'axios' // Ensure axios is installed using npm install axios
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { ADMIN_LOGIN } from '../../../constant/Constant'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate() // Use useNavigate instead of useHistory

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_ADMIN_URL}/login`,
        {
          email,
          password,
        },
      )
      if (response.data.meta.status) {
        localStorage.setItem('token', response.data.token) // Store the token
        navigate('/dashboard') // Navigate to dashboard
      } else {
        alert('Login failed: ' + response.data.meta.msg)
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Error logging in')
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Username"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-white py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <img src="https://i.imgur.com/dUHHT5P.png" style={{ width: '100%' }}></img>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
