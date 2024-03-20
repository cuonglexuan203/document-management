"use client";

import React from "react";
import Image from "next/image";

const AboutGovernmentPage = () => {
  return (
    <>
      <section className="px-2 py-32 bg-white md:px-0">
        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="block xl:inline">XÂY DỰNG VỮNG MẠNH</span>
                  <br></br>
                  <span className="block text-indigo-600 xl:inline">
                    VIETNAM.
                  </span>
                </h1>
                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                  The Vietnamese State, with its bravery and historical cultural
                  strength, is constantly developing strongly both economically,
                  politically and socially. With solidarity and intelligence,
                  the Vietnamese government has been affirming its position in
                  the international arena as an independent and self-reliant
                  country.
                </p>
                <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                  With a focus on developing e-government services, digital
                  education, and smart city solutions, we aim to bridge the
                  digital divide, facilitate citizens' access to government
                  services, and promote digital literacy across all
                  demographics.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="w-full h-full overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                <Image
                  src="/assets/Vietnam.jpg"
                  alt="Symbolic representation of a strong and independent Vietnamese state"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-gray-50 pt-7 pb-7 md:pt-20 md:pb-24">
        <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
          {/* Vision Section */}
          <div className="box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
              VISION
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
              To be a leading department in Asia for digital government services
              and innovation, ensuring that all citizens benefit from the
              digital economy.
            </p>
          </div>

          {/* Mission Section */}
          <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
              MISSION
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
              To accelerate Vietnam's digital transformation by implementing
              forward-thinking policies, fostering innovation, and providing
              secure, efficient, and accessible digital services.
            </p>
          </div>
        </div>
      </section>

      {/* Future Goals and Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="container items-center max-w-6xl px-4 mx-auto sm:px-20 md:px-32 lg:px-16">
          <div className="flex flex-wrap items-center -mx-3">
            <div className="w-full px-3 lg:w-1/2">
              <div className="w-full lg:max-w-md">
                <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading">
                  Our Impact & Future Goals
                </h2>
                <ul>
                  <li className="flex items-center py-2 space-x-4 xl:py-3">
                    <span className="font-medium text-gray-500">
                      Launch of the National Digital Identity platform,
                      significantly improving access to e-services.
                    </span>
                  </li>
                  <li className="flex items-center py-2 space-x-4 xl:py-3">
                    <span className="font-medium text-gray-500">
                      Introduction of the Digital Economy Blueprint, setting the
                      stage for sustainable growth.
                    </span>
                  </li>
                  <li className="flex items-center py-2 space-x-4 xl:py-3">
                    <span className="font-medium text-gray-500">
                      Expansion of digital literacy programs, ensuring
                      inclusivity in the digital age.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full px-3 mb-12 lg:w-1/2 lg:mb-0">
              <Image
                src="/path-to-future-goals-image.jpg"
                alt="Future Goals"
                layout="responsive"
                width={700}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutGovernmentPage;
