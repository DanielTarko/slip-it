import React, { useState } from "react";
import { Search, X, MoveRight } from "lucide-react";

const SearchableContent = ({content, data, setData, addElement, deleteElement}) => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [elementModalOpen, setElementModalOpen] = useState(false);
  const [selectedElement, setSelectedElement] = useState(null);
  const [newElementName, setNewElementName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");



  // Function to add a new element
  const handleAddElement = () => {
    if (newElementName.trim()) {
      const newElement = { id: data.length + 1, name: newElementName };
      setData([...data, newElement]);
      setAddModalOpen(false);
      setNewElementName("");
    }
  };

  const handleElementClick = (element) => {
    setSelectedElement(element);
    setElementModalOpen(true);
  };


  // Filter elements based on search query
  const filteredElements = data.filter(element =>
    element.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteElement = () => {
    if (selectedElement) {
      const newData = data.filter(element => element.id !== selectedElement.id);
      setData(newData);
      setElementModalOpen(false);
    }
  };

  const handleEditElement = () => {
    if (isEditing && editedName.trim()) {
      const newData = data.map(element => 
        element.id === selectedElement.id 
          ? { ...element, name: editedName }
          : element
      );
      setData(newData);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };



let singularElementString;
switch (content) {
  case 'users':
    singularElementString = "User";
    break;
  case 'permissions':
    singularElementString = "Permission";
    break;
  case 'stores':
    singularElementString = "Store";
    break;
  case 'apis':
    singularElementString = "API";
    break;
  case 'slips':
    singularElementString = "Slip";
    break;
  default:
      singularElementString = "Unknown selection.";
}

  return (
    <div className="my-4 mx-12">
      <button
        onClick={() => setAddModalOpen(true)}
        className="flex self-start mx-2 px-4 py-2 rounded bg-slate-200"
      >
        Add {singularElementString}
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

      <p className="flex self-start my-4">My {singularElementString}:</p>
      <div className="my-4">
        <ul className="space-y-2">
          {filteredElements.map((element) => (
            <li
              key={element.id}
              className="p-2 border rounded shadow-sm hover:bg-gray-100 flex justify-between items-center cursor-pointer"
              onClick={() => handleElementClick(element)}
            >
              <p>{element.name}</p>
              <MoveRight className="w-6 h-6 mx-4"/>
            </li>
          ))}
        </ul>
        {filteredElements.length === 0 && (
          <p className="text-gray-500 text-center py-4">No elements found</p>
        )}
      </div>

      {/* Modal for Adding Element */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-xl mb-4">Add New {singularElementString}</h3>
            <input
              type="text"
              value={newElementName}
              onChange={(e) => setNewElementName(e.target.value)}
              className="w-full p-2 border rounded mb-4"
              placeholder="Enter element name"
            />
            <div className="flex justify-between space-x-4">
              <button
                onClick={() => setAddModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddElement}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add {singularElementString}
              </button>
            </div>
          </div>
        </div>
      )}

      {elementModalOpen && selectedElement && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              onClick={() => {
                setElementModalOpen(false);
                setIsEditing(false);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl mb-4">{singularElementString} Details</h3>
            
            <div className="mb-4">
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <p>Name: {selectedElement.name}</p>
              )}
              <p>ID: {selectedElement.id}</p>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={handleEditElement}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
              <button
                onClick={handleDeleteElement}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableContent;