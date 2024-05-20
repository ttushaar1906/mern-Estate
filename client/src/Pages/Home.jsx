import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import ListingCard from "../components/ListingCard";

export default function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const [saleListing, setSaleRenting] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(saleListing);
  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await fetch("/api/listing/gets?offer=true&limit=4");
        const data = await res.json();
        setOfferListing(data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListing = async () => {
      try {
        const res = await fetch("/api/listing/gets?type=rent&limit=4");
        const data = await res.json();
        setRentListing(data);
        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListing = async () => {
      try {
        const res = await fetch("/api/listing/gets?type=sale&limit=4");
        const data = await res.json();
        setSaleRenting(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListing();
  }, []);
  return (
    <main>
      {/* top */}
      <div className=" shadow-sm flex items-center">
        <div className="w-1/2 p-4">
          <h1 className=" text-2xl font-semibold">
            <span className=" text-primary-color text-4xl font-extrabold pr-1">
              Discover
            </span>
            your ideal home effortlessly.
          </h1>
          <p className="text-sm my-2">
            Tushar EState will help you to find your home fast easy and
            comfortable <br />
            Our customers support is available 24/7.
          </p>
          <Link
            to={"/search"}
            className="text-sm text-primary-color font-extrabold"
          >
            Explore More....
          </Link>
        </div>
        <div className="w-1/2">
          <img
            src="https://i.postimg.cc/L8HKXXfv/image.png"
            alt=""
            className="w-full object-cover"
          />
        </div>
      </div>

      {/* middle */}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide className="mt-4">
              <div
                className=" h-[300px] sm:h-[800px] w-[100%]"
                style={{
                  background: `url(${listing.imageUrls[0]})center no-repeat`,
                  backgroundSize: "contain",
                }}
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* List fetching */}

      <div className=" flex flex-col ">
        {offerListing && offerListing.length > 0 && (
          <div className="my-4">
            <div className="px-8">
              <h2 className=" text-2xl font-bold text-secondary-color">
                Recent Offers
              </h2>
              <Link
                to={"/search?offer=true"}
                className="text-sm text-primary-color hover:underline transition-all duration-300"
              >
                Show more offer...
              </Link>
            </div>

            <div className="flex sm:justify-evenly flex-wrap gap-4 p-4">
              {offerListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {rentListing && rentListing.length > 0 && (
          <div className="my-4">
            <div className="px-8">
              <h2 className=" text-2xl font-bold text-secondary-color">
                Recent Places for rent
              </h2>
              <Link
                to={"/search?type=rent"}
                className="text-sm text-primary-color hover:underline transition-all duration-300"
              >
                Show more place for rent...
              </Link>
            </div>

            <div className="flex sm:justify-evenly flex-wrap gap-4 p-4">
              {rentListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}

        {saleListing && saleListing.length > 0 && (
          <div className="my-4">
            <div className="px-8">
              <h2 className=" text-2xl font-bold text-secondary-color">
                Places for Sell
              </h2>
              <Link
                to={"/search?type=sale"}
                className="text-sm text-primary-color hover:underline transition-all duration-300"
              >
                Show more Places...
              </Link>
            </div>

            <div className="flex sm:justify-evenly flex-wrap gap-4 p-4">
              {saleListing.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
