
const Profile = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-4xl">
        Please Login
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-40 px-6">

      <div className="max-w-4xl mx-auto">

        <div className="bg-white/5 border border-yellow-500/20 rounded-3xl p-10">

          <div className="flex flex-col md:flex-row items-center gap-8">

            {/* PROFILE IMAGE */}

            <div className="w-36 h-36 rounded-full bg-yellow-500 flex items-center justify-center text-5xl font-bold text-black">
              {user.name.charAt(0)}
            </div>

            {/* USER DETAILS */}

            <div>

              <h1 className="text-5xl font-bold text-yellow-400">
                {user.name}
              </h1>

              <p className="text-gray-400 mt-4 text-xl">
                {user.email}
              </p>

              <p className="text-gray-400 mt-2 capitalize">
                Role: {user.role}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;