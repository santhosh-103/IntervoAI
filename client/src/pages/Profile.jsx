import { useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaUser,
  FaSave,
  FaCamera,
} from "react-icons/fa";
import toast from "react-hot-toast";

function Profile() {
  const storedUser = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const history = JSON.parse(
    localStorage.getItem("interviewHistory") || "[]"
  );

  const totalInterviews =
    history.length;

  const avgScore =
    history.length > 0
      ? Math.round(
          history.reduce(
            (sum, item) =>
              sum + (item.score || 0),
            0
          ) / history.length
        )
      : 0;

  const totalReports =
    history.length;

  const [name, setName] = useState(
    storedUser.name || ""
  );

  const [email, setEmail] = useState(
    storedUser.email || ""
  );

  const [profileImage, setProfileImage] =
    useState(
      localStorage.getItem(
        "profileImage"
      ) || ""
    );

  const handleImageUpload = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    const reader =
      new FileReader();

    reader.onloadend = () => {
      setProfileImage(
        reader.result
      );

      localStorage.setItem(
        "profileImage",
        reader.result
      );
    };

    reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    if (!name.trim()) {
      toast.error(
        "Name cannot be empty"
      );
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      email &&
      !emailRegex.test(email)
    ) {
      toast.error(
        "Enter valid email"
      );
      return;
    }

    const updatedUser = {
      ...storedUser,
      name,
      email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    toast.success(
      "Profile Updated Successfully ✅"
    );
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

          {/* Profile Header */}
          <div className="flex flex-col items-center">

            <div className="relative">

              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                />
              ) : (
                <FaUserCircle className="text-8xl text-indigo-500" />
              )}

              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-indigo-600 hover:bg-indigo-700 p-3 rounded-full cursor-pointer"
              >
                <FaCamera className="text-white" />
              </label>

              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handleImageUpload
                }
              />

            </div>

            <h1 className="text-3xl font-bold text-white mt-5">
              {name || "User"}
            </h1>

            <p className="text-slate-400 mt-2">
              {email ||
                "No Email Added"}
            </p>

          </div>

          {/* Editable Fields */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div className="bg-slate-800 rounded-2xl p-5">

              <label className="text-slate-400 flex items-center gap-2">
                <FaUser />
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full mt-3 bg-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <div className="bg-slate-800 rounded-2xl p-5">

              <label className="text-slate-400 flex items-center gap-2">
                <FaEnvelope />
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="w-full mt-3 bg-slate-700 rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-slate-800 rounded-2xl p-5 text-center">

              <h3 className="text-3xl font-bold text-indigo-400">
                {totalInterviews}
              </h3>

              <p className="text-slate-400 mt-2">
                Interviews Completed
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-5 text-center">

              <h3 className="text-3xl font-bold text-green-400">
                {avgScore}%
              </h3>

              <p className="text-slate-400 mt-2">
                Average Score
              </p>

            </div>

            <div className="bg-slate-800 rounded-2xl p-5 text-center">

              <h3 className="text-3xl font-bold text-purple-400">
                {totalReports}
              </h3>

              <p className="text-slate-400 mt-2">
                AI Reports
              </p>

            </div>

          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-10">

            <button
              onClick={saveProfile}
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl text-white flex items-center gap-2"
            >
              <FaSave />
              Save Changes
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Profile;