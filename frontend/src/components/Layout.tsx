
// import Header from "./Components/Header/Header"
// import Footer from "./Components/Footer/Footer"
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/signIn" , "/signUp" , "/notAvailable"];
  
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
     {!shouldHideNavbar && <Navbar />}
    <Outlet />
    {!shouldHideNavbar && <Footer />}
    </>
  )
}