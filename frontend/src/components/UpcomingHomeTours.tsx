import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import Error from "./Error";
import { viewHomeTourFn } from "../controllers/HomeTour/homeTour";
import { AiOutlineEnvironment } from "react-icons/ai";
import { IoTimeOutline } from "react-icons/io5";
import { MdDateRange, MdDelete, MdPerson } from "react-icons/md";
import axios from "axios";
import { cancelHomeTour } from "../apis/homeTour";
import Notification from "./Notification";
import { useState } from "react";
import { SnackBarState } from "../interfaces/NotificationInt";
import { scheduleHomeTourInt } from "../interfaces/ScheduleHomeTour";

export default function UpcomingHomeTours() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["homeTours"],
    queryFn: viewHomeTourFn,
    retry: false,
  });

  const [snackBar, setSnackBar] = useState<SnackBarState>({
    open: false,
    severity: "info",
    message: "",
    autoHideDuration: 3000
  });

 const handleCancelTour = async (tourId: string) => {
  try {
    const response = await axios.patch(cancelHomeTour(tourId), null, {
      withCredentials: true,
    });

    setSnackBar({
      open: true,
      message: `${response.data.message}`,
      severity: "success",
      autoHideDuration: 3000,
    });

    // ✅ Refresh the tour list
    // QueryClient.invalidateQueries(["homeTours"]);
  } catch (error) {
    console.error("Error cancelling tour:", error);
    setSnackBar({
      open: true,
      message: `Failed to cancel home visit`,
      severity: "error",
      autoHideDuration: 3000,
    });
  }
};


  const formatAddress = (address:any) => {
    const parts = [
      address.line1,
      address.line2,
      address.city,
      address.state,
      address.postalCode
    ].filter(part => part && part.trim() !== '');

    return parts.join(', ');
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error message="No Home Tour found for this user" />;

  return (
    // <section className="min-h-screen ">
      <section className="max-w-7xl mx-auto mb-4">
        <div className="text-center mb-4 p-4">
          <h1 className="mdHead text-center">
            Upcoming Home Tours
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {data.map((tour:scheduleHomeTourInt, index:any) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden border border-gray-100"
            >
              {/* Property Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tour.propertyImg}
                  alt={tour.visitingPropertyName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  {tour.isCancelled === false ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Confirmed
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Cancelled
                    </span>
                  )}

                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Property Name and Cancel Button */}
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 leading-tight pr-2">
                    {tour.visitingPropertyName}
                  </h2>
                  <button
                    disabled={tour.isCancelled === true}
                    onClick={() => handleCancelTour(tour._id)}
                    className={`text-red-400 hover:text-red-700 hover:bg-red-50 rounded-full p-2 transition-colors duration-200 flex-shrink-0 ${tour.isCancelled ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    title="Cancel Tour"
                  >
                    <MdDelete className="text-lg" />
                  </button>

                </div>

                {/* Address */}
                <div className="flex items-start text-gray-600 mb-4">
                  <AiOutlineEnvironment className="text-lg text-gray-700 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">
                    {formatAddress(tour.propertyAddress)}
                  </p>
                </div>

                {/* Visit Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl">
                    <div className="flex items-center text-blue-700">
                      <MdDateRange className="text-lg mr-2" />
                      <span className="text-sm font-medium">Date</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {tour.visitingDate}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl">
                    <div className="flex items-center text-green-700">
                      <IoTimeOutline className="text-lg mr-2" />
                      <span className="text-sm font-medium">Time</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {tour.visitingTime}
                    </span>
                  </div>

                  {tour.noOfVisitingPeople && (
                    <div className="flex items-center justify-between p-3 rounded-xl">
                      <div className="flex items-center text-purple-700">
                        <MdPerson className="text-lg mr-2" />
                        <span className="text-sm font-medium">Visitors</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        {tour.noOfVisitingPeople} peoples
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdDateRange className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No upcoming tours
            </h3>
            <p className="text-gray-600">
              Schedule your first property visit to get started
            </p>
          </div>
        )}
      {/* </div> */}
      {snackBar.open && (
        <Notification
          open={snackBar.open}
          severity={snackBar.severity}
          message={snackBar.message}
          onClose={() => setSnackBar({ ...snackBar, open: false })}
          autoHideDuration={snackBar.autoHideDuration}
        />
      )}
    </section>
  );
}