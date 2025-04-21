import {  Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import AboutUs from "./pages/AboutUs";

export default function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="about" element={<AboutUs />} />
        {/* <Route path="contact" element={<Contact />} /> */}
        {/* <Route path="user/:userId" element={<User />} /> */}
        {/* <Route path="github" element={<Github />} loader={gitHubLoader} /> */}
      </Route>
    ))
   

  return (
       <RouterProvider router={router} />
  )
}
