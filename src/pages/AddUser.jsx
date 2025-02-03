import React, { useState, useEffect } from "react";
import { db } from "../components/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";
import EmailVerification from "./EmailVerification";
import PhoneVerification from "./PhoneVerification";

const AddUser = () => {
  const [zones, setZones] = useState([]);
  const [assignedZones, setAssignedZones] = useState({});
  const [newUser, setNewUser] = useState({
    role: "salesman",
    name: "",
    email: "",
    phone: "",
    zone: "",
    password: "",
    isEmailVerified: false,
    isPhoneVerified: false,
  });

  useEffect(() => {
    const fetchZones = async () => {
      const zonesSnapshot = await getDocs(collection(db, "zones"));
      const zonesData = zonesSnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }));
      setZones(zonesData);

      const assignedZones = {};
      const usersSnapshot = await getDocs(collection(db, "salesmen"));
      usersSnapshot.forEach((doc) => {
        assignedZones[doc.data().zone] = true;
      });

      setAssignedZones(assignedZones);
    };

    fetchZones();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!newUser.isEmailVerified || !newUser.isPhoneVerified) {
      alert("Please verify email and phone number first.");
      return;
    }

    if (!newUser.password || newUser.password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    try {
      await addDoc(collection(db, newUser.role === "salesman" ? "salesmen" : "distributors"), newUser);
      alert(`${newUser.role} added successfully!`);
      setNewUser({
        role: "salesman",
        name: "",
        email: "",
        phone: "",
        zone: "",
        password: "",
        isEmailVerified: false,
        isPhoneVerified: false,
      });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-md shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add New User</h2>
      <form onSubmit={handleAddUser} className="space-y-4">
        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="salesman">Salesman</option>
            <option value="distributor">Distributor</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            placeholder="Enter name"
            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Email Verification */}
        <EmailVerification
          email={newUser.email}
          onVerify={() => setNewUser((prev) => ({ ...prev, isEmailVerified: true }))}
          onChange={(email) => setNewUser({ ...newUser, email })}
          password={newUser.password} // Pass password here
          onPasswordChange={(password) => setNewUser({ ...newUser, password })}
        />

        {/* Phone Verification */}
        <PhoneVerification
          phone={newUser.phone}
          onVerify={() => setNewUser((prev) => ({ ...prev, isPhoneVerified: true }))}
          onChange={(phone) => setNewUser({ ...newUser, phone })}
        />

        {/* Zone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Zone</label>
          <select
            value={newUser.zone}
            onChange={(e) => setNewUser({ ...newUser, zone: e.target.value })}
            className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select Zone</option>
            {zones.map((zone) => (
              <option key={zone.id} value={zone.id} disabled={assignedZones[zone.id]}>
                {zone.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;