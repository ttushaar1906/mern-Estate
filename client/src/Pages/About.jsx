import React from "react";

export default function About() {
  return (
    <div>
      <div className="container justify-between items-center flex-col sm:flex-row">
        <div className="w-full text-center sm:w-6/12 p-4 ">
          <h1 className="text-2xl tracking-wide">Welcome to Tushar Estate</h1>
          <h1 className="text-4xl font-bold text-secondary-color py-2">
            About Us
          </h1>
          <p className="text-justify">
            At Tushar Estate, we are passionate about helping individuals and
            families find their dream homes, sell their properties, or rent the
            perfect space. Our team of dedicated professionals is committed to
            providing exceptional service and guidance throughout your real
            estate journey.
          </p>
        </div>
        <div className="w-full sm:w-6/12">
          <img
            className="h-full object-cover w-full"
            src="https://i.postimg.cc/brX4jNpx/image.png"
            alt="AboutUs"
          />
        </div>
      </div>

      <div className="container justify-between flex-col sm:flex-row">
        <div className="w-full order-2 sm:w-6/12">
          <img
            className="h-full object-cover w-full"
            src="https://i.postimg.cc/PJm9fs5B/image.png"

            alt="AboutUs"
          />
        </div>

        <div className="sm:w-6/12 p-4 sm:order-2">
          <h1 className="text-4xl font-bold text-secondary-color py-2">
            Our Mission
          </h1>
          <p className="text-justify">
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
              <div className="mx-2 mt-4">
                <h1 className="text-4xl font-extrabold p-2 ">264</h1>
                <p className="text-xl font-medium px-2">Project Done</p>
              </div>
              <div className="mx-2 mt-4">
                <h1 className="text-4xl font-extrabold p-2 ">45</h1>
                <p className="text-xl font-medium px-2">Active Project</p>
              </div>
              <div className="mx-2 mt-4">
                <h1 className="text-4xl font-extrabold p-2 ">121</h1>
                <p className="text-xl font-medium px-2">Satisfied Client</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why to choose us */}
      <div>
      <h1 className="text-4xl font-bold text-center mt-4">
        Why Choose <span className="text-primary-color">Us</span>
      </h1>

      <div className="container gap-4 justify-evenly py-4">
        <div className="border bg-primary-color w-60 ">
          <img
            src="https://i.postimg.cc/CMDWsDsm/image.png"
            alt="Expertise"
            className="self-center object-cover w-24 h-24 mix-blend-multiply block m-auto my-4"
          />
          <p className="bg-white p-2 text-justify shadow-xl">
            <h1 className="text-3xl font-bold text-primary-color pb-2">
              Expertise
            </h1>
            Emphasize your team's extensive experience and expertise in the real
            estate industry. Highlight any specializations, certifications, or
            awards that demonstrate your knowledge and reliability.
          </p>
        </div>

        <div className="border bg-primary-color w-60">
          <img
            src="https://i.postimg.cc/dVQpFfPx/image.png"
            alt="commitedToResult"
            className="self-center object-cover w-24 h-24 mix-blend-multiply block m-auto my-4"
          />
          <p className="bg-white p-2 text-justify shadow-xl">
            <h1 className="text-3xl font-bold text-primary-color pb-2">
              Commited
            </h1>
            Communicate your strong commitment to delivering results for
            clients. Whether it's finding the perfect home, selling quickly at
            the best price, emphasize your track record of achieving success.
          </p>
        </div>

        <div className="border bg-primary-color w-60">
          <img
            src="https://i.postimg.cc/FHPqHxhs/image.png"
            alt="MarketInsight"
            className="self-center object-cover w-24 h-24 mix-blend-multiply block m-auto my-4"
          />
          <p className="bg-white p-2 text-justify shadow-xl">
            <h1 className="text-3xl font-bold text-primary-color pb-2">
              Market Insights
            </h1>
            Offer valuable market insights and analysis that help clients make
            informed decisions. Show that you stay updated on market trends,
            pricing dynamics, and investment opportunities.
          </p>
        </div>

        <div className="border bg-primary-color w-60">
          <img
            src="https://i.postimg.cc/SKJP2zKL/image.png"
            alt="PersonalizedService"
            className="self-center object-cover w-24 h-24 mix-blend-multiply block m-auto my-4"
          />
          <p className="bg-white p-2 text-justify shadow-xl">
            <h1 className="text-3xl font-bold text-primary-color pb-2">
              Top Service
            </h1>
            Showcase your commitment to providing personalized and tailored
            services to each client. Mention how you understand and cater to the
            unique needs and preferences of every individual or family.
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
