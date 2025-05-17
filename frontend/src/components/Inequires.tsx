import { useQuery } from "@tanstack/react-query";
import { viewInequeryFn } from "../controllers/ContactUs/viewInequery";
import { ContactUsInt } from "../interfaces/ContactUsInt";
import Error from "./Error";
import Loading from "./Loading";

export default function Inquiries() {
  const { data, isLoading, isError } = useQuery<ContactUsInt[]>({
    queryKey: ["inquiries"],
    queryFn: viewInequeryFn,
  });

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <div className="space-y-4 p-4">
      {data?.length > 0 ? (
        data.map((info, index) => (
          <div key={index} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">{info.fullName}</h2>
            <p className="text-sm text-gray-600">{info.email}</p>
            <p className="mt-1">{info.message}</p>
            <p className="text-xs text-gray-400">Type: {info.inquiresType}</p>
          </div>
        ))
      ) : (
        <p>No inquiries found.</p>
      )}
    </div>
  );
}
