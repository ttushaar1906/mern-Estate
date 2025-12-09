import { useQuery } from "@tanstack/react-query";
import { PropertyInt } from "../interfaces/PropertyInt";
import { getPropertiesFn } from "../controllers/Property/getProperty";
import Loading from "../components/Loading";
import Error from "../components/Error";
// import { AiOutlineEnvironment, AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { AiOutlineEnvironment } from "react-icons/ai";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { TbCat } from "react-icons/tb";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaParking } from "react-icons/fa";
import PropertyNotFound from "../images/notFound2.png"

export default function Properties() {
  // const [liked, setLiked] = useState<{ [key: number]: boolean }>({});
  const [searchInput, setSearchInput] = useState(""); // for real-time input
  const [searchQuery, setSearchQuery] = useState(""); // used in query
  const [currentPage, setCurrentPage] = useState(1);
  const [petFriendly, setPetFriendly] = useState<String | Boolean>("");
  const [sortOrder, setSortOrder] = useState<"default" | "priceDesc">("default");
  const [parking, setParking] = useState<String | Boolean>("")
  const debouncedSetSearchQuery = useMemo(
    () => debounce((val: string) => {
      setSearchQuery(val)
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
    .filter((property: PropertyInt) => {
      const isPetOk = !petFriendly || property.features?.petFriendly === true;
      const isParkingOk = !parking || property.features?.parking === true;
      return isPetOk && isParkingOk;
    })

    .sort((a: PropertyInt, b: PropertyInt) => {
      if (sortOrder === "priceDesc") return b.price - a.price;
      return 0;
    });

  if (isLoading) return <div><Loading /></div>;
  if (isError) return <div><Error /></div>;

  // const toggleLike = (index: number) => {
  //   setLiked(prev => ({ ...prev, [index]: !prev[index] }));
  // };

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
        {/* <VoiceSearch onSearch={handleVoiceSearch} /> */}

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

        <Link to="/addProperty" className="block w-full sm:w-44">
          <button className="w-full px-4 py-2 cursor-pointer bg-slate-700 text-white rounded-lg hover:bg-gray-800">
            Add Property
          </button>
        </Link>

      </div>

      <div className="flex justify-evenly flex-wrap items-center gap-8 sm:gap-4 p-4">

        {filteredProperties.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 text-lg">
            <img src={PropertyNotFound} alt="propertyNotFound" className="w-100 h-100 block mx-auto" />
            🔍 No properties found. Try adjusting your filters or search keywords.
          </div>
        ) : (
          filteredProperties.map((property: PropertyInt, index: number) => (
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
