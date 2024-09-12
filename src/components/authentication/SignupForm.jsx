import { useState } from "react";
import Button from "../reusable/Button";
import InputField from "../reusable/InputField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [attempts, setAttempts] = useState(0);

  const navigate = useNavigate();

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/registration.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      if (data.status === "success") {
        toast.success(data.message);
        localStorage.setItem("userId", data.id);

        console.log(signupData);
      } else {
        if (attempts > 0) {
          toast.error("Gahig ulo, ga exist na lagi na!.");
        } else {
          toast.error(data.message);
        }
        setAttempts(attempts + 1);
      }
    } catch (error) {
      toast.error(
        `An error occurred while submitting the form. Please try again. ${error}`
      );
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <ToastContainer />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg border rounded-md p-16 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Paypal logo"
            src="https://w7.pngwing.com/pngs/246/916/png-transparent-computer-icons-logo-paypal-encapsulated-postscript-paypal-blue-angle-logo-thumbnail.png"
            className="mx-auto h-12 w-auto"
          />
          <h1 className="text-center py-4 text-lg font-bold text-[#27346A]">
            <span className="text-[#0544B5]">Palpak</span> Registration
          </h1>
        </div>
        <form
          action="#"
          method="POST"
          className="space-y-6"
          onSubmit={handleSignupSubmit}
        >
          <InputField
            id="name"
            name="name"
            type="text"
            value={signupData.name}
            onChange={handleSignupChange}
            required
            placeholder="Enter your Name"
          />
          <InputField
            id="signupEmail"
            name="email"
            type="email"
            value={signupData.email}
            onChange={handleSignupChange}
            required
            placeholder="Enter your Email"
          />
          <InputField
            id="signupPassword"
            name="password"
            type="password"
            value={signupData.password}
            onChange={handleSignupChange}
            required
            placeholder="Enter your password"
          />

          <div className="text-right">
            <a
              href="#"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            label="Sign Up"
            customClass="bg-blue-600 text-white rounded-full chuy-button "
          />

          <div className="flex items-center justify-center space-x-2">
            <div className="w-1/3 h-px bg-gray-300"></div>
            <span className="text-sm text-gray-500">or</span>
            <div className="w-1/3 h-px bg-gray-300"></div>
          </div>

          <Button
            type="button"
            label="Sign In"
            customClass="border border-gray-300 "
            bgColor="#fff"
            textColor="#000"
            onClick={() => {
              navigate("/signin");
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
