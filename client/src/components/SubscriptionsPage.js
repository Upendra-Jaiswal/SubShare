// src/pages/SubscriptionsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const SubscriptionsPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const token = localStorage.getItem("token"); // Get JWT token from local storage
        const response = await axios.get(
          "http://localhost:3001/api/subscriptions",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send JWT token in header
            },
          }
        );
        setSubscriptions(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch subscriptions");
      }
    };

    fetchSubscriptions();
  }, []);

  return (
    // <div className="max-w-4xl mx-auto p-6">
    //   <h1 className="text-3xl font-bold mb-4">Your Subscriptions</h1>
    //   {error && <p className="text-red-500 mb-4">{error}</p>}
    //   <div className="bg-white shadow-md rounded-lg p-4">
    //     <ul className="space-y-4">
    //       {subscriptions.length === 0 ? (
    //         <p className="text-gray-500">No subscriptions found.</p>
    //       ) : (
    //         subscriptions.map((subscription) => (
    //           <li
    //             key={subscription._id}
    //             className="bg-gray-100 p-4 rounded-md shadow-sm hover:bg-gray-200 transition"
    //           >
    //             <h2 className="text-xl font-semibold mb-2">
    //               {subscription.name}
    //             </h2>
    //             <p className="text-gray-700">{subscription.description}</p>
    //           </li>
    //         ))
    //       )}
    //     </ul>
    //   </div>
    // </div>
    <div className="flex flex-row flex-wrap justify-center bg-gray-100 p-4 gap-4">
      {subscriptions.length === 0 ? (
        <p className="text-gray-500">No subscriptions found.</p>
      ) : (
        subscriptions.map((subscription) => (
          <div
            key={subscription._id}
            className="flex flex-col items-stretch bg-white border border-gray-200 rounded-lg shadow-2xl w-64 h-96 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex-shrink-0">
              <img
                className="object-cover w-full h-48 rounded-t-lg"
                src={subscription.image || "default-image.jpg"} // Use a default image if none provided
                alt={subscription.name}
              />
            </div>
            <div className="flex flex-col flex-grow p-4 leading-normal">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {subscription.name}
              </h2>
              <p className="text-gray-700 mb-2">{subscription.description}</p>
              <p className="text-xs text-gray-800 dark:text-gray-500">
                {subscription.users[0].name}
                <br />
                and {subscription.users.length - 1} others are sharing this
              </p>
            </div>
            <div className="flex-shrink-0 p-4">
              <button className="bg-blue-600 text-white rounded-md px-4 py-2 w-full">
                Subscribe
                {/* <Link to="/users" state={{ users: subscription.users }}>
                  Subscribe
                </Link> */}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SubscriptionsPage;
