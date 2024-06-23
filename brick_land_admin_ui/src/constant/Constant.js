const BASE_URL = "http://localhost:3310"
// VITE_ADMIN_URL = https://api.naturesnook.co.in/api/
// const BASE_URL = "https://api.naturesnook.co.in/api/"

// admin routes
export const ADMIN_LOGIN = BASE_URL + "/login"
export const ADMIN_PROFILE = BASE_URL + "/profile"
export const ADMIN_LOGOUT = BASE_URL + "/logout"
export const ADMIN_RESET_PASSWORD = BASE_URL + "/reset/password"

// upload routes
export const UPLOAD_IMAGE = BASE_URL + "/upload/image"
export const UPLOAD_IMAGES = BASE_URL + "/upload/images"
export const UPLOAD_VIDEO = BASE_URL + "/upload/video"
export const UPLOAD_VIDEOS = BASE_URL + "/upload/videos"
export const UPLOAD_DOC = BASE_URL + "/upload/doc"
export const UPLOAD_DOCS = BASE_URL + "/upload/docs"
export const DELETE_FILE = BASE_URL + "/upload/delete"


// event category
export const EVENT_CREATE = BASE_URL + "/event/category/add"
export const EVENT_LIST = BASE_URL + "/event/category/list"
export const EVENT_DETAILS = BASE_URL + "/event/category/details"
export const EVENT_SUBCATEGORY_LIST = BASE_URL + "/subcategory/list"
export const EVENT_UPDATE = BASE_URL + "/event/category/update"
export const EVENT_STATUS = BASE_URL + "/event/category/status"
export const EVENT_DELETE = BASE_URL + "/event/category/delete"


// Blog Category
export const BLOG_CREATE = BASE_URL + "/blog/add"
export const BLOG_LIST = BASE_URL + "/blog/list"
export const BLOG_DETAILS = BASE_URL + "/blog/details"
export const BLOG_SUBCATEGORY_LIST = BASE_URL + "/blog/subcategory/list"
export const BLOG_UPDATE = BASE_URL + "/blog/update"
export const BLOG_STATUS = BASE_URL + "/blog/status"
export const BLOG_DELETE = BASE_URL + "/blog/delete"

// FAQ
export const FAQ_CREATE = BASE_URL + "/faq/add"
export const FAQ_LIST = BASE_URL + "/faq/list"
export const FAQ_DETAILS = BASE_URL + "/faq/details"
export const FAQ_UPDATE = BASE_URL + "/faq/update"
export const FAQ_STATUS = BASE_URL + "/faq/status"
export const FAQ_DELETE = BASE_URL + "/fa/delete"

// ADD
export const PAGE_CREATE = BASE_URL + "/page/add"
export const PAGE_LIST = BASE_URL + "/page/list"
export const PAGE_DETAILS = BASE_URL + "/page/details"
export const PAGE_UPDATE = BASE_URL + "/page/update"
export const PAGE_STATUS = BASE_URL + "/page/status"
export const PAGE_DELETE = BASE_URL + "/page/delete"

// testimonials
export const TESTIMONIALS_CREATE = BASE_URL + "/testimonials/add"
export const TESTIMONIALS_LIST = BASE_URL + "/testimonials/list"
export const TESTIMONIALS_DETAILS = BASE_URL + "/testimonials/details"
export const TESTIMONIALS_UPDATE = BASE_URL + "/testimonials/update"
export const TESTIMONIALS_DELETE = BASE_URL + "/testimonials/delete"

// product
export const PRODUCT_CREATE = BASE_URL + "/product/add"
export const PRODUCT_LIST = BASE_URL + "/product/list"
export const PRODUCT_DETAILS = BASE_URL + "/product/details"
export const PRODUCT_UPDATE = BASE_URL + "/product/update"
export const PRODUCT_STATUS = BASE_URL + "/product/status"
export const PRODUCT_STATE = BASE_URL + "/product/state"
export const PRODUCT_DELETE = BASE_URL + "/product/delete"
export const PRODUCT_STOCK_UPDATE= BASE_URL + "/product/stock"
export const PROduct_STOCK_DELETE = BASE_URL + "/product/stock"

// callback
export const CALLBACK_LIST = BASE_URL + "/callback/list"
export const CALLBACK_DETAILS = BASE_URL + "/callback/details"
export const CALLBACK_STATUS = BASE_URL + "/callback/status"
export const CALLBACK_DELETE = BASE_URL + "/callback/delete"

// user
export const USER_LIST = BASE_URL + "/user/list"
export const USER_STATUS = BASE_URL + "/user/status"
export const USER_DETAILS = BASE_URL + "/user/details"