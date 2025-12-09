import { AiOutlineEnvironment } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { getCheapPropertiesFn } from '../controllers/Property/getProperty';
import Loading from './Loading';
import Error from './Error';
import { PropertyInt } from '../interfaces/PropertyInt';

export default function WalletFriendlySection() {

    const { data, isLoading, isError } = useQuery<PropertyInt[]>({
        queryKey: ['properties'],
        queryFn: getCheapPropertiesFn,
    });

    if (isLoading) return <Loading />;
    if (isError) return <Error />;

    const recentProperties = data
        ? data.sort((a, b) => a.discountedPrice - b.discountedPrice).slice(0, 3)
        : [];

    return (
        <div className="flex justify-evenly flex-wrap items-center gap-8 sm:gap-4 p-4">
            {recentProperties?.map((property: PropertyInt, index: number) => (
                <div
                    key={index}
                    className="rounded-xl bg-white w-[350px] h-[380px] overflow-hidden shadow transition-transform duration-200 hover:scale-[1.02] hover:shadow-lg flex flex-col"
                >
                    {/* IMAGE */}
                    <img
                        src={property.images[0]?.url}
                        alt={property.propertyName}
                        className="w-full h-48 object-cover"
                    />

                    {/* CONTENT */}
                    <div className="p-4 flex flex-col justify-between flex-grow">

                        {/* Title + Price */}
                        <div>
                            <h2 className="text-lg font-semibold text-slate-700 truncate">
                                {property.propertyName}
                            </h2>

                            <p className="text-md text-slate-600 font-bold mt-1">
                                ₹ {property?.discountedPrice === 0
                                    ? property?.price
                                    : property?.discountedPrice?.toLocaleString()}
                            </p>

                            {/* Address (max 1 line → ...) */}
                            <div className="flex items-start gap-2 text-slate-600 text-sm pt-2">
                                <AiOutlineEnvironment className="text-xl mt-0.5 text-slate-700" />
                                <p className="line-clamp-1">
                                    {property.address.line1}, {property.address.line2},
                                    {property.address.city}, {property.address.state}
                                </p>
                            </div>
                        </div>

                        {/* BUTTON aligned at bottom */}
                        <Link to={`/property/${property._id}`} className="block">
                            <button className="mt-4 w-full py-2 bg-slate-700 text-white rounded-lg hover:bg-gray-800">
                                View Details
                            </button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>

    )
}
