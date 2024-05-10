import React from "react";

export default function CreateListing() {
  return (
    <main className="max-w-lg">
      <h1 className="text-3xl text-center font-bold text-primary-color my-5">
        Create a list
      </h1>

      <form className="container flex flex-col sm:flex-row min-w-max">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Enter Name"
            id="name"
            className=" p-3 rounded-lg shadow-lg"
            required
          />
          <textarea
            type="text"
            placeholder="Enter Description"
            id="description"
            className=" p-3 rounded-lg shadow-lg"
            required
          />
          <input
            type="text"
            placeholder="Enter Address"
            id="address"
            className=" p-3 rounded-lg shadow-lg"
            required
          />
           <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='sale'
                className='w-5'
                // onChange={handleChange}
                // checked={formData.type === 'sale'}
              />
              <span>Sell</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='rent'
                className='w-5'
                // onChange={handleChange}
                // checked={formData.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='parking'
                className='w-5'
                // onChange={handleChange}
                // checked={formData.parking}
              />
              <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='furnished'
                className='w-5'
                // onChange={handleChange}
                // checked={formData.furnished}
              />
              <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
              <input
                type='checkbox'
                id='offer'
                className='w-5'
                // onChange={handleChange}
                // checked={formData.offer}
              />
              <span>Offer</span>
            </div>
        </div>
        {/* <div> */}

        </div>
      </form>
    </main>
  );
}
