import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import AboutUs from "./pages/AboutUs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotAvailable from "./components/NotAvailable";
import ContactUs from "./pages/ContactUs";
import Properties from "./pages/Properties";
import User from "./pages/User";
import PropertyDetails from "./components/PropertyDetails";
import AddPropertyForm from "./components/AddPropertyForm";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userDetailsFn } from "./controllers/Users/loginUser";
import { signInSuccess } from "./redux/User/userSlice";

export default function App() {
 const dispatch = useDispatch();
  useEffect(() => {
  const restoreUser = async () => {
    try {
      const res = await userDetailsFn();       
      dispatch(signInSuccess(res.data[0]));
    } catch (err) {
      console.error("User restore failed", err);
      // optional: redirect to login
    }
  };
  restoreUser();
}, []);

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
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/addProperty" element={<AddPropertyForm />} />

        <Route path="user" element={<User />} />
      </Route>
    ))


  return (
    <RouterProvider router={router} />
  )
}
