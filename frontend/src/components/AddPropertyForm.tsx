import { BsFillHouseHeartFill } from "react-icons/bs";
import { FaDog, FaPersonSwimming, FaRestroom, FaSquareParking } from "react-icons/fa6";
import { GiCctvCamera, GiElevator, GiPoliceOfficerHead } from "react-icons/gi";
import { MdBedroomChild, MdLiving, MdSportsCricket } from "react-icons/md";
import Balcony from "../images/balcony.png"
import sqFT from "../images/sqft.png"
import { useState } from "react";

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
    { key: 'balcony', icon: <img src={Balcony} alt="balcony" className="w-6 h-6" />, label: 'Balcony', color: 'text-slate-600' }

  ];


  const [rules, setRules] = useState([{ reason: "" }]);

  const handleChange = (index: number, value: string) => {
    const updatedRules = [...rules];
    updatedRules[index].reason = value;
    setRules(updatedRules);
  };

  const handleAddRow = (e) => {
    e.preventDefault()
    setRules([...rules, { reason: "" }]);
  };

  const handleRemoveRow = (e, index: number) => {
    e.preventDefault()
    const updatedRules = rules.filter((_, i) => i !== index);
    setRules(updatedRules);
  };

  return (
    <section className="border customeContainer">
      <h1 className="lgHeading my-4">
        Add Your's Property
      </h1>
      <form className="border p-4">
        <div>
          <h2 className="text-slate-700 text-xl font-semibold mb-4">Property Details </h2>

          <div className="mb-4">
            <label className="labelStyleCont">
              Enter Property Name
            </label>
            <input type="text"
              placeholder="Enter Property Name"
              className="inputFieldInfo" />
          </div>

          <div className="mb-2">
            <label className="labelStyleCont">
              Enter Property Description
            </label>
            <textarea
              placeholder="Enter Property Description"
              className="inputFieldInfo" />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="">
              <label className="labelStyleCont">
                No of Living Room
                <MdLiving size={20} className="text-yellow-500 ml-2 inline-block" />
              </label>
              <input type="text"
                placeholder="Enter No of Living Room"
                className="inputFieldInfo"
                name="" />
            </div>

            <div className="">
              <label className="labelStyleCont">
                No of Restroom Room
                <FaRestroom size={20} className="text-pink-500 inline-block ml-2" />
              </label>
              <input type="text"
                placeholder="Enter No of Restroom Room"
                className="inputFieldInfo"
                name="" />
            </div>

            <div className="">
              <div className="">
                <label className="labelStyleCont">
                  No of Bed Rooms
                  <MdBedroomChild size={20} className="text-blue-500 inline-block ml-2" />
                </label>
              </div>

              <input type="text"
                placeholder="Enter No of Restroom Room"
                className="inputFieldInfo"
                name="" />
            </div>

            <div className="">
              <label className="labelStyleCont">
                Sq Ft Area
                <img src={sqFT} alt="sqFT" className="w-5 h-5 inline-block ml-2" />
              </label>
              <input type="text"
                placeholder="Enter No of Sq Ft area of Property"
                className="inputFieldInfo"
                name="" />
            </div>
          </div>


          <div className="flex gap-6 flex-wrap mb-6 justify-start">
            {featureIcons.map((item) => (
              <div className="shadow-xs flex items-center gap-2 p-2">
                <input type="checkbox" name={item.key} id="" className="" />
                <div className={item.color}>
                  {item.icon}
                </div>
                <label htmlFor="">{item.label}</label>
              </div>
            ))}
          </div>

          <div className="">
            <h2 className="text-slate-700 text-xl font-semibold my-4">Pricing</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="">
                <label className="labelStyleCont">
                  Original Price:
                </label>
                <input type="text"
                  placeholder="Enter Original Price eg: (₹10000 /month)"
                  className="inputFieldInfo"
                  name="" />
              </div>

              <div className="">
                <label className="labelStyleCont">
                  Discounted Price: {" "}
                  <span className="text-xs">(If Any)</span>
                </label>
                <input type="text"
                  placeholder="Enter Price After Discount eg: (₹8000 /month after discount)"
                  className="inputFieldInfo"
                  name="" />
              </div>
            </div>
          </div>

        </div>

        {/* Address */}
        <div className="">
          <h2 className="text-slate-700 text-xl font-semibold my-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="labelStyleCont">Address Line 1</label>
              <input type="text"
                placeholder="Enter Address Line 1"
                className="inputFieldInfo" />
            </div>
            <div>
              <label className="labelStyleCont">Address Line 1</label>
              <input type="text"
                placeholder="Enter Address Line 2"
                className="inputFieldInfo" />
            </div>
            <div>
              <label className="labelStyleCont">State</label>
              <input type="text"
                placeholder="Enter State"
                className="inputFieldInfo" />
            </div>
            <div>
              <label className="labelStyleCont">City</label>
              <input type="text"
                placeholder="Enter City"
                className="inputFieldInfo" />
            </div>
            <div>
              <label className="labelStyleCont">Postal Code</label>
              <input type="text"
                placeholder="Enter Postal Code"
                className="inputFieldInfo" />
            </div>
          </div>
        </div>

        {/* Rules and Regulation  */}

        <div className="">
          <h2 className="text-slate-700 text-xl font-semibold my-4">Rules and Regulation's <span className="text-xs">(If Any)</span></h2>
          <div>
            <div className="border rounded-md">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm">
                    <th className="border px-4 py-2 w-16">#</th>
                    <th className="border px-4 py-2">Reason</th>
                    <th className="border px-4 py-2 w-24">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rules.map((rule, index) => (
                    <tr key={index} className="text-sm">
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          value={rule.reason}
                          onChange={(e) => handleChange(index, e.target.value)}
                          className="w-full border rounded px-2 py-1"
                          placeholder="Enter reason"
                        />
                      </td>
                      <td className="border px-4 py-2 text-center">
                        <button
                          onClick={() => handleRemoveRow(index)}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleAddRow}
                className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Rule
              </button>
            </div>
          </div>
        </div>

      </form>
    </section>
  )
}
