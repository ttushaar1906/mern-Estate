import { BsFillHouseHeartFill } from "react-icons/bs";
import { FaDog, FaPersonSwimming, FaRestroom, FaSquareParking, FaUpload, FaTrash } from "react-icons/fa6";
import { GiCctvCamera, GiElevator, GiPoliceOfficerHead } from "react-icons/gi";
import { MdBedroomChild, MdLiving, MdSportsCricket, MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { PropertyInt, PropertyType } from "../interfaces/PropertyInt";
import Notification from "./Notification";
import { useMutation } from "@tanstack/react-query";
import { createPropertyFn } from "../controllers/Property/createProperty";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { State, City, IState, ICity } from 'country-state-city';
import { SnackBarState } from "../interfaces/NotificationInt";
import Balcony from "../images/balcony.png"
import sqFT from "../images/sqft.png"
import Temple from "../images/temple.png"
import Garden from "../images/garden.png"

export default function AddPropertyForm() {
  const featureIcons = [
    { key: 'parking', icon: <FaSquareParking size={24} />, label: 'Parking', color: 'text-blue-500' },
    { key: 'petFriendly', icon: <FaDog size={24} />, label: 'Pet Friendly', color: 'text-green-500' },
    { key: 'cctv', icon: <GiCctvCamera size={24} />, label: 'CCTV', color: 'text-purple-500' },
    { key: 'publicToilet', icon: <FaRestroom size={24} />, label: 'Public Restroom', color: 'text-pink-500' },
    { key: 'security', icon: <GiPoliceOfficerHead size={24} />, label: 'Security', color: 'text-red-500' },
    { key: 'swimmingPool', icon: <FaPersonSwimming size={24} />, label: 'Swimming Pool', color: 'text-sky-500' },
    { key: 'clubHouse', icon: <BsFillHouseHeartFill size={24} />, label: 'Club House', color: 'text-rose-500' },
    { key: 'playGround', icon: <MdSportsCricket size={24} />, label: 'Play Ground', color: 'text-amber-500' },
    { key: 'lift', icon: <GiElevator size={24} />, label: 'Lift', color: 'text-slate-600' },
    { key: 'balcony', icon: <img src={Balcony} alt="" className="w-6 h-6" />, label: 'Balcony', color: 'text-slate-600' },
    { key: 'temple', icon: <img src={Temple} alt="" className="w-6 h-6" />, label: 'Temple', color: 'text-slate-600' },
    { key: 'garden', icon: <img src={Garden} alt="" className="w-6 h-6" />, label: 'Garden', color: 'text-slate-600' }  
  ];

  const [dragActive, setDragActive] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState(new Set());
  const [states, setStates] = useState<IState[]>([]);;
  const [cities, setCities] = useState<ICity[]>([]);
  const [images, setImages] = useState<{ id: string; preview: string }[]>([]);

  useEffect(() => {
    const allStates = State.getStatesOfCountry('IN');
    setStates(allStates);
  }, []);

  const handleStateChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const selectedStateCode = e.target.value;

    const selectedState = states.find((s) => s.isoCode === selectedStateCode);

    if (!selectedState) return;

    const fetchedCities = City.getCitiesOfState('IN', selectedStateCode);
    setCities(fetchedCities);

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        state: selectedState.name,
        city: '', // reset city
      },
    }));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        city: e.target.value,
      },
    }));
  };

  const [formData, setFormData] = useState<PropertyInt>({
    propertyName: "",
    propertyDesc: "",
    images: [{
      url: "",
    }],
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postalCode: ""
    },
    price: 0,
    discountedPrice: 0,
    features: {
      parking: false,
      petFriendly: false,
      security: false,
      swimmingPool: false,
      playGround: false,
      garden: false,
      publicToilet: false,
      clubHouse: false,
      temple: false,
      balcony: false,
      cctv: false,
      lift: false,
      forSell: false,
      noOfRooms: 0,
      noOfRestRooms: 0,
      noOfLivingRoom: 0,
      sqFt: "",
      propertyType: ""
    },
    rules: [{
      no: "",
      rules: ""
    }
    ],
    _id: ""
  });

  const [snackBar, setSnackBar] = useState<SnackBarState>({
    open: false,
    severity: "info",
    message: "",
    autoHideDuration: 3000
  });

  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: createPropertyFn,
    onSuccess: () => {
      setSnackBar({
        open: true,
        message: "Property Added Successfully !!",
        severity: "success",
        autoHideDuration: 3000
      })
      setFormData({
        propertyName: "",
        propertyDesc: "",
        images: [],
        address: {
          line1: "",
          line2: "",
          city: "",
          state: "",
          postalCode: ""
        },
        price: 0,
        discountedPrice: 0,
        features: {
          parking: false,
          petFriendly: false,
          security: false,
          swimmingPool: false,
          playGround: false,
          garden: false,
          publicToilet: false,
          clubHouse: false,
          temple: false,
          balcony: false,
          cctv: false,
          lift: false,
          forSell: false,
          noOfRooms: 0,
          noOfRestRooms: 0,
          noOfLivingRoom: 0,
          sqFt: "",
          propertyType: "" // This now matches the updated interface
        },
        rules: [],
        _id: ""
      })

      setTimeout(() => {
        navigate("/user")
      }, 1000)
    },
    onError: (error: any) => {
      setSnackBar({
        open: true,
        message: `${error?.response.data.message || "Failed to List Property"}`,
        severity: "error",
        autoHideDuration: 3000
      })
    }
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (
      name === 'noOfRooms' ||
      name === 'noOfLivingRoom' ||
      name === 'noOfRestRooms'
    ) {
      setFormData((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [name]: Number(value), // these are likely numbers
        },
      }));
    } else if (name === 'sqFt') {
      setFormData((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          [name]: value,
        },
      }));
    } else if (
      name === 'line1' ||
      name === 'line2' ||
      name === 'city' ||
      name === 'state' ||
      name === 'postalCode'
    ) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files).slice(0, 4 - images.length); // max 4 images

    const newImages = fileArray.map((file) => {
      const id = crypto.randomUUID(); // unique id
      const preview = URL.createObjectURL(file);
      return { id, preview, file };
    });

    setImages((prev) => [...prev, ...newImages]);

    // Update formData.images
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages.map((img) => ({ url: img.preview }))],
    }));
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.url !== images.find((i) => i.id === id)?.preview),
    }));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleRuleChange = (index: number, value: string) => {
    const updatedRules = [...formData.rules];
    updatedRules[index] = {
      ...updatedRules[index],
      rules: value,
      no: `${index + 1}`, // optional, based on need
    };

    setFormData((prev) => ({
      ...prev,
      rules: updatedRules,
    }));
  };

  const handleAddRule = () => {
    setFormData((prev) => ({
      ...prev,
      rules: [
        ...prev.rules,
        { no: `${prev.rules.length + 1}`, rules: "" },
      ],
    }));
  };

  const handleRemoveRule = (index: number) => {
    const updatedRules = formData.rules.filter((_, i) => i !== index);

    // Optionally re-number `no`
    const reIndexedRules = updatedRules.map((r, i) => ({
      ...r,
      no: `${i + 1}`,
    }));

    setFormData((prev) => ({
      ...prev,
      rules: reIndexedRules,
    }));
  };

  const handleFeatureToggle = (key: keyof typeof formData.features) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [key]: !prev.features[key], // toggle the boolean
      },
    }));

    setSelectedFeatures((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(key)) {
        newSelected.delete(key);
      } else {
        newSelected.add(key);
      }
      return newSelected;
    });
  };

  return (
    <section className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-slate-50 to-white min-h-screen">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="bg-gradient-to-r from-slate-600 to-slate-800 p-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            Add Your Property
          </h1>
          <p className="text-blue-100">Fill in the details to list your property</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Property Images */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-800 border-b border-slate-200 pb-3">
              Property Images
            </h2>

            <div className="space-y-4">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-slate-400'
                  }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <FaUpload className="mx-auto text-4xl text-slate-400 mb-4" />
                <p className="text-slate-600 mb-2">
                  Drag and drop images here, or
                  <label className="text-blue-600 hover:text-blue-700 cursor-pointer ml-1">
                    browse
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      disabled={images.length >= 4}
                    />
                  </label>
                </p>
                <p className="text-sm text-slate-500">
                  Minimum 1 image required, maximum 4 images allowed
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  ({images.length}/4 images uploaded)
                </p>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.map((image) => (
                    <div key={image.id} className="relative group">
                      <img
                        src={image.preview}
                        alt="Property preview"
                        className="w-full h-32 object-cover rounded-lg border border-slate-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <MdClose size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 border-b border-slate-200 pb-3">
              Property Details
            </h2>

            {/* Property Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Name
                </label>
                <input
                  type="text"
                  placeholder="Enter property name"
                  className="addPropertyStyle"
                  value={formData.propertyName}
                  name="propertyName"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Description
                </label>
                <textarea
                  // rows="4"
                  placeholder="Describe your property..."
                  className="addPropertyStyle resize-none"
                  value={formData.propertyDesc}
                  onChange={handleInputChange}
                  name="propertyDesc"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center">
                    Living Rooms
                    <MdLiving size={20} className="text-yellow-500 ml-2" />
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="addPropertyStyle"
                  value={formData.features.noOfLivingRoom}
                  name="noOfLivingRoom"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center">
                    Bedrooms
                    <MdBedroomChild size={20} className="text-blue-500 ml-2" />
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="addPropertyStyle"
                  value={formData.features.noOfRooms}
                  name="noOfRooms"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center">
                    Bathrooms
                    <FaRestroom size={20} className="text-pink-500 ml-2" />
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="addPropertyStyle"
                  value={formData.features.noOfRestRooms}
                  onChange={handleInputChange}
                  name="noOfRestRooms"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <span className="flex items-center">
                    Area (Sq Ft)
                    <div className="w-5 h-5 rounded ml-2"><img src={sqFT} alt="" /></div>
                  </span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="addPropertyStyle"
                  value={formData.features.sqFt}
                  onChange={handleInputChange}
                  name="sqFt"
                  required
                />
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Property Features
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {featureIcons.map((item) => (
                  <div
                    key={item.key}
                    className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${selectedFeatures.has(item.key)
                      ? 'border-slate-800 bg-slate-100 shadow-md'
                      : 'border-slate-300 hover:border-slate-400 hover:shadow-sm'
                      }`}
                    onClick={() => handleFeatureToggle(item.key)}
                  >
                    <div className="text-center">
                      <div className={`${item.color} mb-2 flex justify-center`}>
                        {item.icon}
                      </div>
                      <span className="text-xs font-medium text-slate-700">
                        {item.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Property Type  */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 border-b border-slate-200 pb-3">
              Property Type
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Type
                </label>
                <select
                  name="propertyType"
                  value={formData.features.propertyType}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      features: {
                        ...prev.features,
                        propertyType: e.target.value as PropertyType,
                      },
                    }))
                  }
                  className="addPropertyStyle"
                >
                  <option value="">Select Property Type</option>
                  <option value={PropertyType.residential}>Residential</option>
                  <option value={PropertyType.Commercial}>Commercial</option>
                  <option value={PropertyType.Industrial}>Industrial</option>
                  <option value={PropertyType.Land}>Land</option>
                  <option value={PropertyType.Villas}>Villas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Selling Type
                </label>
                <select
                  name="propertySellingType"
                  value={formData.features.forSell ? "true" : "false"}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      features: {
                        ...prev.features,
                        forSell: e.target.value === "true",
                      },
                    }))
                  }
                  className="addPropertyStyle"
                >
                  <option value="false">For Rent</option>
                  <option value="true">For Sale</option>
                </select>
              </div>

            </div>
          </div>


          {/* Pricing */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 border-b border-slate-200 pb-3">
              Pricing
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Original Price
                </label>
                <input
                  type="number"
                  placeholder="₹10,000 /month"
                  className="addPropertyStyle"
                  value={formData.price}
                  onChange={handleInputChange}
                  name="price"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Discounted Price
                  <span className="text-xs text-slate-500 ml-1">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="₹8,000 /month"
                  className="addPropertyStyle"
                  value={formData.discountedPrice}
                  onChange={handleInputChange}
                  name="discountedPrice"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 border-b border-slate-200 pb-3">
              Address
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address Line 1
                </label>
                <input
                  type="text"
                  placeholder="Street address"
                  className="addPropertyStyle"
                  value={formData.address.line1}
                  name="line1"
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Address Line 2
                </label>
                <input
                  type="text"
                  placeholder="Apartment, suite, etc."
                  className="addPropertyStyle"
                  name="line2"
                  value={formData.address.line2}
                  onChange={handleInputChange}
                />
              </div>

              {/* State Dropdown */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">State</label>
                <select
                  name="state"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  onChange={handleStateChange}
                  value={states.find(s => s.name === formData.address.state)?.isoCode || ''}
                >
                  <option value="">Select state</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City Dropdown */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">City</label>
                <select
                  name="city"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg"
                  onChange={handleCityChange}
                  value={formData.address.city}
                  disabled={!formData.address.state}
                >
                  <option value="">Select city</option>
                  {cities.map((city, idx) => (
                    <option key={idx} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>




              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Postal Code
                </label>
                <input
                  type="text"
                  placeholder="Enter postal code"
                  className="addPropertyStyle"
                  name="postalCode"
                  value={formData.address.postalCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Rules and Regulations */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-800 border-b border-slate-200 pb-3">
              Rules and Regulations
              <span className="text-sm text-slate-500 ml-2">(Optional)</span>
            </h2>

            <div className="bg-slate-50 rounded-lg p-6">
              <div className="space-y-4">
                {formData.rules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 bg-white p-4 rounded-lg border border-slate-200"
                  >
                    <span className="text-sm font-medium text-slate-600 w-8">
                      {index + 1}.
                    </span>
                    <input
                      type="text"
                      value={rule.rules}
                      onChange={(e) => handleRuleChange(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter rule or regulation"
                    />
                    {formData.rules.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveRule(index)}
                        className="text-red-500 hover:text-red-700 p-2"
                      >
                        <FaTrash size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddRule}
                className="border hover:scale-x-105 rounded-xl mt-4 darkColor px-4 py-2 hover:cursor-pointer font-bold hover:shadow-md"
              >
                Add Rule
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6 border-t border-slate-200">
            <button
              type="submit"
              disabled={isPending}
              className="w-full buttonStyle  font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >

              {isPending ? (
                <div className='buttonStyle w-[75%] text-center'>
                  <CircularProgress className="text-white" size={10} />
                </div>
              ) : (<>
                Register Property
              </>)}
            </button>
          </div>
        </form>

      </div>
      {snackBar.open && (
        <Notification
          open={snackBar.open}
          severity={snackBar.severity}
          message={snackBar.message}
          onClose={() => setSnackBar({ ...snackBar, open: false })}
          autoHideDuration={snackBar.autoHideDuration}
        />
      )}
    </section>
  );
}