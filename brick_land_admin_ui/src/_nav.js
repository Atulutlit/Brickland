import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilImage,
  cilSmile,
  cilBuilding,
  cilUser,
  cilColorBorder,
  cilFindInPage,
  cilNoteAdd,
  cilContact,
  cilBookmark,
  cilVideo
  
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    
  },
  {
    component: CNavTitle,
    name: `BrickLand`,
  },
  // {
  //   component: CNavGroup,
  //   name: 'Banner Video',
  //   to: '/video',
  //   icon: <CIcon icon={cilVideo} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Banner',
  //       to: '/video',
  //     }
  //   ], 
  // },
  {
    component: CNavGroup,
    name: 'Properties',
    to: '',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Properties',
        to: '/property',
      },
      {
        component: CNavItem,
        name: 'Properties List',
        to: '/propertyList',
      },
    ], 
  },
  {
    component: CNavGroup,
    name: 'Banner',
    to: '',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
    items: [
      // {
      //   component: CNavItem,
      //   name: 'Add Banner',
      //   to: '/banner',
      // },
      {
        component: CNavItem,
        name: 'Banner List',
        to: '/bannerList',
      },
    ], 
  },
  {
    component: CNavGroup,
    name: 'Events',
    to: '',
    icon: <CIcon icon={cilNoteAdd} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Events',
        to: '/event',
      },
      {
        component: CNavItem,
        name: 'Events List',
        to: '/eventList',
      }
    ], 
  },
  
  {
    component: CNavGroup,
    name: 'Blogs',
    to: '',
    icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Blog',
        to: '/blog',
      },
      {
        component: CNavItem,
        name: 'Blogs List',
        to: '/blogList',
      },
    ], 
  },
  {
    component: CNavGroup,
    name: 'Career',
    to: '',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Career',
        to: '/addCareer',
      },
      {
        component: CNavItem,
        name: 'Career List',
        to: '/CareerList',
      }
    ], 
  },
  {
    component: CNavGroup,
    name: 'Testimonial',
    to: '',
    icon: <CIcon icon={cilSmile} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Testimonial',
        to: '/testimonial',
      },
      {
        component: CNavItem,
        name: 'Testimonial List',
        to: '/testimonialList',
      },
    ], 
  },
  // {
  //   component: CNavGroup,
  //   name: 'Category',
  //   to: '',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Add Category',
  //       to: '/Category',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Category List',
  //       to: '/CategoryList',
  //     }
  //   ], 
  // },
  
  {
    component: CNavGroup,
    name: 'Team',
    to: '',
    icon: <CIcon icon={cilColorBorder} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Team',
        to: '/team',
      }
    ], 
  },
 
  //@atul
  {
    component: CNavGroup,
    name: 'Faq',
    to: '',
    icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Faq',
        to: '/faq',
      },
      {
        component: CNavItem,
        name: 'Faq List',
        to: '/faqList',
      },
    ], 
  },
  {
    component: CNavGroup,
    name: 'Callback',
    to: '',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Callback',
        to: '/callback',
      }
    ], 
  },
  {
    component: CNavGroup,
    name: 'contactInfo',
    to: '',
    icon: <CIcon icon={cilContact} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'contactInfo',
        to: '/contactInfo',
      }
    ], 
  },
  
  // {
  //   component: CNavGroup,
  //   name: 'staticPage',
  //   to: '',
  //   icon: <CIcon icon={cilFindInPage} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Static Page',
  //       to: '/staticPage',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Static Page List',
  //       to: '/staticPageList',
  //     }
  //   ], 
  // },
 
]

export default _nav
