import axios from "axios";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const userId = localStorage.getItem("user_id");
  const [user, setUser] = useState({
    id: userId,
    name: "",
    email: "",
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    // E Fetch ang current user
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost/get_user_info.php?id=${user.id}`
        );
        console.log(response.data);
        console.log(userId);
        setUser({
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, [user.id, userId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.href = "/signin";
  };

  const handleUpdateUser = async () => {
    try {
      if (newName) {
        const nameRes = await axios.post(
          "http://localhost/update_user_name.php",
          {
            id: user.id,
            name: newName,
          }
        );
        if (nameRes.data.success) {
          setUser({ ...user, name: newName });
          setIsEditingName(false);
          alert("Name updated successfully");
        }
      }

      if (newEmail) {
        const emailRes = await axios.post(
          "http://localhost/update_user_email.php",
          {
            id: user.id,
            email: newEmail,
          }
        );
        if (emailRes.data.success) {
          setUser({ ...user, email: newEmail });
          setIsEditingEmail(false);
          alert("Email updated successfully");
        }
      }
    } catch (error) {
      console.error("Error updating user information", error);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        const deleteRes = await axios.post(
          "http://localhost/delete_user_account.php",
          {
            id: user.id,
          }
        );
        if (deleteRes.data.success) {
          alert("Account deleted.");
          handleLogout();
        }
      } catch (error) {
        console.error("Error deleting account", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 py-3 px-8  flex items-center justify-between">
        <div className="flex items-center">
          <img
            alt="Paypal logo"
            src="https://i.postimg.cc/mrNWZ464/pngimg-com-paypal-PNG7.png"
            className=" h-12"
          />
          <h1 className="text-white font-semibold">Palpak</h1>
        </div>
        <button onClick={handleLogout} className="text-white">
          LOG OUT
        </button>
      </div>
      <div className="container mx-auto py-12 px-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-white shadow rounded-lg p-8">
              <div className="flex items-center justify-between">
                <div className="text-gray-700">
                  <h2 className="text-lg font-bold text-blue-600">Profile</h2>
                </div>
              </div>
              <div className="flex items-center mt-4">
                <div>
                  {isEditingName ? (
                    <>
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="border rounded px-3 py-2"
                      />
                      <button
                        onClick={handleUpdateUser}
                        className="text-blue-600 ml-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingName(false)}
                        className="text-red-600 ml-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold">{user.name}</h3>
                      <button
                        onClick={() => setIsEditingName(true)}
                        className="text-blue-600 ml-2"
                      >
                        Change Name
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-white shadow rounded-lg p-8">
              <h2 className="text-lg font-bold text-gray-700">Emails</h2>
              <div className="mt-4">
                <div className="flex items-center justify-between">
                  {isEditingEmail ? (
                    <>
                      <input
                        type="email"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        className="border rounded px-3 py-2"
                      />
                      <button
                        onClick={handleUpdateUser}
                        className="text-blue-600 ml-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingEmail(false)}
                        className="text-red-600 ml-2"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-gray-700">{user.email}</span>
                      <button
                        onClick={() => setIsEditingEmail(true)}
                        className="text-blue-600 ml-2"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white shadow rounded-lg p-8 mt-8">
              <h2 className="text-lg font-bold text-gray-700">
                Delete account
              </h2>
              <button
                onClick={handleDeleteAccount}
                className="mt-4 px-4 py-2 border border-gray-300 rounded text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
