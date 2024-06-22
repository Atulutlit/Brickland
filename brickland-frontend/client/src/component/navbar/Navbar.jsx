import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", current: false, path: "/" },
  { name: "About", current: false, path: "/aboutus" },
  { name: "Property", current: false, path: "/search" },
  // { name: "Wishlist", current: false, path: "/wishlist" },
  { name: "Event", current: false, path: "/event" },
  { name: "Blogs", current: false, path: "/blog" },
  { name: "career", current: false, path: "/career" },
  { name: "Testimonial", current: false, path: "/testimonial" },
  { name: "Contact us", current: false, path: "/contactus" }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  
  return (
    <Disclosure
      as="nav"
      className="shadow-lg z-20"
      style={{ background: "var(--white)", position: "sticky", top: 0 }}
    >
      {({ open }) => (
        <>
        <div className="top-header-area">
  <div className="container-fluid">
    <div className="top-header-inner">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-7 col-md-7">
          <ul className="top-header-info-with-social">
            <li>
              <div className="social">
                <a href="https://www.facebook.com/" >
                  <i className="ri-facebook-fill" />
                </a>
                <a href="https://twitter.com/" >
                  <i className="ri-twitter-x-line" />
                </a>
                <a href="https://www.instagram.com/" >
                  <i className="ri-instagram-fill" />
                </a>
                <a href="https://bd.linkedin.com/" >
                  <i className="ri-linkedin-fill" />
                </a>
                <a href="https://www.youtube.com/" >
                  <i className="ri-youtube-line" />
                </a>
                <a href="https://www.pinterest.com/" >
                  <i className="ri-pinterest-line" />
                </a>
              </div>
            </li>
            <li>
              <div className="mail-info">
                <i className="ri-mail-line" />
                <a href="mailto:info@bricklandindia.com">info@bricklandindia.com</a>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-lg-5 col-md-5 text-end">
          <div className="top-header-call-info">
            <i className="ri-phone-line" />
            <a href="tel:+91 88 6900 3900">+91 88 6900 3900</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

          <div className="mx-auto  px-5 sm:px-6 lg:px-8 ml-0">
            <div className="relative flex h-20   items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center  rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon
                      className="block h-6 w-6 "
                      aria-hidden="true"
                      style={{ color: "black" }}
                    />
                  ) : (
                    <Bars3Icon
                      className="block h-6 w-6"
                      aria-hidden="true"
                      style={{ color: "black" }}
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center menubars sm:items-stretch sm:justify-start w-full">
                <div className="flex lg:min-w-min lg:flex-1">
                  <Link to="/">
                    <img
                      className="h-auto max-h-12 w-auto max-w-full"
                      src="https://firebasestorage.googleapis.com/v0/b/brickland-76c23.appspot.com/o/Brickland-Consulting-Logo.png?alt=media&token=f56d0e29-d696-4727-8ef9-abe9a657fb92"
                      alt="Your Company"
                    />
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="flex gap-3">
                    {navigation.map((item) => (
                      <Typography
                        component={Link}
                        key={item.name}
                        to={item.path}
                        className={classNames(
                          item.current
                            ? "bg-[#B07C4D] text-white hover:bg-[black] hover:text-white"
                            : "text-black hover:bg-[#B07C4D] hover:text-white",
                          "rounded-full px-6  py-2 text-sm "
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Typography>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-black hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>     
      )}
    </Disclosure>
  );
}
