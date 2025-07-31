import { useQuery } from "@tanstack/react-query";
import { viewInequeryFn } from "../controllers/ContactUs/viewInequery";
import { ContactUsInt } from "../interfaces/ContactUsInt";
import Error from "./Error";
import Loading from "./Loading";
import { MdApartment } from "react-icons/md";

export default function Inquiries() {
 const { data, isLoading, isError } = useQuery<ContactUsInt[]>({
  queryKey: ["inquiries"],
  queryFn: viewInequeryFn,
  retry: false,
});

  if (isLoading) return <Loading />;
  if (isError) return <Error message="No inquiries found for this user" />;

  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-gray-600">
        <h1 className="lgHeading">Query send by</h1>
        <p>No inquiries found.</p>
      </div>
    );
  }

  return (
    
    <section className="space-y-4 p-4">
      <h1 className="mdHead text-center">Query Send </h1>
      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full"></div>

      {data.map((info, index) => (
        <div
          key={index}
          className="p-4 rounded shadow transition-transform duration-200 hover:shadow-lg hover:scale-[1.02]"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-slate-50 p-3 rounded text-slate-700">
            <h2 className="text-base sm:text-xl font-semibold">Query Sent for:</h2>
            <p className="text-sm sm:text-base mt-1 sm:mt-0 flex items-center gap-2 text-slate-600">
              <MdApartment />
              {info.propertyType} - {info.inquiresType}
            </p>
          </div>
          <p className="mt-2 p-3 bg-slate-100 rounded text-slate-700">{info.message}</p>
        </div>
      ))}
    </section>
  );
}
