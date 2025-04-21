
// import Header from "./Components/Header/Header"
// import Footer from "./Components/Footer/Footer"
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <>
    <Navbar />
    <Outlet />
    {/* <Footer /> */}
    </>
  )
}