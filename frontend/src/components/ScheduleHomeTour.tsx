import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { scheduleHomeTourFn } from "../controllers/HomeTour/homeTour";
import { FaHome } from "react-icons/fa";
import { FaCalendar, FaClock, FaLocationDot, FaUser, FaUsers } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { SnackBarState } from "../interfaces/NotificationInt";
import Notification from "./Notification";
import Error from "./Error";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ScheduleHomeTour() {
    const propertyDetails = useSelector((state: any) => state.property.currentProperty);
    if (!propertyDetails) {
        return <Error />
    }

    const navigate = useNavigate()

    const [snackBar, setSnackBar] = useState<SnackBarState>({
        open: false,
        severity: "info",
        message: "",
        autoHideDuration: 3000
    });

    const [formData, setFormData] = useState({
        visitorName: "",
        noOfVisitingPeople: 0,
        visitingTime: "",
        visitingDate: "",
        visitingPropertyName: "",
        propertyImg: "",
        propertyAddress: {
            line1: "",
            line2: "",
            city: "",
            state: "",
            postalCode: "",
        },
        isCancelled: false,
        _id: ""
    });

    const { mutate, isPending } = useMutation({
        mutationFn: scheduleHomeTourFn,
        onSuccess: () => {
            setSnackBar({
                open: true,
                message: "Schedule Booked for home tour",
                severity: "success",
                autoHideDuration: 3000
            })
            setFormData({
                visitorName: "",
                noOfVisitingPeople: 0,
                visitingTime: "",
                visitingDate: "",
                visitingPropertyName: "",
                propertyImg: "",
                propertyAddress: {
                    line1: "",
                    line2: "",
                    city: "",
                    state: "",
                    postalCode: "",
                },
                isCancelled: false,
                _id: ""

            })

            setTimeout(() => {
                navigate("/user")
            }, 1000)
        },
        onError: (error: any) => {
            console.log(error.response.data.message);

            setSnackBar({
                open: true,
                message: `${error?.response.data.message || error.response.data || "Failed to Schedule home tour"}`,
                // message: "Failed to Schedule home tour",
                severity: "error",
                autoHideDuration: 3000
            })
        }
    });

    useEffect(() => {
        if (propertyDetails) {
            setFormData(prev => ({
                ...prev,
                visitingPropertyName: propertyDetails.propertyName || "",
                propertyImg: propertyDetails.images?.[0]?.url || "",
                propertyAddress: {
                    line1: propertyDetails.address?.line1 || "",
                    line2: propertyDetails.address?.line2 || "",
                    city: propertyDetails.address?.city || "",
                    state: propertyDetails.address?.state || "",
                    postalCode: propertyDetails.address?.postalCode || ""
                }
            }));
        }
    }, [propertyDetails]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (["line1", "line2", "city", "state", "postalCode"].includes(name)) {
            setFormData(prev => ({
                ...prev,
                propertyAddress: {
                    ...prev.propertyAddress,
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === "noOfVisitingPeople" ? +value : value
            }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="lgHeading">
                        Schedule Your Home Tour
                    </h1>
                    <p className="text-gray-600 text-lg">Book a personalized viewing experience</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Property Image and Details */}
                    <div className="space-y-6">
                        {propertyDetails?.images[0].url && (
                            <div className="relative group">
                                <img
                                    src={propertyDetails?.images[0].url}
                                    alt="Property"
                                    className="w-full h-80 rounded-2xl object-cover shadow-2xl transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-xl font-semibold mb-1">{formData.visitingPropertyName}</h3>
                                    <p className="text-white/90 flex items-center gap-2">
                                        <FaLocationDot className="w-4 h-4" />
                                        {formData.propertyAddress.city}, {formData.propertyAddress.state}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Property Highlights */}
                        <div className="bg-white rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <FaHome className="w-5 h-5 text-cyan-600" />
                                Property Details
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Property Type</span>
                                    <span className="font-medium">Luxury Villa</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Bedrooms</span>
                                    <span className="font-medium">4</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Bathrooms</span>
                                    <span className="font-medium">3</span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Area</span>
                                    <span className="font-medium">2,500 sq ft</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800">Book Your Visit</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-6 sm:space-y-2">
                                    <label className="scheduleTourLabel">
                                        <FaUser className="w-4 h-4 text-cyan-600" />
                                        Visitor Name
                                    </label>
                                    <input
                                        type="text"
                                        name="visitorName"
                                        value={formData.visitorName}
                                        onChange={handleChange}
                                        className="scheduleTourInput"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>

                                <input type="text" value={formData.propertyImg} className="hidden" placeholder="image" />

                                <div className="space-y-6 sm:space-y-2">
                                    <label className="scheduleTourLabel">
                                        <FaUsers className="w-4 h-4 text-cyan-600" />
                                        Number of Visitors
                                    </label>
                                    <input
                                        type="number"
                                        name="noOfVisitingPeople"
                                        value={formData.noOfVisitingPeople}
                                        onChange={handleChange}
                                        className="scheduleTourInput"
                                        placeholder="1"
                                        min="1"
                                        max="10"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Date and Time */}
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-6 sm:space-y-2">
                                    <label className="scheduleTourLabel">
                                        <FaCalendar className="w-4 h-4 text-cyan-600" />
                                        Visiting Date
                                    </label>
                                    <input
                                        type="date"
                                        name="visitingDate"
                                        value={formData.visitingDate}
                                        onChange={handleChange}
                                        min={today}
                                        className="scheduleTourInput"
                                        placeholder="Visiting Date"
                                        required
                                    />
                                </div>

                                <div className="space-y-6 sm:space-y-2">
                                    <label className="scheduleTourLabel">
                                        <FaClock className="w-4 h-4 text-cyan-600" />
                                        Visiting Time
                                    </label>
                                    <input
                                        type="time"
                                        name="visitingTime"
                                        value={formData.visitingTime}
                                        onChange={handleChange}
                                        className="scheduleTourInput"
                                        placeholder="Visiting Time"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Property Information */}
                            <div className="space-y-4">
                                <div className="space-y-6 sm:space-y-2">
                                    <label className="scheduleTourLabel">
                                        <FaHome className="w-4 h-4 text-cyan-600" />
                                        Property Name
                                    </label>
                                    <input
                                        type="text"
                                        name="visitingPropertyName"
                                        value={formData.visitingPropertyName}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-600"
                                        placeholder="Property Name"
                                        readOnly
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-6 sm:space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Address Line 1</label>
                                        <input
                                            type="text"
                                            name="line1"
                                            value={formData.propertyAddress.line1}
                                            onChange={handleChange}
                                            className="scheduleTourInput"
                                            placeholder="Street address"
                                            readOnly
                                        />
                                    </div>

                                    <div className="space-y-6 sm:space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Address Line 2</label>
                                        <input
                                            type="text"
                                            name="line2"
                                            value={formData.propertyAddress.line2}
                                            onChange={handleChange}
                                            className="scheduleTourInput"
                                            placeholder="Apartment, suite, etc."
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-6 sm:space-y-2">
                                        <label className="text-sm font-medium text-gray-700">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.propertyAddress.city}
                                            onChange={handleChange}
                                            className="scheduleTourInput"
                                            placeholder="City"
                                            readOnly
                                        />
                                    </div>

                                    <div className="space-y-6 sm:space-y-2">
                                        <label className="text-sm font-medium text-gray-700">State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.propertyAddress.state}
                                            onChange={handleChange}
                                            className="scheduleTourInput"
                                            placeholder="State"
                                            readOnly
                                        />
                                    </div>

                                    <div className="space-y-6 sm:space-y-2">
                                        <label className="text-sm font-medium text-gray-700">Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.propertyAddress.postalCode}
                                            onChange={handleChange}
                                            className="scheduleTourInput"
                                            placeholder="ZIP code"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full buttonStyle font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <CircularProgress size={18} className="text-white" />
                                ) : (
                                    <>
                                        <IoIosSend className="w-5 h-5" />
                                        Schedule Now
                                    </>
                                )}
                            </button>

                        </form>
                    </div>
                </div>
            </div>
            {snackBar.open && (
                <Notification
                    open={snackBar.open}
                    severity={snackBar.severity}
                    message={snackBar.message}
                    onClose={() => setSnackBar({ ...snackBar, open: false })}
                    autoHideDuration={snackBar.autoHideDuration}
                />
            )}
        </div>
    );
}
