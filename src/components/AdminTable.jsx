import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminTable = () => {
  const [users, setUsers] = useState([]);

  // Fetch data from backend when component loads
//   useEffect(() => {
//     axios
//       .get("/api/users") // replace with your backend API
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.log(err));
//   }, []);
useEffect(() => {
  setUsers([
    // { name: "John Doe", dob: "1990-01-01", email: "john@example.com", contact: "1234567890", gender: "Male" },
    // { name: "Jane Smith", dob: "1992-05-10", email: "jane@example.com", contact: "0987654321", gender: "Female" },
  ]);
}, []);


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Submitted Details</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">DOB</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Contact</th>
              <th className="py-2 px-4 border">Gender</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No data found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.dob}</td>
                  <td className="py-2 px-4 border">{user.email}</td>
                  <td className="py-2 px-4 border">{user.contact}</td>
                  <td className="py-2 px-4 border">{user.gender}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
