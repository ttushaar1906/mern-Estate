import Unavailable from "../images/notFound1.png"

export default function UpdatePropertyForm() {
  return (
     <div className="">
            <img src={Unavailable} alt="currently_not_available" className="w-[400px] h-[400px] block mx-auto" />
            <h1 className="text-center text-xl font-bold">This Feature is under develop</h1>
        </div>
  )
}


// import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { useNavigate, useParams } from "react-router-dom";
// import { State, City, IState, ICity } from "country-state-city";
// import { PropertyInt, Features } from "../interfaces/PropertyInt";
// import { SnackBarState } from "../interfaces/NotificationInt";
// import { getPropertyFn } from "../controllers/Property/getProperty";
// import Notification from "./Notification";
// import Loading from "./Loading";
// import Error from "./Error";
// import { FaDog, FaPersonSwimming, FaRestroom, FaSquareParking, FaUpload } from "react-icons/fa6";
// import { MdClose, MdSportsCricket } from "react-icons/md";
// import Balcony from "../images/balcony.png"
// import sqFT from "../images/sqft.png"
// import Temple from "../images/temple.png"
// import Garden from "../images/garden.png"
// import { GiCctvCamera, GiElevator, GiPoliceOfficerHead } from "react-icons/gi";
// import { BsFillHouseHeartFill } from "react-icons/bs";

//   type BooleanFeatureKey = Extract<{
//     [K in keyof Features]: Features[K] extends boolean ? K : never;
//   }[keyof Features], string>;
//   const featureIcons: {
//     key: BooleanFeatureKey;
//     icon: React.ReactNode;
//     label: string;
//     color: string;
//   }[] = [
//       { key: 'parking', icon: <FaSquareParking size={24} />, label: 'Parking', color: 'text-blue-500' },
//       { key: 'petFriendly', icon: <FaDog size={24} />, label: 'Pet Friendly', color: 'text-green-500' },
//       { key: 'cctv', icon: <GiCctvCamera size={24} />, label: 'CCTV', color: 'text-purple-500' },
//       { key: 'publicToilet', icon: <FaRestroom size={24} />, label: 'Public Restroom', color: 'text-pink-500' },
//       { key: 'security', icon: <GiPoliceOfficerHead size={24} />, label: 'Security', color: 'text-red-500' },
//       { key: 'swimmingPool', icon: <FaPersonSwimming size={24} />, label: 'Swimming Pool', color: 'text-sky-500' },
//       { key: 'clubHouse', icon: <BsFillHouseHeartFill size={24} />, label: 'Club House', color: 'text-rose-500' },
//       { key: 'playGround', icon: <MdSportsCricket size={24} />, label: 'Play Ground', color: 'text-amber-500' },
//       { key: 'lift', icon: <GiElevator size={24} />, label: 'Lift', color: 'text-slate-600' },
//       { key: 'balcony', icon: <img src={Balcony} alt="" className="w-6 h-6" />, label: 'Balcony', color: 'text-slate-600' },
//       { key: 'temple', icon: <img src={Temple} alt="" className="w-6 h-6" />, label: 'Temple', color: 'text-slate-600' },
//       { key: 'garden', icon: <img src={Garden} alt="" className="w-6 h-6" />, label: 'Garden', color: 'text-slate-600' }
//     ];

// export default function UpdatePropertyForm() {
//   const [formData, setFormData] = useState<PropertyInt | null>(null);
//   const [states, setStates] = useState<IState[]>([]);
//   const [cities, setCities] = useState<ICity[]>([]);
//   const [images, setImages] = useState<{ id: string; preview: string; file?: File }[]>([]);
//   const [selectedFeatures, setSelectedFeatures] = useState<Set<string>>(new Set());
//   const [snackBar, setSnackBar] = useState<SnackBarState>({
//     open: false,
//     severity: "info",
//     message: "",
//     autoHideDuration: 3000,
//   });
//   const [dragActive, setDragActive] = useState(false);

//   const navigate = useNavigate();
//   const { id } = useParams();

//   // ✅ Fetch property
//   const { data, isLoading, isError } = useQuery({
//     queryKey: ["property", id],
//     queryFn: () => getPropertyFn(id!),
//     enabled: !!id,
//   });

//   // ✅ Initialize when data arrives
//   useEffect(() => {
//     if (data?.data) {
//       const prop = data?.data;
//       setFormData(prop);

//       // Images
//       setImages(prop.images?.map((img: any) => ({ id: crypto.randomUUID(), preview: img.url })) || []);

//       // Features
//       const defaults = new Set(Object.keys(prop.features).filter((f) => prop.features[f]));
//       setSelectedFeatures(defaults);

//       // States
//       const stateList = State.getStatesOfCountry("IN");
//       setStates(stateList);

//       // Cities
//       if (prop.address?.state) {
//         const selectedState = stateList.find((s) => s.name === prop.address.state);
//         if (selectedState) {
//           setCities(City.getCitiesOfState("IN", selectedState.isoCode));
//         }
//       }
//     }
//   }, [data]);

//   // ✅ Input change handler
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     if (!formData) return;
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       if (!prev) return prev;

//       if (name in prev.address)
//         return { ...prev, address: { ...prev.address, [name]: value } };
//       if (name in prev.features)
//         return { ...prev, features: { ...prev.features, [name]: value } };
//       return { ...prev, [name]: value };
//     });
//   };

//   // ✅ State change → update cities
//   const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const newState = e.target.value;
//     setFormData((prev) =>
//       prev ? { ...prev, address: { ...prev.address, state: newState, city: "" } } : prev
//     );
//     const selectedState = states.find((s) => s.name === newState);
//     if (selectedState) {
//       setCities(City.getCitiesOfState("IN", selectedState.isoCode));
//     }
//   };

//   // ✅ Feature toggle
//   const handleFeatureToggle = (key: keyof Features) => {
//     if (!formData) return;
//     setFormData((prev) =>
//       prev ? { ...prev, features: { ...prev.features, [key]: !prev.features[key] } } : null
//     );
//     setSelectedFeatures((prev) => {
//       const newSet = new Set(prev);
//       newSet.has(key) ? newSet.delete(key) : newSet.add(key);
//       return newSet;
//     });
//   };

//   // ✅ Image upload
//   const handleImageUpload = (files: FileList | null) => {
//     if (!files) return;
//     const fileArr = Array.from(files).slice(0, 4 - images.length);
//     const newImgs = fileArr.map((f) => ({
//       id: crypto.randomUUID(),
//       preview: URL.createObjectURL(f),
//       file: f,
//     }));
//     setImages((prev) => [...prev, ...newImgs]);
//   };

//   // ✅ Image removal
//   const removeImage = (id: string) => {
//     setImages((prev) => prev.filter((i) => i.id !== id));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Final formData:", formData);
//   };

//   if (isLoading) return <Loading />;
//   if (isError) return <Error />;

//   return (
//     <section className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-white min-h-screen">
//       <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
//         <div className="bg-gradient-to-r from-slate-600 to-slate-800 p-6">
//           <h1 className="text-3xl font-bold text-white mb-2">Update Your Property</h1>
//           <p className="text-blue-100">Edit the details and update your property listing</p>
//         </div>

//         <form onSubmit={handleSubmit} className="p-8 space-y-10">
//           {/* ✅ Property Images */}
//           <div>
//             <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Property Images</h2>
//             <div
//               className={`border-2 border-dashed rounded-lg p-8 text-center ${
//                 dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300"
//               }`}
//               onDragOver={(e) => e.preventDefault()}
//             >
//               <FaUpload className="mx-auto text-3xl text-slate-400 mb-3" />
//               <p className="text-slate-600 mb-2">
//                 Drag and drop or{" "}
//                 <label className="text-blue-600 cursor-pointer">
//                   browse
//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => handleImageUpload(e.target.files)}
//                   />
//                 </label>
//               </p>
//               <p className="text-xs text-slate-500">({images.length}/4 images uploaded)</p>
//             </div>

//             {images.length > 0 && (
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
//                 {images.map((img) => (
//                   <div key={img.id} className="relative group">
//                     <img
//                       src={img.preview}
//                       className="w-full h-32 object-cover rounded-lg border"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removeImage(img.id)}
//                       className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
//                     >
//                       <MdClose size={14} />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* ✅ Property Details */}
//           <div>
//             <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Property Details</h2>

//             <label className="block mb-1 font-medium">Property Name</label>
//             <input
//               type="text"
//               name="propertyName"
//               value={formData?.propertyName || ""}
//               onChange={handleInputChange}
//               className="addPropertyStyle mb-4"
//             />

//             <label className="block mb-1 font-medium">Property Description</label>
//             <textarea
//               name="propertyDesc"
//               value={formData?.propertyDesc || ""}
//               onChange={handleInputChange}
//               className="addPropertyStyle resize-none mb-4"
//               rows={3}
//             />
//           </div>

//           {/* ✅ Address Section */}
//           <div>
//             <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Address</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="line1"
//                 value={formData?.address?.line1 || ""}
//                 onChange={handleInputChange}
//                 placeholder="Address Line 1"
//                 className="addPropertyStyle"
//               />
//               <input
//                 type="text"
//                 name="line2"
//                 value={formData?.address?.line2 || ""}
//                 onChange={handleInputChange}
//                 placeholder="Address Line 2"
//                 className="addPropertyStyle"
//               />
//               <select
//                 name="state"
//                 value={formData?.address?.state || ""}
//                 onChange={handleStateChange}
//                 className="addPropertyStyle"
//               >
//                 <option value="">Select State</option>
//                 {states.map((s) => (
//                   <option key={s.isoCode} value={s.name}>
//                     {s.name}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 name="city"
//                 value={formData?.address?.city || ""}
//                 onChange={handleInputChange}
//                 className="addPropertyStyle"
//               >
//                 <option value="">Select City</option>
//                 {cities.map((c) => (
//                   <option key={c.name} value={c.name}>
//                     {c.name}
//                   </option>
//                 ))}
//               </select>

//               <input
//                 type="text"
//                 name="postalCode"
//                 value={formData?.address?.postalCode || ""}
//                 onChange={handleInputChange}
//                 placeholder="Postal Code"
//                 className="addPropertyStyle"
//               />
//             </div>
//           </div>

//           {/* ✅ Features */}
//           <div>
//             <h2 className="text-2xl font-semibold mb-4 border-b pb-2">Features</h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//               {featureIcons.map((item) => (
//                   <div
//                     key={item.key}
//                     className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${selectedFeatures.has(item.key)
//                       ? 'border-slate-800 bg-slate-100 shadow-md'
//                       : 'border-slate-300 hover:border-slate-400 hover:shadow-sm'
//                       }`}
//                     onClick={() => handleFeatureToggle(item.key)}
//                   >
//                     <div className="text-center">
//                       <div className={`${item.color} mb-2 flex justify-center`}>
//                         {item.icon}
//                       </div>
//                       <span className="text-xs font-medium text-slate-700">
//                         {item.label}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>

//           <button type="submit" className="buttonStyle w-full font-semibold text-lg">
//             Update Property
//           </button>
//         </form>
//       </div>

//       {snackBar.open && (
//         <Notification
//           open={snackBar.open}
//           severity={snackBar.severity}
//           message={snackBar.message}
//           onClose={() => setSnackBar({ ...snackBar, open: false })}
//           autoHideDuration={snackBar.autoHideDuration}
//         />
//       )}
//     </section>
//   );
// }
