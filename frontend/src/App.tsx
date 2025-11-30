import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { userDetailsFn } from "./controllers/Users/loginUser";
import { signInSuccess } from "./redux/User/userSlice";
import Layout from "./components/Layout";
import Loading from "./components/Loading"; // 👈 your custom loader

// ✅ Lazy load all pages
const Home = lazy(() => import("./pages/Home"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const NotAvailable = lazy(() => import("./components/NotAvailable"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const Properties = lazy(() => import("./pages/Properties"));
const User = lazy(() => import("./pages/User"));
const PropertyDetails = lazy(() => import("./components/PropertyDetails"));
const ScheduleHomeTour = lazy(() => import("./components/ScheduleHomeTour"));
const AddPropertyForm = lazy(() => import("./components/AddPropertyForm"));
const UpdatePropertyForm = lazy(() => import("./components/UpdatePropertyForm"));

// ✅ HOC for Suspense wrapping
const Loadable = <P extends object>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P) => (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );
  return WrappedComponent;
};

// ✅ Wrap components with Loadable
const LoadableHome = Loadable(Home);
const LoadableAbout = Loadable(AboutUs);
const LoadableSignIn = Loadable(SignIn);
const LoadableSignUp = Loadable(SignUp);
const LoadableForgetPassword = Loadable(ForgetPassword);
const LoadableNotAvailable = Loadable(NotAvailable);
const LoadableContactUs = Loadable(ContactUs);
const LoadableProperties = Loadable(Properties);
const LoadableUser = Loadable(User);
const LoadablePropertyDetails = Loadable(PropertyDetails);
const LoadableScheduleHomeTour = Loadable(ScheduleHomeTour);
const LoadableAddProperty = Loadable(AddPropertyForm);
const LoadableUpdateProperty = Loadable(UpdatePropertyForm);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await userDetailsFn();
        if (res?.data?.[0]) {
          dispatch(signInSuccess(res.data[0]));
        }
      } catch (err) {
        console.error("User restore failed", err);
      }
    };
    restoreUser();
  }, [dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<LoadableHome />} />
        <Route path="about" element={<LoadableAbout />} />
        <Route path="signIn" element={<LoadableSignIn />} />
        <Route path="signUp" element={<LoadableSignUp />} />
        <Route path="forgetPassword" element={<LoadableForgetPassword />} />
        <Route path="notAvailable" element={<LoadableNotAvailable />} />
        <Route path="contactUs" element={<LoadableContactUs />} />
        <Route path="properties" element={<LoadableProperties />} />
        <Route path="property/:id" element={<LoadablePropertyDetails />} />
        <Route
          path="property/:id/scheduleHomeTour"
          element={<LoadableScheduleHomeTour />}
        />
        <Route path="addProperty" element={<LoadableAddProperty />} />
        <Route
          path="property/editProperty/:id"
          element={<LoadableUpdateProperty />}
        />
        <Route path="user" element={<LoadableUser />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}
