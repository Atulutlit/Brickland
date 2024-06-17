import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { CAvatar, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react'
import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from './../../assets/images/avatars/8.jpg'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        
        console.error('Token not found in local storage');
        return;
      }
  
      const config = {
        headers: {
          'authkey': token
        }
      };
  
      const response = await axios.put(`${import.meta.env.VITE_ADMIN_URL}/logout`, null, config);
      if (response.data.meta.status) {
        localStorage.clear();
        navigate('/');
      } else {
        alert('Logout failed: ' + response.data.meta.msg);
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error during logout');
    }
  };
  
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#" onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          LogOut
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
