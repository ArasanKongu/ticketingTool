import React, { useState } from "react";
import axios, { Axios, AxiosError } from "axios";
import { Button, Input } from "@nextui-org/react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Link from "next/link";

export default function SignupLayout() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [userName, setUserName] = useState("");
  const [EmployeeNo, setEmployeeNo] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [superAdminCode, setSuperAdminCode] = useState("");

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      window.alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/signup", {
        userName: userName,
        EmployeeNo,
        email,
        password,
        confirmPassword,
        superAdminCode,
      });

      console.log("Sign up successful:", response.data);
      window.alert(response.data.message || "Sign up successful");
      window.location.href = "/login";
      setUserName("");
      setEmployeeNo("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setSuperAdminCode("");
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error("Sign up error:", error);
      if (axiosError.response) {
        console.error("Server responded with:", axiosError.response.data);
        window.alert(`Error: ${axiosError.message}`);
      } else {
        window.alert("An error occurred during sign up. Please try again.");
      }
    }
  };

  return (
    <div className="w-full md:w-1/2 p-2 flex flex-col justify-center">
      <div className="mb-8">
        <h2 className="text-center font-bold text-orange-800">
          Nexware Technologies
        </h2>
      </div>
      <div className="mb-3">
        <Input
          type="text"
          label="User Name"
          placeholder="Enter your Name"
          variant="underlined"
          className="max-w-xs mx-auto"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          variant="underlined"
          className="max-w-xs mx-auto"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <Input
          type="text"
          label="EmployeeNo"
          placeholder="Enter your EmployeeNo"
          variant="underlined"
          className="max-w-xs mx-auto"
          value={EmployeeNo}
          onChange={(e) => setEmployeeNo(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <Input
          label="Password"
          variant="underlined"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={togglePasswordVisibility}
              aria-label="toggle password visibility"
            >
              {isPasswordVisible ? (
                <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isPasswordVisible ? "text" : "password"}
          className="max-w-xs mx-auto"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <Input
          label="Confirm Password"
          variant="underlined"
          placeholder="Confirm your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              aria-label="toggle confirm password visibility"
            >
              {isConfirmPasswordVisible ? (
                <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isConfirmPasswordVisible ? "text" : "password"}
          className="max-w-xs mx-auto"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <Input
          label="Super Admin Code"
          variant="underlined"
          placeholder="Enter your Super Admin Code"
          // endContent={
          //   <button
          //     className="focus:outline-none"
          //     type="button"
          //     onClick={toggleConfirmPasswordVisibility}
          //     aria-label="toggle confirm password visibility"
          //   >
          //     {isConfirmPasswordVisible ? (
          //       <IoEyeOutline className="text-2xl text-default-400 pointer-events-none" />
          //     ) : (
          //       <IoEyeOffOutline className="text-2xl text-default-400 pointer-events-none" />
          //     )}
          //   </button>
          // }
          // type={isConfirmPasswordVisible ? "text" : "password"}
          className="max-w-xs mx-auto"
          value={superAdminCode}
          onChange={(e) => setSuperAdminCode(e.target.value)}
        />
      </div>
      <div className="mb-4 flex items-center justify-center">
        <Button color="primary" size="md" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>

      <div className="text-center">
        <p>
          Already Have Account&#63;&#32;
          <Link href="/login" className="text-sky-600 underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
