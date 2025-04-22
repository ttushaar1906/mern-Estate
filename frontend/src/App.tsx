import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import AboutUs from "./pages/AboutUs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotAvailable from "./components/NotAvailable";
import ContactUs from "./pages/ContactUs";
import Properties from "./pages/Properties";

export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="notAvailable" element={<NotAvailable />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="properties" element={<Properties />} />


        {/* <Route path="user/:userId" element={<User />} /> */}
        {/* <Route path="github" element={<Github />} loader={gitHubLoader} /> */}
      </Route>
    ))
   

  return (
       <RouterProvider router={router} />
  )
}
