const Profile = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f8faf8] flex items-center justify-center">
        <h1 className="text-3xl font-bold text-green-700">
          Please Login
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] pt-36 pb-20 px-6">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-12">

          <span className="inline-block bg-green-100 text-green-700 px-5 py-2 rounded-full font-medium mb-5">
            My Account
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Profile Information
          </h1>

        </div>

        {/* PROFILE CARD */}

        <div className="bg-white rounded-3xl shadow-sm border border-green-100 p-10">

          <div className="flex flex-col md:flex-row items-center gap-10">

            {/* AVATAR */}

            <div className="w-36 h-36 rounded-full bg-green-700 flex items-center justify-center text-5xl font-bold text-white shadow-lg">

              {user.name?.charAt(0).toUpperCase()}

            </div>

            {/* DETAILS */}

            <div className="flex-1">

              <h2 className="text-4xl font-bold text-gray-900">
                {user.name}
              </h2>

              <p className="text-gray-600 mt-4 text-lg">
                {user.email}
              </p>

              <div className="mt-5">

                <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-medium">
                  {user.role}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* ACCOUNT SUMMARY */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white border border-green-100 rounded-3xl p-8 text-center shadow-sm">

            <h3 className="text-3xl font-bold text-green-700">
              👤
            </h3>

            <p className="mt-4 text-gray-700 font-medium">
              Personal Account
            </p>

          </div>

          <div className="bg-white border border-green-100 rounded-3xl p-8 text-center shadow-sm">

            <h3 className="text-3xl font-bold text-orange-500">
              📦
            </h3>

            <p className="mt-4 text-gray-700 font-medium">
              Track Orders
            </p>

          </div>

          <div className="bg-white border border-green-100 rounded-3xl p-8 text-center shadow-sm">

            <h3 className="text-3xl font-bold text-green-700">
              🌍
            </h3>

            <p className="mt-4 text-gray-700 font-medium">
              Export Products
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;