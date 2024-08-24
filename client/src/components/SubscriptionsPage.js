// src/pages/SubscriptionsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
              <p className="text-gray-700 mb-2">{subscription.name}</p>
              <p className="text-xs text-gray-800 dark:text-gray-500">
                {subscription.users.length === 0 ? (
                  <div>
                    {" "}
                    <p>No user is sharing this now</p>
                  </div>
                ) : (
                  <div>
                    {subscription.users}
                    <br />
                    and {subscription.users.length - 1} others are sharing this{" "}
                  </div>
                )}
                {/* {subscription.users}
                <br />
                and {subscription.users.length - 1} others are sharing this */}
              </p>
            </div>
            <div className="flex-shrink-0 p-4">
              <button className="bg-blue-600 text-white rounded-md px-4 py-2 w-full">
                <Link to="/users" state={{ users: subscription.users }}>
                  Subscribe
                </Link>
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SubscriptionsPage;
