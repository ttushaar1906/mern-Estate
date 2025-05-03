// import { useQuery } from "@tanstack/react-query";
// import { getPropertyFn } from "../controllers/Property/getProperty";
// import Loading from "../components/Loading";
// import Error from "../components/Error";
// import { PropertyInt } from "../interfaces/PropertyInt";

export default function ViewProperty() {
  // const { data, isLoading, isError } = useQuery<PropertyInt>({
  //   queryKey: ["properties"],
  //   queryFn: getPropertyFn,
  // });

  // if (isLoading) return <div><Loading /></div>;
  // if (isError) return <div><Error /></div>;
  return (
   <section className="customeContainer border flex">
    <div className="w-2/3 border">
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, nesciunt!
    </div>
    <div className="w-1/2">
    <h1>This is inequry form</h1>
    </div>
   </section>
  )
}
