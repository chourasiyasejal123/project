import React from "react";
import { useState } from 'react';  // Only import what you need
import AddUser from "./AddUser";
import UserList from "./UserList";

const Distributor = () => {
  // State to toggle visibility
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUserList, setShowUserList] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <header className="bg-blue-600 text-white p-4 rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center">Manage Users</h1>
      </header>

      {/* Main Content */}
      <main className="mt-6 space-y-8">
        {/* Add User Section */}
        <section className="bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Add a New User
            </h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              onClick={() => setShowAddUser(!showAddUser)}
            >
              {showAddUser ? "Hide Form" : "Add User"}
            </button>
          </div>
          {showAddUser && (
            <div className="mt-4">
              <AddUser />
            </div>
          )}
        </section>

        {/* User List Section */}
        <section className="bg-white p-6 rounded-md shadow-md">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Existing Users
            </h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition"
              onClick={() => setShowUserList(!showUserList)}
            >
              {showUserList ? "Hide List" : "View Users"}
            </button>
          </div>
          {showUserList && (
            <div className="mt-4">
              <UserList />
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Distributor;



