import { useQuery } from "@tanstack/react-query";
import { ownerPropertyFn } from "../controllers/Property/getProperty";
import { PropertyInt } from "../interfaces/PropertyInt";
import Error from "./Error";
import Loading from "./Loading";
import { AiOutlineEnvironment } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { MdDelete, MdEdit, MdGridView } from "react-icons/md";
import { FaEye } from "react-icons/fa6";

export default function MyListing() {

    const { data, isLoading, isError } = useQuery<PropertyInt[]>({
        queryKey: ['properties'],
        queryFn: ownerPropertyFn,
    });

    if (isLoading) return <Loading />;
    if (isError) return <Error />;
    return (
        <div className="space-y-4 p-4">
            <h1 className="lgHeading">This is property</h1>
            {data?.map((item, index) => (
                <div
                    key={index}
                    className="rounded-xl overflow-hidden bg-white w-[350px] transition-transform duration-200 hover:scale-[1.02] shadow hover:shadow-lg "
                >
                    <img
                        src={item.images[0]?.url}
                        alt={item.propertyName}
                        className="w-full h-52 object-cover"
                    />
                    <div className="p-4">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-700">{item.propertyName}</h2>
                            <p className="text-md text-slate-600 font-bold">₹ {item.discountedPrice.toLocaleString()}</p>
                        </div>

                        <div className="flex items-start gap-2 text-slate-600 text-sm pt-2">
                            <AiOutlineEnvironment className="text-xl mt-0.5 text-slate-700" />
                            <p>
                                {item.address.line1}, {item.address.line2}, {item.address.city}, {item.address.state}
                            </p>
                        </div>
                        {/* <Link to={`/property/${item._id}`}>
                            <button className="mt-4 w-full py-2 bg-slate-700 text-white rounded-lg hover:bg-gray-800">
                                View Details
                            </button>
                        </Link> */}

                        <div className="flex gap-4 justify-center items-center pt-2">
                            <Link to={`/property/${item._id}`}>
                                <Tooltip title="View">
                                    <FaEye size={20} />
                                </Tooltip>
                            </Link>

                            <Tooltip title="View">
                                <   MdEdit size={20} />
                            </Tooltip>
                            <Tooltip title="View">
                                <MdDelete size={20} />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
