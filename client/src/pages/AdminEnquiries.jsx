import { useEffect, useState } from "react";
import AdminNavbar from "../components/navbar/AdminNavbar";
import API from "../services/api";

const AdminEnquiries = () => {

  const [enquiries, setEnquiries] =
    useState([]);

  const fetchEnquiries = async () => {
    try {

      const response = await API.get(
        "/bulk-enquiry"
      );

      setEnquiries(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const deleteEnquiry = async (id) => {
    try {

      await API.delete(
        `/bulk-enquiry/${id}`
      );

      fetchEnquiries();

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8faf8] p-8">

      <div className="max-w-7xl mx-auto">
<AdminNavbar />
        {/* HEADER */}

        <div className="mb-12">

          <span className="inline-block bg-orange-100 text-orange-500 px-5 py-2 rounded-full font-medium mb-5">
            FreshIndia CRM
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Bulk Enquiries
          </h1>

        </div>

        {/* EMPTY */}

        {enquiries.length === 0 && (

          <div className="bg-white rounded-3xl border border-green-100 p-16 text-center">

            <h2 className="text-3xl font-bold text-gray-800">
              No Enquiries Yet
            </h2>

          </div>

        )}

        {/* TABLE */}

        {enquiries.length > 0 && (

          <div className="overflow-x-auto bg-white rounded-3xl border border-green-100 shadow-sm">

            <table className="w-full">

              <thead className="bg-green-700 text-white">

                <tr>

                  <th className="p-5 text-left">
                    Name
                  </th>

                  <th className="p-5 text-left">
                    Company
                  </th>

                  <th className="p-5 text-left">
                    Country
                  </th>

                  <th className="p-5 text-left">
                    Product
                  </th>

                  <th className="p-5 text-left">
                    Quantity
                  </th>

                  <th className="p-5 text-left">
                    Email
                  </th>

                  <th className="p-5 text-left">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {enquiries.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-green-100"
                  >

                    <td className="p-5">
                      {item.full_name}
                    </td>

                    <td className="p-5">
                      {item.company_name}
                    </td>

                    <td className="p-5">
                      {item.country}
                    </td>

                    <td className="p-5">
                      {item.product}
                    </td>

                    <td className="p-5">
                      {item.quantity}
                    </td>

                    <td className="p-5">
                      {item.email}
                    </td>

                    <td className="p-5">

                      <button
                        onClick={() =>
                          deleteEnquiry(item.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-full"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
};

export default AdminEnquiries;