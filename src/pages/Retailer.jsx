import React, { useState } from 'react';
import SearchableContent from '../components/seachable-content';
import { CircleUserRound, Settings } from 'lucide-react';

function Retailer() {
  const [page, setPage] = useState('users');

  const [users, setUsers] = useState([
    { id: 1, name: "Daniel 1" },
    { id: 2, name: "Daniel 2" },
    { id: 3, name: "Daniel 3" },
  ]);

  const [permissions, setPermissions] = useState([
      { id: 1, name: "Admin", level: "High" },
      { id: 2, name: "Editor", level: "Medium" },
      { id: 3, name: "Viewer", level: "Low" },
  ]);

  const [stores, setStores] = useState([
      { id: 1, name: "Store 1", location: "City A" },
      { id: 2, name: "Store 2", location: "City B" },
      { id: 3, name: "Store 3", location: "City C" },
  ]);

  const [apis, setApis] = useState([
      { id: 1, name: "API 1", status: "Active" },
      { id: 2, name: "API 2", status: "Inactive" },
      { id: 3, name: "API 3", status: "Pending" },
  ]);

  const [slips, setSlips] = useState([
      { id: 1, name: "SL123", date: "2024-01-01" },
      { id: 2, name: "SL124", date: "2024-02-01" },
      { id: 3, name: "SL125", date: "2024-03-01" },
  ]);

  const renderPage = () => {
      switch (page) {
          case 'users':
              return <SearchableContent content="users" data={users} setData={setUsers} />;
          case 'permissions':
              return <SearchableContent content="permissions" data={permissions} setData={setPermissions} />;
          case 'stores':
              return <SearchableContent content="stores" data={stores} setData={setStores} />;
          case 'apis':
              return <SearchableContent content="apis" data={apis} setData={setApis} />;
          case 'slips':
              return <SearchableContent content="slips" data={slips} setData={setSlips} />;
          default:
              return (<p>not found</p>);
      }
  };


  return (
    <div className="text-center">
      <div className="bg-slate-100	p-3 flex">
        <CircleUserRound className={"w-6 h-6 my-auto mx-6 cursor-pointer"}/>
        <div className={"mx-auto"}>
          <button onClick={() => setPage('users')} className={`p-3 hover:font-semibold ${page === "users" ? "underline" : ""}`}> Users </button>
          <button onClick={() => setPage('permissions')} className={`p-3 hover:font-semibold ${page === "permissions" ? "underline" : ""}`}>Permissions</button>
          <button onClick={() => setPage('stores')} className={`p-3 hover:font-semibold ${page === "stores" ? "underline" : ""}`}>Stores</button>
          <button onClick={() => setPage('apis')} className={`p-3 hover:font-semibold ${page === "apis" ? "underline" : ""}`}>APIs</button>
          <button onClick={() => setPage('slips')} className={`p-3 hover:font-semibold ${page === "slips" ? "underline" : ""}`}>Slips</button>
        </div>
        <Settings className={"w-6 h-6 my-auto mx-6 cursor-pointer"}/>

      </div>
      <div className="max-w-7xl mx-auto">
      {renderPage()}
      </div>
    </div>
  );
}

export default Retailer;