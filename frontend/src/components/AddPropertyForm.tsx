export default function AddPropertyForm() {


  return (
    <section className="border customeContainer">
      <h1 className="lgHeading my-4">
        Add Your's Property
      </h1>
      <form className="border p-4">
        <div>
          <div>
            <label className="labelStyleCont">
              Enter Name
            </label>
            <input type="text"
              placeholder="Enter Property Name"
              className="inputFieldInfo" />
          </div>

        </div>

        {/* Address */}
        <div className=""> 
          <h2 className="text-slate-700 text-xl font-semibold">Address</h2>
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
          <h2 className="text-slate-700 text-xl font-semibold">Rules and Regulation's <span className="text-xs">(If Any)</span></h2>

      </div>

      </form>
    </section>
  )
}
