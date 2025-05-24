// src/pages/PropertyDetails.tsx
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPropertyFn } from "../controllers/Property/getProperty";
import Loading from "../components/Loading";
import Error from "../components/Error";
import AdressIcon from "../images/address.png"

export default function PropertyDetails() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["property", id],
        queryFn: () => getPropertyFn(id!),
        enabled: !!id,
    });

    if (isLoading) return <Loading />;
    if (isError) return <Error />;

    const property = data.data;
    console.log(typeof property);

    return (
        <div className="customeContainer p-4">
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

            <div className="">
                <h1 className="mdHead my-2">{property.propertyName}</h1>
                <p className="text-slate-600">{property.propertyDesc}</p>
                <p className="mt-2 text-slate-600">
                    Price: ₹ {""}
                    {property.discountedPrice && property.discountedPrice < property.price && property.discountedPrice > 0 ? (
                        <>
                            <span className="line-through mr-2 text-red-500 text-xs">
                                {property.price.toLocaleString()}
                            </span>
                            <span className="font-semibold text-slate-600">
                                {property.discountedPrice.toLocaleString()}
                            </span>
                        </>
                    ) : (
                        <span className="font-semibold text-slate-600">
                            {property.price.toLocaleString()}
                        </span>
                    )}
                </p>
                <p className="mt-2 text-slate-600">
                    <div className="flex items-center gap-2 py-2">
                        <img src={AdressIcon} alt="" className="w-8 h-8" />
                        <p>
                            {property.address.line1}, {property.address.line2 || ""}, {property.address.city || ""}, {property.address.state}, {property.address.postalCode || ""}.
                        </p>
                    </div>
                </p>
            </div>


        </div>
    );
}
