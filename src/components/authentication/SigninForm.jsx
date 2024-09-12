import { useState } from "react";
import InputField from "../reusable/InputField";
import Button from "../reusable/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { warning } from "../../assets";

const SigninForm = () => {
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSigninChange = (e) => {
    const { name, value } = e.target;
    setSigninData({
      ...signinData,
      [name]: value,
    });
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signinData),
      });
      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        toast.success(data.message);
        window.location.href = "/dashboard";
      } else {
        // toast.error(data.message);
        setError("Some of your information isn't correct. Please try again.");
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <ToastContainer />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg border rounded-md p-16">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Paypal logo"
            src="https://w7.pngwing.com/pngs/246/916/png-transparent-computer-icons-logo-paypal-encapsulated-postscript-paypal-blue-angle-logo-thumbnail.png"
            className="mx-auto h-12 w-auto"
          />
          <h1 className="text-center py-4 text-lg font-bold text-[#27346A]">
            <span className="text-[#0544B5]">Palpak</span> Login
          </h1>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center gap-3">
            <img src={warning} width={20} height={20} />
            <span>{error}</span>
          </div>
        )}
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSigninSubmit}
        >
          <InputField
            id="signinEmail"
            name="email"
            type="email"
            value={signinData.email}
            onChange={handleSigninChange}
            required
            placeholder="Enter your email"
          />
          <InputField
            id="signinPassword"
            name="password"
            type="password"
            value={signinData.password}
            onChange={handleSigninChange}
            required
            placeholder="Enter your password"
          />
          <Button type="submit" label="Sign In" customClass="chuy-button" />
          <div className="flex items-center justify-center space-x-2">
            <div className="w-1/3 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="w-1/3 h-px bg-gray-300"></div>
          </div>

          <Button
            type="button"
            label="Sign up"
            customClass="border border-gray-300"
            bgColor="#fff"
            textColor="#000"
            onClick={() => {
              navigate("/signup");
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default SigninForm;
