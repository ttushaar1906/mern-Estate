import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ["/signIn" , "/signUp" , "/notAvailable" , "/forgetPassword"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
     <ScrollToTop />
     {!shouldHideNavbar && <Navbar  />}
    <Outlet />
    {!shouldHideNavbar && <Footer />}
    </>
  )
}