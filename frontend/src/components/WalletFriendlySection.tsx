import { AiOutlineEnvironment } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { getPropertiesFn } from '../controllers/Property/getProperty';
import Loading from './Loading';
import Error from './Error';
import { PropertyInt } from '../interfaces/PropertyInt';

export default function WalletFriendlySection() {

    const { data, isLoading, isError } = useQuery<PropertyInt[]>({
        queryKey: ['properties'],
        queryFn: getPropertiesFn,
    });

    if (isLoading) return <Loading />;
    if (isError) return <Error />;

    const recentProperties = data
        ?.slice()
        .sort((a, b) => (a.discountedPrice) - (b.discountedPrice))
        .slice(0, 3);

    return (
        <div className="flex justify-evenly flex-wrap items-center gap-8 sm:gap-4 p-4">
            {recentProperties?.map((property, index) => (
                <div
                    key={index}
                    className="rounded-xl overflow-hidden shadow-lg bg-white w-[350px]"
                >
                    <img
                        src={property.images[0]?.url}
                        alt={property.propertyName}
                        className="w-full h-52 object-cover"
                    />
                    <div className="p-4">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-700">{property.propertyName}</h2>
                            <p className="text-md text-slate-600 font-bold">₹ {property.discountedPrice.toLocaleString()}</p>
                        </div>

                        <div className="flex items-start gap-2 text-slate-600 text-sm pt-2">
                            <AiOutlineEnvironment className="text-xl mt-0.5 text-slate-700" />
                            <p>
                                {property.address.line1}, {property.address.line2}, {property.address.city}, {property.address.state}
                            </p>
                        </div>
                        <Link to={`/property/${property._id}`}>
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
