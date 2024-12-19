import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchableContent = ({content, data, setData}) => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUserName, setNewUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Function to add a new user
  const handleAddUser = () => {
    if (newUserName.trim()) {
      const newUser = { id: data.length + 1, name: newUserName };
      setData([...data, newUser]);
      setAddModalOpen(false);
      setNewUserName("");
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    setData(data.filter(user => user.id !== id));
  };

  // Filter users based on search query
  const filteredUsers = data.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="my-4 mx-12">
      <button
        onClick={() => setAddModalOpen(true)}
        className="flex self-start mx-2 px-4 py-2 rounded bg-slate-200"
      >
        Add {content}
      </button>

      {/* Search Bar */}
      <div className="my-4 relative">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full p-2 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      <p className="flex self-start my-4">My {content}:</p>
      <div className="my-4">
        <ul className="space-y-2">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="p-2 border rounded shadow-sm hover:bg-gray-100 flex justify-between items-center cursor-pointer"
              onClick={() => handleUserClick(user)}
            >
              <p>{user.name}</p>
              <img src= "./arrow.png" className="w-6 h-6 mx-4"/>
            </li>
          ))}
        </ul>
        {filteredUsers.length === 0 && (
          <p className="text-gray-500 text-center py-4">No users found</p>
        )}
      </div>

      {/* Modal for Adding User */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl mb-4">Add New {content}</h3>
            <input
              type="text"
              value={newUserName}
              onChange={(e) => setNewUserName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter user name"
            />
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setAddModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add {content}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for User Details */}
      {userModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl mb-4">User Details</h3>
            {
              selectedUser.name && (
                <p className="mb-4">Name: {selectedUser.name}</p>
              )
            }
            
            <div className="flex justify-end">
              <button
                onClick={() => setUserModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableContent;