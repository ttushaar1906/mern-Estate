import { useQuery } from "@tanstack/react-query";
import { getPropertiesFn } from "../controllers/Property/getProperty";
import { PropertyInt } from "../interfaces/PropertyInt";
import ADBanner from "../components/ADBanner";
import HowItWorks from "../components/HowItWorks";
import ListProp from "../components/ListProp";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Link } from "react-router-dom";
import HomeBanner from "../images/bannerImg.png"

export default function Home() {
  const { data, isLoading, isError } = useQuery<PropertyInt[]>({
    queryKey: ["properties"],
    queryFn: getPropertiesFn,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  const recentProperties = data
    ?.slice()
    .sort((a, b) => (a.price) - (b.price))
    .slice(0, 3);

  return (
    <div>
      <div className="w-full">
        <img src={HomeBanner} alt="Home Banner" className="w-full h-auto object-cover" />
      </div>


      <div className="customeContainer">
        <section className="my-4 p-4">
          <h2 className="lgHeading">Wallet-Friendly Finds</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {recentProperties?.map((property, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden shadow-lg bg-white"
              >
                <img
                  src={property.images[0]?.url}
                  alt={property.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-slate-800">{property.name}</h3>
                  <p className="text-slate-600">₹ {property.price.toLocaleString()}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    {property.address.city}, {property.address.state}
                  </p>
                  <Link to="/property">
                    <button className="mt-4 w-full py-2 bg-slate-700 text-white rounded-lg hover:bg-gray-800">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <ADBanner />
        <HowItWorks />
        <ListProp />
      </div>
    </div>

  );
}
