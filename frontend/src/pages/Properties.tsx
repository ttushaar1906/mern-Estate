import { useQuery } from "@tanstack/react-query";
import { PropertyInt } from "../interfaces/PropertyInt";
import { getPropertiesFn } from "../controllers/Property/getProperty";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { AiOutlineEnvironment, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {  useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { TbCat } from "react-icons/tb";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaParking } from "react-icons/fa";
import PropertyNotFound from "../images/notFound2.png"

export default function Properties() {
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
  const [searchInput, setSearchInput] = useState(""); // for real-time input
  const [searchQuery, setSearchQuery] = useState(""); // used in query
  const [currentPage, setCurrentPage] = useState(1);
  const [petFriendly, setPetFriendly] = useState<"" | true | false>("");
  const [sortOrder, setSortOrder] = useState<"default" | "priceDesc">("default");
  const [parking, setParking] = useState<"" | true | false>("")
  const debouncedSetSearchQuery = useMemo(
    () => debounce((val: string) => {
      setSearchQuery(val);
      setCurrentPage(1);
    }, 500),
    []
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["properties", currentPage, searchQuery],
    queryFn: () => getPropertiesFn(currentPage, searchQuery),
  });

  const rawProperties = data?.data || [];
  const totalPages = data?.pages || 1;

  // apply frontend filters
  const filteredProperties = rawProperties
    .filter((property: PropertyInt) => !petFriendly || property.features.petFriendly)
    .sort((a: PropertyInt, b: PropertyInt) => {
      if (sortOrder === "priceDesc") return b.price - a.price;
      return 0;
    });

  if (isLoading) return <div><Loading /></div>;
  if (isError) return <div><Error /></div>;

  const toggleLike = (index: number) => {
    setLiked(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="customeContainer">

      <div className="p-4 rounded-lg shadow flex flex-wrap items-center justify-between gap-4 bg-white">
        <input
          type="text"
          placeholder="Search. Find. Stay."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            debouncedSetSearchQuery(e.target.value);
          }}
          className="flex-grow min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500"
        />

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSortOrder(prev => prev === "priceDesc" ? "default" : "priceDesc")}
            className="px-4 py-2 flex items-center gap-2 w-full sm:w-40  bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            <FaIndianRupeeSign /> {sortOrder === "priceDesc" ? "Low to High" : "High to Low"}
          </button>
          <button
            onClick={() => setPetFriendly(prev => !prev)}
            className={`px-4 py-2 flex items-center gap-2 w-full sm:w-40 cursor-pointer rounded-lg ${petFriendly ? "bg-cyan-100 text-cyan-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} `}
          >
            <TbCat /> Pet Friendly
          </button>
          <button
            onClick={() => setParking(prev => !prev)}
            className={`px-4 py-2 flex items-center gap-2 w-full sm:w-44 cursor-pointer rounded-lg ${parking ? "bg-cyan-100 text-cyan-800" : "bg-gray-100 text-gray-700 hover:bg-gray-200"} `}
          >
            <FaParking /> Parking Facility
          </button>
        </div>

        <Link to="/addProperty">
          <button className="w-40 px-4 py-2 cursor-pointer bg-slate-700 text-white rounded-lg hover:bg-gray-800">
            Add Property
          </button>
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 my-4">
        {filteredProperties.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg">
            <img src={PropertyNotFound} alt="propertyNotFound" className="w-100 h-100 block mx-auto" />
            🔍 No properties found. Try adjusting your filters or search keywords.
          </div>
        ) : (
          filteredProperties.map((property:PropertyInt, index:number) => (
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
                    <p className="text-md text-slate-600 font-bold">
                      ₹ {property.price.toLocaleString()}
                    </p>
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

                <div className="flex items-start gap-2 h-16 text-slate-600 text-sm pt-2">
                  <AiOutlineEnvironment className="text-xl mt-0.5 text-slate-700" />
                  <p>
                    {property.address.line1} {property.address.line2}, {property.address.city}, {property.address.state}
                  </p>
                </div>
                <Link to={`/property/${property._id}`}>
                  <button className="mt-4 w-full py-2 bg-slate-700 text-white rounded-lg hover:bg-gray-800 hover:cursor-pointer hover:scale-105 transition-all duration-300">
                    Explore Property
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>


      <div className="flex justify-center items-center gap-4 py-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-slate-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        {/* <span className="font-medium">Page {currentPage} of {totalPages}</span> */}

        <span className="font-medium"> {currentPage} </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-slate-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
