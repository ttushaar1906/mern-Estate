import { useQuery } from "@tanstack/react-query";
import { PropertyInt } from "../interfaces/PropertyInt";
import { getPropertiesFn } from "../controllers/Property/getProperty";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { AiOutlineEnvironment } from "react-icons/ai";

export default function Properties() {

  const { data, isLoading, isError } = useQuery<PropertyInt[]>({
    queryKey: ["properties"],   // Unique key for caching
    queryFn: getPropertiesFn,   // Function that fetches data
  });

  if (isLoading) return <div> <Loading /> </div>;
  if (isError) return <div><Error /></div>;

  return (
    <div className="customeContainer border flex ">

      {data?.map((property, index) => (
        <div key={index} className="border leading-6">

          <div className="">
            <img src={property.images[0].url} alt="homeImg" />
          </div>

          <div className="flexStyleBet">
            <h3 className="mdHead">{property.name}</h3>
            <h3 className="text-slate-600 font-semibold">₹ {property.price}</h3>
          </div>
          <h4>
  <AiOutlineEnvironment />
  {property.address && property.address.length > 0 ? property.address[0].line1 : "No Address Available"}
</h4>

          {/* <h4><AiOutlineEnvironment />{property.address[0].line1}</h4> */}
          <p>{property.desc}</p>
        </div>
      ))}
    </div>
  )
}
