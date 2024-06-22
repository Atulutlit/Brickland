import React from 'react'
import contactInfo from './views/contactInfo/ContactInfo.js'

const User = React.lazy(() => import('./views/user/User.js'))
const Property = React.lazy(() => import('./views/Property/Property.js'))
const PropertyList  = React.lazy(() => import('./views/Property/PropertyList.js'))
const Testimonial = React.lazy(() => import('./views/Testimonial/Testimonial'))
const TestimonialList  = React.lazy(() => import('./views/Testimonial/TestimonialList'))
const CategoryList  = React.lazy(() => import('./views/Category/CategoryList'))
const Category = React.lazy(() => import('./views/Category/Category'))
const BannerList  = React.lazy(() => import('./views/banner/BannerList'))
const Banner = React.lazy(() => import('./views/banner/Banner'))
const Blog = React.lazy(() => import('./views/blogs/blog'))
const BlogList = React.lazy(() => import('./views/blogs/blogList'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
// @atul
const Callback = React.lazy(()=> import('./views/callback/Callback.js'));
const Faq = React.lazy(()=> import('./views/faq/Faq.jsx'));
const FaqList = React.lazy(()=> import('./views/faq/FaqList.jsx'));
const ContactInfo = React.lazy(()=> import('./views/contactInfo/ContactInfo.js'));
const StaticPage = React.lazy(()=> import('./views/staticPage/staticPage.js'));
const StaticPageList = React.lazy(()=> import('./views/staticPage/staticPageList.js'));
const Event = React.lazy(()=>import('./views/Events/Event.js'));
const EventList = React.lazy(()=>import('./views/Events/EventList.js'));
const EventCategory = React.lazy(()=> import('./views/eventCategory/EventCategory.js'));
const EventCategoryList = React.lazy(()=> import('./views/eventCategory/EventCategoryList.js'));
const BlogCategory = React.lazy(()=>import('./views/blogCategory/BlogCategory.js'));
const BlogCategoryList = React.lazy(()=> import('./views/blogCategory/BlogCategoryList.js'));
const Career = React.lazy(()=> import('./views/career/AddCareer.jsx'))
const CareerList = React.lazy(()=> import('./views/career/CareerList.jsx'));
const Team = React.lazy(()=> import('./views/Team/Team.jsx'));
const Video = React.lazy(()=> import('./views/video/Video.jsx'));

const routes = [
  // { path: '/user', name: 'User', element: User },
  { path: '/propertyList', name: 'ProductList', element: PropertyList },
  { path: '/property', name: 'Product', element: Property },
  { path: '/testimonialList', name: 'TestimonialList', element: TestimonialList },
  { path: '/testimonial', name: 'Testimonial', element: Testimonial },
  { path: '/categoryList', name: 'CategoryList', element: CategoryList },
  { path: '/category', name: 'Category', element: Category },
  { path: '/bannerList', name: 'BannerList', element: BannerList },
  { path: '/banner', name: 'Banner', element: Banner },
  { path: '/blogList', name: 'BlogList', element: BlogList },
  { path: '/blog', name: 'Blog', element: Blog },
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  // @atul
  { path: '/callback', name: 'Callback', element: Callback },
  { path: '/faq', name: 'Dashboard', element: Faq },
  { path: '/faqList', name: 'Theme', element: FaqList,},
  { path: '/staticPage', name: 'Colors', element: StaticPage },
  { path: '/staticPageList', name: 'Colors', element: StaticPageList },
  { path: '/contactInfo', name: 'contactInfo', element: ContactInfo },
  { path: '/event', name: 'Dashboard', element: Event },
  { path: '/eventList', name: 'Dashboard', element: EventList }, 
  // { path: '/eventCategory', name: 'Dashboard', element: EventCategory },
  // { path: '/eventCategoryList', name: 'Dashboard', element: EventCategoryList },
  // { path: '/blogCategory', name: 'Dashboard', element: BlogCategory },
  // { path: '/blogCategoryList', name: 'Dashboard', element: BlogCategoryList },
  { path: '/addCareer', name: 'Dashboard', element: Career }, 
  { path: '/careerList', name: 'Dashboard', element: CareerList},
  { path: '/team', name: 'Dashboard', element: Team }, 
  { path: '/video', name: 'Video', element: Video },



 
  
]

export default routes
