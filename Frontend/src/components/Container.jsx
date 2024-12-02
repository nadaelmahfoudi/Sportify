import React from 'react';
import Sport from '../assets/Sport.svg';
function Container() {
  return (
    <div>
      <section className="bg-gray-600 dark:bg-gray-900">
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-white capitalize lg:text-3xl dark:text-white">
            Welcome To Sportify !
          </h1>

          <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
            <img
              className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
              src={Sport} alt="Blog illustration"
            />

            <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6">

              <a
                href="#"
                className="block mt-4 text-2xl font-semibold text-white hover:underline dark:text-white"
              >
                All the features you want to know
              </a>

              <p className="mt-3 text-sm text-gray-200 dark:text-gray-300 md:text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
                veritatis sint autem nesciunt, laudantium quia tempore delect
              </p>

              <a
                href="#"
                className="inline-block mt-2 text-blue-500 underline hover:text-blue-400"
              >
                Read more
              </a>

              <div className="flex items-center mt-6">
                <img
                  className="object-cover object-center w-10 h-10 rounded-full"
                  src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                  alt="Author"
                />

                <div className="mx-4">
                  <h1 className="text-sm text-gray-400 dark:text-gray-200">
                    Elmahfoudi Nada
                  </h1>
                  <p className="text-sm text-gray-200 dark:text-gray-400">
                    Lead Developer
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Container;
