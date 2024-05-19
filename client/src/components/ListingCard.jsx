import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaBath,
  FaBed,
  FaChair,
  FaParking,
} from "react-icons/fa";

export default function ListingCard({ listing }) {
  return (
    <div className=" mx-auto sm:mx-0 hover:scale-105 transition-all duration-200 shadow-lg h-[420px] bg-white w-[300px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0] || "https://i.postimg.cc/vBF9dCtL/image.png"}
          alt="listingCover"
          className="h-[180px] object-cover w-full"
        />
        <div className="p-3">
          <p className=" truncate text-secondary-color capitalize text-lg font-semibold">
            {listing.name}
          </p>
          <div className="flex gap-2 items-center mt-2">
            <FaMapMarkerAlt className="text-md text-primary-color font-extrabold" />
            <p className=" truncate text-sm capitalize">{listing.address}</p>
          </div>

          <div className="px-2 mt-2">
            <h1 className="text-xl text-center font-bold ">Facilities</h1>
            <div className="flex gap-4 flex-wrap my-2 justify-start">
              <div className="flex items-center gap-2">
                <FaBed className="text-primary-color" />
                <p className="text-sm">
                  {listing.rooms > 1
                    ? `${listing.rooms} Rooms`
                    : `${listing.rooms} Room`}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaBath className="text-primary-color" />
                <p className="text-sm">
                  {listing.bathroom > 1
                    ? `${listing.bathroom} Bathrooms`
                    : `${listing.bathroom} Bathroom`}
                </p>
              </div>
              <div className="flex items-center gap-2 ">
                <FaChair className="text-primary-color" />
                <p className="text-sm">
                  {listing.furnished === false ? "Not Furnished" : "Furnished"}
                </p>
              </div>
              <div className="flex items-center gap-2 ">
                <FaParking className="text-primary-color" />
                <p className="text-sm">
                  {listing.furnished === false ? "No Parking" : "Parking"}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-primary-color">
              {listing.type === "rent" ? "For Rent  " : "For Sell  "}
              <span className="text-lg font-bold text-secondary-color">
                Rs:{" "}
                {listing.offer
                  ? `${(
                      +listing.regularPrice - +listing.discountedPrice
                    ).toLocaleString()}`
                  : listing.regularPrice.toLocaleString()}
                <span className="text-sm">
                  {listing.type === "rent" && " /month"}{" "}
                </span>
              </span>
            </p>
            <p className="text-sm">
              {listing.offer ? `${listing.discountedPrice} Off` : ""}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
