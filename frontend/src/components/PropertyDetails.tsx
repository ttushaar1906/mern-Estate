import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPropertyFn } from "../controllers/Property/getProperty";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { FaBuilding, FaDog, FaIndustry, FaLocationDot, FaPersonSwimming, FaRestroom, FaSquareParking } from "react-icons/fa6";
import { GiCctvCamera, GiElevator, GiPoliceOfficerHead, GiVillage } from "react-icons/gi";
import { MdBalcony, MdBedroomChild, MdLiving, MdSportsCricket } from "react-icons/md";
import { BsFillBuildingsFill, BsFillHouseHeartFill } from "react-icons/bs";
import sqFT from "../images/sqft.png"
import Balcony from "../images/balcony.png"
import { LuLandPlot } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { viewPropertySuccess } from "../redux/User/propertySlice";

export default function PropertyDetails() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["property", id],
        queryFn: () => getPropertyFn(id!),
        enabled: !!id,
    });

    const dispatch = useDispatch()

    if (isLoading) return <Loading />;
    if (isError) return <Error />;

    const property = data?.data;
    console.log(property);

    //   const handleBookHomeTour = (e: React.FormEvent<HTMLFormElement>) => {
    //   e.preventDefault();
    //   dispatch(viewPropertySuccess(property));
    // }; //! For form onCLick use this

    const handleBookHomeTour = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        dispatch(viewPropertySuccess(property));
    };


    const featureIcons = [
        { key: 'parking', icon: <FaSquareParking size={24} />, label: 'Parking', color: 'text-slate-500 ' },
        { key: 'petFriendly', icon: <FaDog size={24} />, label: 'Pet Friendly', color: 'text-slate-500' },
        { key: 'cctv', icon: <GiCctvCamera size={24} />, label: 'CCTV', color: 'text-slate-500' },
        { key: 'publicToilet', icon: <FaRestroom size={24} />, label: 'Public Restroom', color: 'text-slate-500' },
        { key: 'security', icon: <GiPoliceOfficerHead size={24} />, label: 'Security', color: 'text-slate-500' },
        { key: 'swimmingPool', icon: <FaPersonSwimming size={24} />, label: 'Swimming Pool', color: 'text-slate-500' },
        { key: 'clubHouse', icon: <BsFillHouseHeartFill size={24} />, label: 'Club House', color: 'text-slate-500' },
        { key: 'playGround', icon: <MdSportsCricket size={24} />, label: 'Play Ground', color: 'text-slate-500' },
        { key: 'lift', icon: <GiElevator size={24} />, label: 'Lift', color: 'text-slate-500' },
        { key: 'balcony', icon: <MdBalcony size={24} />, label: 'Balcony', color: 'text-slate-500' }

    ];

    return (
        <section className="customeContainer p-4 ">

            <div className="paraStyle">
                <Link to="/">Home</Link>
                {" -> "}
                <Link to="/properties">Property</Link>
                {" -> "}
                {property.propertyName}
            </div>

            <div className="flex justify-evenly items-center flex-wrap sm:flex-nowrap sm:gap-6">
                <div className="sm:w-1/2">
                    <img
                        src={property.images[0]?.url}
                        className="w-full sm:h-70 object-cover my-4"
                        alt={property.propertyName}
                    />
                </div>

                <div className="sm:w-1/2">
                    {property.images.length >= 4 && (
                        <>
                            <div>
                                <img
                                    src={property.images[1]?.url}
                                    className="w-[90%] sm:h-20 object-cover my-4"
                                    alt={property.propertyName}
                                />
                            </div>
                            <div>
                                <img
                                    src={property.images[2]?.url}
                                    className="w-[90%] sm:h-20 object-cover my-4"
                                    alt={property.propertyName}
                                />
                            </div>
                            <div>
                                <img
                                    src={property.images[3]?.url}
                                    className="w-[90%] sm:h-20 object-cover my-4"
                                    alt={property.propertyName}
                                />
                            </div>
                        </>
                    )}

                    {property.images.length === 3 && (
                        <>
                            <div>
                                <img
                                    src={property.images[1]?.url}
                                    className="w-[90%] sm:h-30 object-cover my-4"
                                    alt={property.propertyName}
                                />
                            </div>
                            <div>
                                <img
                                    src={property.images[2]?.url}
                                    className="w-[90%] sm:h-30 object-cover my-4"
                                    alt={property.propertyName}
                                />
                            </div>
                        </>
                    )}

                    {property.images.length === 2 && (
                        <div>
                            <img
                                src={property.images[1]?.url}
                                className="w-full sm:h-70 object-cover my-4"
                                alt={property.propertyName}
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white p-2 sm:p-6 rounded-xl shadow-sm space-y-4">
                <h1 className="text-2xl font-semibold text-slate-700">{property.propertyName}</h1>

                <p className="text-slate-600">{property.propertyDesc}</p>

                <div className="flex sm:items-center flex-col sm:flex-row py-2 gap-2">
                    {property.features.propertyType === "residential" ? <div className="flex items-center gap-2 text-slate-700"> <FaBuilding /> Residential Proptery at </div> : property.features.propertyType === "commercial" ?
                        <div className="flex items-center gap-2 text-slate-700"> <BsFillBuildingsFill />  Commercial Proptery at </div>
                        : property.features.propertyType === "villas" ?
                            <div className="flex items-center gap-2 text-slate-700">  <GiVillage /> Villa Proptery at </div>
                            : property.features.propertyType === "industrial" ?
                                <div className="flex items-center gap-2 text-slate-700"> <FaIndustry /> Industrial Proptery at </div>
                                : <div className="flex items-center gap-2 text-slate-700"> <LuLandPlot /> Plot at </div>
                    }

                    <p className="text-slate-700">
                        <span className="font-medium">Price:</span>{" "}
                        {property.discountedPrice && property.discountedPrice < property.price && property.discountedPrice > 0 ? (
                            <>
                                <span className="line-through mr-2 text-red-500 text-sm">
                                    ₹{property.price.toLocaleString()}
                                </span>
                                <span className="font-semibold text-slate-700">
                                    ₹{property.discountedPrice.toLocaleString()}
                                </span>
                            </>
                        ) : (
                            <span className="font-semibold text-slate-700">
                                ₹{property.price.toLocaleString()}
                            </span>
                        )}
                    </p>

                    <p className="text-sm  py-1 px-2 rounded-full bg-slate-100 text-slate-600 w-fit">
                        <span className="text-xs font-medium">
                            {property.features.forSell === false ? "For Rent" : "For Sale"}
                        </span>
                    </p>
                </div>


                <div className="flex items-start gap-2 text-slate-600">
                    <FaLocationDot className="mt-1 text-lg text-red-400" />
                    <p>
                        {property.address.line1}, {property.address.line2 && `${property.address.line2}, `}
                        {property.address.city}, {property.address.state}, {property.address.postalCode}
                    </p>
                </div>

                <div className="flex px-2 sm:px-0 flex-col sm:flex-row sm:items-center sm:gap-6 gap-2 text-slate-600 text-sm">
                    <div className="flex items-center gap-2">
                        <MdBedroomChild size={20} className="text-blue-500" />
                        <span>{property.features.noOfRooms} Rooms</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <FaRestroom size={20} className="text-pink-500" />
                        <span>{property.features.noOfRestRooms} Bathrooms</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MdLiving size={20} className="text-yellow-500" />
                        <span>{property.features.noOfLivingRoom} Living Rooms</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <img src={sqFT} alt="sqFT" className="w-5 h-5 " />
                        <span>{property.features.sqFt} Square Feet</span>
                    </div>
                </div>

                <section className="pt-2">
                    <h2 className="text-lg font-semibold text-slate-700 mb-2">
                        Top Amenities You’ll Love
                    </h2>

                    <div className="mt-2 p-4 rounded-xl bg-slate-50 flex items-center sm:justify-start flex-wrap gap-2 sm:gap-6">
                        {featureIcons.map(({ key, icon, label, color }) =>
                            property.features[key] ? (
                                <div
                                    key={key}
                                    className={`flex items-center gap-1 flex-wrap text-slate-600 hover:scale-105 transition transform duration-300`}
                                >
                                    <span className={`${color}`}>{icon}</span>
                                    <span className="text-xs text-center">{label}</span>
                                </div>
                            ) : null
                        )}
                    </div>
                </section>

                <button className="buttonStyle" onClick={handleBookHomeTour}>Book Home Tour</button>
            </div>
        </section>
    );
}
