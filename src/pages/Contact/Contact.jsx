import React, { useEffect, useState } from "react";

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/contacts")
      .then((res) => res.json())
      .then((data) => setContacts(data));
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    await fetch(`http://localhost:5000/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    setContacts((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
   <div className="bg-gray-50">

     <div className="min-h-screen   py-16 px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold  text-gray-800 mb-8">📞 Contacts</h1>

      <div className="overflow-x-auto ">
        <table className="w-full border-collapse">
          <thead className="bg-pink-100 text-left text-gray-700">
            <tr>
              <th className="p-3">Phone Number</th>
              <th className="p-3">Date</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c._id} className="border-b hover:bg-gray-100">
                <td className="p-3">{c.phone}</td>
                <td className="p-3">{new Date(c.createdAt).toLocaleString()}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      c.status === "contacted"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td className="p-3">
                  {c.status === "pending" && (
                    <button
                      onClick={() => handleStatusChange(c._id, "contacted")}
                      className="px-4 py-1 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
                    >
                      Mark as Contacted
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

   </div>
  );
};

export default Contact;
