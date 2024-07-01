import {
  Box,
  Container,
  Grid,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import PlaceIcon from "@mui/icons-material/Place";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import LanguageIcon from "@mui/icons-material/Language";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import axios from "axios";
import { GET_CONTACT_INFO } from "../../constant/Constant";
import { Link } from "react-router-dom";
export default function Footer() {
  const [showWhatsAppIcon, setShowWhatsAppIcon] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowWhatsAppIcon(true);
      } else {
        setShowWhatsAppIcon(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const openWhatsAppChat = () => {
    const whatsappNumber = "+918869003900";
    window.open(`https://wa.me/${whatsappNumber}`, "_blank");
  };

  const [contactInfo, setContactInfo] = useState(null);

  const fetchContactInfo = async (e) => {
    try {
      const url = GET_CONTACT_INFO;
      const response = await axios.get(url);
      console.log(response, 'response');
      setContactInfo(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error("Error fetch contactInformation:", error);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, [])

  return (
    <>
      <Box
        sx={{
          background: `url(https://firebasestorage.googleapis.com/v0/b/brickland-76c23.appspot.com/o/footer.jpg?alt=media&token=bef0afed-ee16-4ca9-a02b-0e3e854182b0)`,
          backgroundSize: "cover",
          opacity: 3.0,
          backgroundcolor: "",
        }}
      >
        <Container maxWidth="xl">
          <Grid container py={3}>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <Stack>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start w-full">
                  <div className="flex lg:min-w-min lg:flex-1">
                    <img
                      className="w-[250px] h-[60px] "
                      src="https://firebasestorage.googleapis.com/v0/b/brickland-76c23.appspot.com/o/Brickland-Consulting-Logo.png?alt=media&token=f56d0e29-d696-4727-8ef9-abe9a657fb92"
                      alt="Your Company"
                    />
                  </div>
                </div>
              </Stack>
              <br />
              <Stack direction={"row"} alignItems={"center"}>
                <Typography color="white">
                  Brickland Consulting is one of the leading
                  <br />
                  real estate company, providing complete real
                  <br />
                  estate solutions to meet a wide range of customer
                  <br />
                  needs.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton></IconButton>
                <Typography variant="h5" color="white">
                  {" "}
                  Quick Links{" "}
                </Typography>
              </Stack>
              <br />
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton>
                  <NavigateNextIcon />
                </IconButton>
                <Typography
                  color="white"
                  component={Link}
                  to="/aboutus"
                  sx={{ "&:hover": { color: "var(--color-pink)" } }}
                  className="cursor-pointer"
                >
                  About Us{" "}
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton>
                  <NavigateNextIcon />
                </IconButton>
                <Typography
                  color="white"
                  component={Link}
                  to="/privacy"
                  sx={{ "&:hover": { color: "var(--color-pink)" } }}
                  className="cursor-pointer"
                >
                  Privacy Policy
                </Typography>
              </Stack>

              <Stack direction={"row"} alignItems={"center"}>
                <IconButton>
                  <NavigateNextIcon />
                </IconButton>
                <Typography
                  color="white"
                  component={Link}
                  to="/contactus"
                  sx={{ "&:hover": { color: "var(--color-pink)" } }}
                  className="cursor-pointer"
                >
                  Contact Us
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton></IconButton>
                <Typography variant="h5" color="white">
                  Contact{" "}
                </Typography>
              </Stack>
              <br />
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton color="white">
                  <PlaceIcon style={{ color: "white" }} />
                </IconButton>
                <Typography color="white">
                  {contactInfo?.address?contactInfo?.address:"511, Floor P5, Urbtech NPX Tower, Sector 153, Noida 201310"}
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton>
                  <CallIcon style={{ color: "white" }} />
                </IconButton>
                <Typography color="white">+91 88 6900 3900</Typography>
              </Stack>


            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3} xl={3}>
            <Stack direction={"row"} alignItems={"center"}>
                <IconButton></IconButton>
                <Typography variant="h5" color="white">
                  {" "}
                </Typography>
              </Stack>
              <br />
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton>
                  <EmailIcon style={{ color: "white" }} />
                </IconButton>
                <Typography color="white">
                  <Link to="mailto:info@bricklandindia.com">
                    info@bricklandindia.com
                  </Link>
                </Typography>
              </Stack>
              <Stack direction={"row"} alignItems={"center"}>
                <IconButton>
                  <LanguageIcon style={{ color: "white" }} />
                </IconButton>
                <Typography color="white">
                  <Link to="https://bricklandindia.com/">
                    https://bricklandindia.com/
                  </Link>{" "}
                </Typography>
              </Stack>
              
              <Stack
                direction={"row"}
                alignItems={"center"}
                sx={{ mt: 5 }}
                spacing={3}
              >
                <IconButton
                  component={Link}
                  to={contactInfo?.facebookLink}
                  target="_blank"
                >
                  <FacebookIcon fontSize="large" style={{ color: "white" }} />
                </IconButton>
                <IconButton
                  sx={{ color: "#0a66c2" }}
                  component={Link}
                  to={contactInfo?.linkedInLink}
                  target="_blank"
                >
                  <LinkedInIcon fontSize="large" style={{ color: "white" }} />
                </IconButton>
                <IconButton
                  sx={{ color: "#c13584" }}
                  component={Link}
                  to={contactInfo?.instagramLink}
                  target="_blank"
                >
                  <InstagramIcon fontSize="large" style={{ color: "white" }} />
                </IconButton>
              </Stack>
              {/* <Stack color="white">We never spam you!</Stack> */}
            </Grid>
          </Grid>
          <Box sx={{ py: 3 }}>
            <Stack>
              <Typography
                color="white"
                sx={{ textAlign: "center" }}
                className="cursor-pointer"
              >
                © Copyrights 2019-2024.All Rights Reserved.
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          cursor: "pointer",
          padding: "10px",
          backgroundColor: "#25D366",
          borderRadius: "50%",
          zIndex: 50,
          transform: isHovered ? "rotate(-90deg)" : "rotate(0deg)",
          transition: "transform 0.3s ease",
        }}
        onClick={openWhatsAppChat}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <WhatsAppIcon fontSize="large" style={{ color: "#fff" }} />
      </Box>
    </>
  );
}
