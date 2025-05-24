import { useQuery } from "@tanstack/react-query";
import { PropertyInt } from "../interfaces/PropertyInt";
import { getPropertiesFn } from "../controllers/Property/getProperty";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { AiOutlineEnvironment, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Properties() {
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({}); // Per-property like

  const { data, isLoading, isError } = useQuery<PropertyInt[]>({
    queryKey: ["properties"],
    queryFn: getPropertiesFn,
  });

  if (isLoading) return <div><Loading /></div>;
  if (isError) return <div><Error /></div>;

  const toggleLike = (index: number) => {
    setLiked(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="customeContainer">

      <div className=" p-4 rounded-lg shadow flex flex-wrap items-center justify-between gap-4 bg-white">
        <input
          type="text"
          placeholder="Search. Find. Stay."
          className="flex-grow min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
        />

        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            High to Low
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Pet Friendly
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Parking
          </button>
        </div>

        <button className="w-40 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-gray-800">
          Add Property
        </button>
      </div>


      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {data?.map((property, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
          >
            <img
              src={property.images[0]?.url}
              alt={property.propertyName}
              className="w-full h-52 object-cover bg-no-repeat"
            />

            <div className="p-4 space-y-2">
              <div className="flexStyleBet">
                <div>
                  <h2 className="text-lg font-semibold text-slate-700">{property.propertyName}</h2>
                  <p className="text-md text-slate-600 font-bold">₹ {property.price.toLocaleString()}</p>
                </div>
                {liked[index] ? (
                  <AiFillHeart
                    className="w-8 h-8 text-red-500 bg-red-100 p-1 rounded-full cursor-pointer border"
                    onClick={() => toggleLike(index)}
                  />
                ) : (
                  <AiOutlineHeart
                    className="w-8 h-8 text-slate-600 bg-white p-1 rounded-full cursor-pointer border"
                    onClick={() => toggleLike(index)}
                  />
                )}
              </div>

              <div className="flex items-start gap-2 text-slate-600 text-sm pt-2">
                <AiOutlineEnvironment className="text-xl mt-0.5 text-slate-700" />
                <p>
                  {property.address.line1}, {property.address.line2}, {property.address.city}, {property.address.state}
                </p>
              </div>
              <Link to={`/property/${property._id}`}>
                <button className="mt-4 w-full py-2 bg-slate-700 text-white rounded-lg hover:bg-gray-800 hover:cursor-pointer">
                  Explore Property
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
