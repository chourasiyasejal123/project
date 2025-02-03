import React, { useEffect, useState } from "react";
import { db, auth } from "../components/firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { sendPasswordResetEmail } from "firebase/auth";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [zones, setZones] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const zonesSnapshot = await getDocs(collection(db, "zones"));
        const zonesData = {};
        zonesSnapshot.docs.forEach((doc) => {
          zonesData[doc.id] = doc.data().name; // Assuming each zone document has a "name" field
        });
        setZones(zonesData);
      } catch (error) {
        console.error("Error fetching zones:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const salesmenSnapshot = await getDocs(collection(db, "salesmen"));
        const distributorsSnapshot = await getDocs(collection(db, "distributors"));

        const salesmen = salesmenSnapshot.docs.map((doc) => ({
          id: doc.id,
          role: "Salesman",
          ...doc.data(),
        }));
        const distributors = distributorsSnapshot.docs.map((doc) => ({
          id: doc.id,
          role: "Distributor",
          ...doc.data(),
        }));

        setUsers([...salesmen, ...distributors]);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await fetchZones();
      await fetchUsers();
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleResetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert(`Password reset email sent to ${email}`);
    } catch (error) {
      console.error("Error sending password reset email:", error);
      alert("Error sending password reset email. Please try again.");
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading user data...</p>;
  }

  if (users.length === 0) {
    return <p className="text-center text-gray-500">No users found.</p>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">User List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-md shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-bold text-gray-700">{user.name}</h3>
            <p className="text-sm text-gray-600">
              <strong>Role:</strong> {user.role}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Zone:</strong>{" "}
              {zones[user.zone] || "Not Assigned"} {/* Map zone ID to name */}
            </p>
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handleResetPassword(user.email)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
              >
                Reset Password
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;