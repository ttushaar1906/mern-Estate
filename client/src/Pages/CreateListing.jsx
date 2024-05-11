import React from "react";

export default function CreateListing() {
  return (
    <main className="max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-bold text-primary-color my-5">
        Create a list
      </h1>

      <form className="border container justify-center  w-full sm:selection:flex-row">
        <div className="border w-full sm:w-1/2 text-center">
          {/* this is left side div */}
          <input
            type="text"
            placeholder="Enter Name"
            className="p-3 border rounded-lg mt-4 w-64"
            name="name"
            id="name"
          />
          <input
            type="text"
            placeholder="Enter Address"
            className="p-3 border rounded-lg mt-4 w-64"
            name="address"
            id="address"
          />
          <textarea
            placeholder="Enter Description"
            className="p-3 border rounded-lg mt-4 w-64"
            name="description"
            id="description"
          />

          <div className="flex gap-2 mt-4 justify-evenly">
            <input type="checkbox" className="w-5" name="rent" id="rent" />
            <span>Rent</span>
            <input type="checkbox" className="w-5" name="sell" id="sell" />
            <span>Sell</span>
            <input
              type="checkbox"
              className="w-5"
              name="parking"
              id="parking"
            />
            <span>Parking</span>
            <input
              type="checkbox"
              className="w-5"
              name="furnished"
              id="furnished"
            />
            <span>Furnished</span>
            <input type="checkbox" className="w-5" name="offer" id="offer" />
            <span>Offer</span>
          </div>

          <div className="flex flex-wrap sm:justify-around mt-2 sm:gap-4 border flex-col sm:flex-row">
            <div className="flex align-middle item-center">
              <input
                type="number"
                name="bedroom"
                id="bedroom"
                className="w-8 sm:w-12 m-2 border"
              />
              <p className="m-2">Bedroom</p>
            </div>
            <div className="flex align-middle item-center">
              <input
                type="number"
                name="bathroom"
                id="bathroom"
                className="w-8 sm:w-12 m-2 border"
              />
              <p className="m-2">Bathroom</p>
            </div>
            <div className="flex align-middle item-center">
              <input
                type="number"
                name="regularPrice"
                id="regularPrice"
                className="w-8 sm:w-12 m-2 border"
              />
              <div className="m-1">
                <p className=" align-middle">Regular Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
            <div className="flex align-middle item-center">
              <input
                type="number"
                name="discountedPrice"
                id="discountedPrice"
                className="w-8 sm:w-12 m-2 border"
              />
              <div className="m-1">
                <p className="">Discounted Price</p>
                <span className="text-xs">($ / Month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border w-1/2">
          {/* This is right side div */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet,
            nesciunt.
          </p>
        </div>
      </form>
    </main>
  );
}
