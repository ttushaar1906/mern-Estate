import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showMore, SetShowMore] = useState(false);
  const [listings, setListings] = useState([]);
  const [sidebardata, setsidebardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setsidebardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListing = async () => {
      setLoading(true);
      SetShowMore(false)
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/gets?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        SetShowMore(true);
      }else{
        SetShowMore(false)
      }
      setListings(data);
      setLoading(false);
    };
    fetchListing();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setsidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setsidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setsidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";

      const order = e.target.value.split("_")[1] || "desc";

      setsidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("type", sidebardata.type);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("offer", sidebardata.offer);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      SetShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-6 shadow-md md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex gap-2 items-center">
            <label className="whitespace-nowrap font-semibold">
              Search Item
            </label>
            <input
              type="text"
              placeholder="Search ...."
              className="w-full rounded-lg p-2 border"
              id="searchTerm"
              onChange={handleChange}
              value={sidebardata.searchTerm}
            />
          </div>
          <div className="flex items-center gap-2 font-semibold">
            <label>Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-4"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent & Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-4"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
                className="w-4"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                onChange={handleChange}
                checked={sidebardata.offer}
                className="w-4"
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex items-center gap-2 font-semibold">
            <label>Ammenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                onChange={handleChange}
                checked={sidebardata.parking}
                className="w-4"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                onChange={handleChange}
                checked={sidebardata.furnished}
                className="w-4"
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex gap-2 items-center font-semibold">
            <label>Sort:</label>
            <select
              id="sort_order"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              className="border p-2 rounded-lg"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className=" bg-secondary-color uppercase text-primary-color p-2 rounded-lg font-bold hover:bg-opacity-90">
            Search
          </button>
        </form>
      </div>

      <div className="flex-1">
        <h1 className="font-semibold text-3xl p-2 text-secondary-color mt-4">
          Listing Result
        </h1>
        <div className="flex flex-wrap gap-4 p-6">
          {!loading && listings.length === 0 && (
            <p className="text-red text-xl">No Listing Found</p>
          )}
          {loading && (
            <p className="text-xl text-secondary-color w-full text-center">
              Loading....
            </p>
          )}
          {!loading &&
            listings &&
            listings.map((listing) => (
              <ListingCard key={listing._id} listing={listing} />
            ))}
          {showMore && (
            <button
              className="text-green hover:underline transition-none duration-300 p-6"
              onClick={onShowMoreClick()}
              Show
              More
            ></button>
          )}
        </div>
      </div>
    </div>
  );
}
