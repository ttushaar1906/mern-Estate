import React from "react";

export default function About() {
  return (
    <div>
      <div className="container justify-between">
        <div className="w-6/12 p-4 ">
          <h1 className="text-2xl tracking-wider">Welcome to Tushar Estate</h1>
          <h1 className="text-4xl font-bold text-secondary-color py-2">
            About Us
          </h1>
          <p className="">
            At Tushar Estate, we are passionate about helping individuals and
            families find their dream homes, sell their properties, or rent the
            perfect space. Our team of dedicated professionals is committed to
            providing exceptional service and guidance throughout your real
            estate journey.
          </p>
        </div>
        <div className=" w-6/12">
          <img
            className="h-full object-cover w-full"
            src="../src/assets/aboutUs.png"
            alt="AboutUs"
          />
        </div>
      </div>

      <div className="container justify-between border">
        <div className=" w-6/12">
          <img
            className="h-full object-cover w-full"
            src="../src/assets/aboutUs.png"
            alt="AboutUs"
          />
        </div>
        <div className="w-6/12 p-4 border">
          <h1 className="text-4xl font-bold text-secondary-color py-2">
            Our Mission
          </h1>
          <p className="">
            Our mission is to simplify the process of buying, selling, or
            renting real estate by utilizing cutting-edge technology, in-depth
            market knowledge, and personalized attention to every client's
            needs. We strive to exceed expectations and create lasting
            relationships built on trust and transparency.
          </p>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold border-b-2 inline pt-4">
              Plan your House
            </h2>
            <div className="flex">
              <div className="mx-2">
                <h1 className="text-4xl font-extrabold p-2 ">264</h1>
                <p className="text-xl font-medium px-2">Project Done</p>
              </div>
              <div className="mx-2">
                <h1 className="text-4xl font-extrabold p-2 ">45</h1>
                <p className="text-xl font-medium px-2">Active Project</p>
              </div>
              <div className="mx-2">
                <h1 className="text-4xl font-extrabold p-2 ">121</h1>
                <p className="text-xl font-medium px-2">Satisfied Client</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
