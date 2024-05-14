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
} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import ContactUs from './ContactUs';

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
                style={{ background: `url(${url}) center no-repeat`,backgroundSize:"cover", objectFit:"cover" }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {listing && !loading && !error && (
      <div className="container flex-col">
        <h1 className="capitalize text-3xl font-bold my-4 text-primary-color">{listing.name}</h1>
        <p className="capitalize">{listing.description}</p>
        <p className="capitalize">{listing.address}</p>
        <FaBath className="bg-green text-white text-2xl"/>

        <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
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
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}

        <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountedPrice.toLocaleString('en-US')
                : listing.regularPrice.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='border w-full max-w-[200px] rounded-md text-center items-center p-2'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green w-full max-w-[200px] text-white text-center rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} OFF
                </p>
              )}
               <p className='text-secondary-color'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            
            <ul className='text-green font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.rooms > 1
                  ? `${listing.rooms} beds `
                  : `${listing.rooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathroom > 1
                  ? `${listing.bathroom} baths `
                  : `${listing.bathroom} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button
                onClick={() => setContact(true)}
                className='bg-black text-white rounded-lg uppercase hover:opacity-95 p-3'
              >
                Contact landlord
              </button>
            )}
            {contact && <ContactUs listing={listing} />}
            </div>

      </div>
      
      )}
      {/* <h1>{listing.name}</h1> */}
    </main>
  );
}
