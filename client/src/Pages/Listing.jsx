import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/getListing/${params.listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return (
    <main>
      {loading && (
        <p className="text-center my-4 font-semibold text-2xl">Loading.....</p>
      )}
      {error && (
        <Link to="/">
          <p className="text-center my-4 font-semibold text-2xl text-red">
            Something went wrong!!
          </p>
        </Link>
      )}
      {listing && !loading && !error && (
        <Swiper navigation>
          {listing.imageUrls.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="h-[550px] w-full sm:h-[800px]"
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: "cover",
                  objectFit: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
        <FaShare
          className="text-black"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => {
              setCopied(false);
            }, 2000);
          }}
        />
      </div>
      {copied && (
        <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-black p-2 text-primary-color">
          Link copied!
        </p>
      )}

      {listing && !loading && !error && (
        <div className="container flex-col">
          <div className=" flex mt-4 gap-2 text-secondary-color font-bold text-2xl">
            <p className=" my-auto">
              {listing.type === "rent" ? "For Rent" : "For Sale"}
            </p>
            {listing.offer ? (
              <div className="">
                <p className="text-sm text-primary-color">
                  Original Price: Rs {listing.regularPrice}
                </p>
                <p>
                  After Discount: Rs{" "}
                  {+listing.regularPrice - +listing.discountedPrice}
                </p>
              </div>
            ) : listing.type !== "rent" ? (
              <p>Rs {listing.regularPrice}</p>
            ) : (
              <p>Rs {listing.regularPrice} /month</p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <FaMapMarkerAlt className="text-secondary-color" />
            <p className="text-primary-color font-semibold">{listing.name}</p>
          </div>

          <div className=" py-4">
            <ul className="text-third-color text-lg font-bold flex flex-wrap items-center gap-4 sm:gap-8">
              <li className="flex items-center gap-2  whitespace-nowrap ">
                <FaBed className=" text-secondary-color" />
                {listing.rooms > 1
                  ? `${listing.rooms} bedrooms `
                  : `${listing.rooms} bedroom `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className=" text-secondary-color" />
                {listing.bathroom > 1
                  ? `${listing.bathroom} bathrooms `
                  : `${listing.bathroom} bathroom `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className=" text-secondary-color" />
                {listing.parking ? "Parking" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className=" text-secondary-color" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
          </div>
          <div className=" my-2">
            <h1 className="font-bold text-2xl sm:text-4xl text-primary-color">
              Description
            </h1>
            <p className=" py-2">{listing.description}</p>
          </div>
          <div className=" my-2">
            <h1 className="font-bold text-4xl text-primary-color">Address</h1>
            <p className="py-2">{listing.address}</p>
          </div>
          {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-secondary-color text-primary-color rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <Contact listing={listing} />}
      
        </div>
      )}
    </main>
  );
}
